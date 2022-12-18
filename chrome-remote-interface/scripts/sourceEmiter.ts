import { join, ensureDirSync } from "../dev_deps.ts";
import { Protocol as Proto } from "../lib/Protocol.ts";
import * as utils from './genutils.ts';

function exportInterface(name: string) {
    // emit interface by default
    // return `export interface ${name}`;

    // emit type to allos proper export type.
    return `export type ${name} =`;
}

export class SourceEmiter {
    numIndents = 0;
    emitStr = "";
    destProtocolFilePath: string;
    protocolModuleName: string;
    deps = new Set<string>;

    constructor(filename: string) {
        ensureDirSync(utils.typeDir);
        this.destProtocolFilePath = join(utils.typeDir, `${filename}.d.ts`);
        this.protocolModuleName = 'protocol'; // protocolModuleName || utils.fixBaseName(basename(this.destProtocolFilePath, ".d.ts"));
    }

    emit(str: string) {
        this.emitStr += str;
    }

    getIndent() {
        return "    ".repeat(this.numIndents); // 4 spaced indents
    }
    emitIndent() {
        this.emitStr += this.getIndent();
    }

    emitLine(str?: string) {
        if (str) {
            this.emitIndent();
            this.emit(`${str}\n`);
        } else {
            this.emit("\n");
        }
    }

    emitOpenBlock(str: string, openChar = " {") {
        this.emitLine(`${str}${openChar}`);
        this.numIndents++;
    }

    emitCloseBlock(closeChar = "}") {
        this.numIndents--;
        this.emitLine(closeChar);
    }

    emitHeaderComments() {
        this.emitLine("/* eslint-disable no-unused-vars */");
        this.emitLine("/**********************************************************************");
        this.emitLine(" * Auto-generated by protocol-dts-generator.ts, do not edit manually. *");
        this.emitLine(" **********************************************************************/");
        this.emitLine();
    }

    emitEnum(enumName: string, enumValues: string[]) {
        this.emitOpenBlock(`export const enum ${enumName}`);
        enumValues.forEach((value) => {
            this.emitLine(`${utils.fixCamelCase(value)} = "${value}",`);
        });
        this.emitCloseBlock();
    }

    emitPublicDocDeclaration() {
        this.emitLine("/**");
        this.emitLine(" * The Chrome DevTools Protocol.");
        this.emitLine(" * @public");
        this.emitLine(" */");
    }

    emitGlobalTypeDefs() {
        this.emitLine();
        this.emitLine("export type integer = number;");
    }

    getCommentLines(description: string) {
        const lines = description
            .split(/\r?\n/g)
            .map((line) => ` * ${line}`);
        return ["/**", ...lines, " */"];
    }

    emitDescription(description?: string) {
        if (description) this.getCommentLines(description).map((l) => this.emitLine(l));
    }

    isPropertyInlineEnum(prop: Proto.ProtocolProperty): boolean {
        if ("$ref" in prop) {
            return false;
        }
        return prop.type === "string" && prop.enum !== null &&
            prop.enum !== undefined;
    }

    emitInlineEnums(
        prefix: string,
        propertyTypes?: Proto.ProtocolProperty[],
    ) {
        if (!propertyTypes) {
            return;
        }
        for (const type of propertyTypes) {
            if (this.isPropertyInlineEnum(type)) {
                this.emitLine();
                const enumName = prefix + utils.toTitleCase(type.name);
                this.emitEnum(enumName, type.enum || []);
            }
        }
    }

    emitInlineEnumForDomainType(type: Proto.ProtocolType) {
        if ("type" in type && type.type === "object") {
            this.emitInlineEnums(type.id, type.properties);
        }
    }

    getPropertyType(
        interfaceName: string,
        prop: Proto.ProtocolType,
    ): string {
        if ("$ref" in prop) {
            const split = prop.$ref.split('.');
            if (split.length === 2) {
                const dom = split[0];
                if (dom.toLocaleLowerCase() === this.protocolModuleName)
                    prop.$ref = split[1]; // avoid self import
                else
                    this.deps.add(dom);
            }
            return prop.$ref as string;
        } else if (prop.type === "array") {
            return `${this.getPropertyType(interfaceName, prop.items as Proto.ProtocolType)}[]`;
        } else if (prop.type === "object") {
            if (!prop.properties) {
                // TODO: actually 'any'? or can use generic '[key: string]: string'?
                return "any";
            } else {
                // hack: access indent, \n directly
                let objStr = "{\n";
                this.numIndents++;
                objStr += prop.properties
                    .map((p) => `${this.getIndent()}${this.getPropertyDef(interfaceName, p)};\n`)
                    .join("");
                this.numIndents--;
                objStr += `${this.getIndent()}}`;
                return objStr;
            }
        } else if (prop.type === "string" && prop.enum) {
            return "(" + prop.enum.map((v: string) => `"${v}"`).join(" | ") + ")";
        }
        return prop.type;
    }

    getPropertyDef(
        interfaceName: string,
        prop: Proto.ProtocolProperty,
    ): string {
        // Quote key if it has a . in it.
        const propName = prop.name.includes(".") ? `"${prop.name}"` : prop.name;
        const type = this.getPropertyType(
            interfaceName,
            prop as unknown as Proto.ProtocolType,
        );
        return `${propName}${prop.optional ? "?" : ""}: ${type}`;
    }

    emitProperty(interfaceName: string, prop: Proto.ProtocolProperty) {
        let description = prop.description;
        if (this.isPropertyInlineEnum(prop)) {
            const enumName = interfaceName + utils.toTitleCase(prop.name);
            description = `${description || ""} (${enumName} enum)`;
        }

        this.emitDescription(description);
        this.emitLine(`${this.getPropertyDef(interfaceName, prop)};`);
    }

    emitInterface(
        interfaceName: string,
        props?: Proto.ProtocolProperty[],
    ) {
        this.emitOpenBlock(exportInterface(interfaceName));
        props
            ? props.forEach((prop) => this.emitProperty(interfaceName, prop))
            : this.emitLine("[key: string]: string;");
        this.emitCloseBlock();
    }

    emitDomainType(type: Proto.ProtocolType) {
        this.emitInlineEnumForDomainType(type);
        this.emitLine();
        this.emitDescription(type.description);

        if ("type" in type && type.type === "object") {
            this.emitInterface(type.id, type.properties);
        } else {
            this.emitLine(`export type ${type.id} = ${this.getPropertyType(type.id, type)};`);
        }
    }

    emitInlineEnumsForEvents(event: Proto.ProtocolEvent) {
        this.emitInlineEnums(utils.toEventPayloadName(event.name), event.parameters);
    }

    emitEvent(event: Proto.ProtocolEvent) {
        if (!event.parameters) {
            return;
        }

        this.emitInlineEnumsForEvents(event);
        this.emitLine();
        this.emitDescription(event.description);
        this.emitInterface(utils.toEventPayloadName(event.name), event.parameters);
    }


    emitDomain(domain: Proto.ProtocolDomain) {
        // const domainName = utils.toTitleCase(domain.domain);
        this.emitLine();
        this.emitDescription(domain.description);
        // this.emitOpenBlock(`export namespace ${domainName}`);
        if (domain.types) domain.types.forEach((d) => this.emitDomainType(d));
        if (domain.commands) domain.commands.forEach((d) => this.emitCommand(d));
        if (domain.events) domain.events.forEach((d) => this.emitEvent(d));
        // this.emitCloseBlock();
    }

    emitInlineEnumsForCommands(command: Proto.ProtocolCommand) {
        this.emitInlineEnums(utils.toCmdRequestName(command.name), command.parameters);
        this.emitInlineEnums(utils.toCmdResponseName(command.name), command.returns);
    }

    emitCommand(command: Proto.ProtocolCommand) {
        this.emitInlineEnumsForCommands(command);
        // TODO(bckenny): should description be emitted for params and return types?
        if (command.parameters) {
            this.emitLine();
            this.emitInterface(utils.toCmdRequestName(command.name), command.parameters);
        }

        if (command.returns) {
            this.emitLine();
            this.emitInterface(utils.toCmdResponseName(command.name), command.returns);
        }
    }

    /** main entry 1 */
    emitModule(domains: Proto.ProtocolDomain[]) {
        let moduleName = this.protocolModuleName
        moduleName = utils.toTitleCase(moduleName);
        // this.emitLine("// deno-lint-ignore-file no-explicit-any");
        this.emitHeaderComments();
        this.emitPublicDocDeclaration();
        //this.emitOpenBlock(`export namespace ${moduleName}`);
        this.emitGlobalTypeDefs();
        //domains.forEach((d) => this.emitDomain(d));

        domains.forEach((d) => {
            const fileName = `${d.domain.toLocaleLowerCase()}`; // .d.ts
            const domainName = utils.toTitleCase(d.domain);
            this.emitLine(`export * as ${domainName} from './${fileName}${utils.importExtantion}'`)
            const se = new SourceEmiter(fileName)
            se.emitsubModule(d);
            se.flushEmitToFile();
        });

        //this.emitCloseBlock();
        this.emitLine();
        //this.emitLine(`export default ${moduleName};`);
    }

    /** main entry 1bis */
    emitsubModule(domain: Proto.ProtocolDomain) {
        // let moduleName = this.protocolModuleName
        // moduleName = utils.toTitleCase(moduleName);
        // this.emitLine("// deno-lint-ignore-file no-explicit-any");
        // this.emitHeaderComments();
        // this.emitPublicDocDeclaration();
        //this.emitOpenBlock(`export namespace ${moduleName}`);
        this.emitGlobalTypeDefs();
        //domains.forEach((d) => this.emitDomain(d));

        //domains.forEach((d) => {
        // const domainName = utils.toTitleCase(domain.domain);
        // this.emitLine(`export * as ${domainName} from './${domainName.toLocaleLowerCase()}.d.ts'`)
        this.emitDomain(domain);
        //});

        //this.emitCloseBlock();
        this.emitLine();

        const extraImp = [...this.deps].map(d => `import type * as ${d} from './${d.toLowerCase()}.d.ts'`)
        if (extraImp.length) {
            const extraStr = extraImp.join('\n') + '\n';
            this.emitStr = extraStr + this.emitStr;
        }
        //this.emitLine(`export default ${moduleName};`);
    }

    ///////
    // can be move out of class
    getEventMapping(
        event: Proto.ProtocolEvent,
        domainName: string,
        modulePrefix: string,
    ): Omit<Proto.ProtocolTypeRef, "id"> & { name: string } {
        // Use TS3.0+ tuples
        const payloadType = event.parameters
            ? `[${modulePrefix}.${domainName}.${utils.toEventPayloadName(event.name)}]`
            : "[]";

        return {
            // domain-prefixed name since it will be used outside of the module.
            name: `${domainName}.${event.name}`,
            description: event.description,
            $ref: payloadType,
        };
    }

    // can be move out of class
    isWeakInterface(params: Proto.ProtocolParameter[]): boolean {
        return params.every((p) => !!p.optional);
    }

    // can be move out of class
    // P.ObjectType & P.PropertyBaseType
    getCommandMapping(
        command: Proto.ProtocolCommand,
        domainName: string,
        modulePrefix: string,
    ): Omit<Proto.ProtocolTypeObject, "id"> & { name: string } {
        const prefix = `${modulePrefix}.${domainName}.`;
        // Use TS3.0+ tuples for paramsType
        let requestType = "[]";
        if (command.parameters) {
            const optional = this.isWeakInterface(command.parameters) ? "?" : "";
            requestType = "[" + prefix + utils.toCmdRequestName(command.name) + optional +
                "]";
        }
        const responseType = command.returns
            ? prefix + utils.toCmdResponseName(command.name)
            : "void";

        return {
            type: "object",
            name: `${domainName}.${command.name}`,
            description: command.description,
            properties: [{
                name: "paramsType",
                $ref: requestType,
            }, {
                name: "returnType",
                $ref: responseType,
            }],
        };
    }

    /** main entry 2 */

    emitMapping(
        moduleName: string,
        domains: Proto.ProtocolDomain[],
    ) {
        moduleName = utils.toTitleCase(moduleName);
        this.emitHeaderComments();
        this.emitLine(`import Protocol from "./${this.protocolModuleName}${utils.importExtantion}";`);
        //this.emitLine(`import Protocol from "./protocol${utils.importExtantion}";`);
        this.emitLine();
        this.emitDescription(
            "Mappings from protocol event and command names to the types required for them.",
        );
        this.emitOpenBlock(`export namespace ${moduleName}`);

        const modulePrefix = utils.toTitleCase(this.protocolModuleName);
        const eventDefs = utils.flatten(domains.map((d) => {
            const domainName = utils.toTitleCase(d.domain);
            return (d.events || []).map((e) =>
                this.getEventMapping(e, domainName, modulePrefix)
            );
        }));
        this.emitInterface("Events", eventDefs);

        this.emitLine();

        const commandDefs = utils.flatten(domains.map((d) => {
            const domainName = utils.toTitleCase(d.domain);
            return (d.commands || []).map((c) =>
                this.getCommandMapping(c, domainName, modulePrefix)
            );
        }));
        this.emitInterface("Commands", commandDefs);

        this.emitCloseBlock();
        this.emitLine();
        this.emitLine(`export default ${moduleName};`);
    }

    emitApiCommand(
        command: Proto.ProtocolCommand,
        domainName: string,
        modulePrefix: string,
    ) {
        const prefix = `${modulePrefix}.${domainName}.`;
        this.emitDescription(command.description);
        let params = "";
        if (command.parameters) {
            if (command.parameters.find((a) => !a.optional)) {
                params = `params: ${prefix}${utils.toCmdRequestName(command.name)}`;
            } else {
                params = `params?: ${prefix}${utils.toCmdRequestName(command.name)}`;
            }
            // params += ", sessionId?: string"; // not shure
        } else {
            params = "params?: Record<never, never>";
        }
        const response = command.returns
            ? `${prefix}${utils.toCmdResponseName(command.name)}`
            : "void";
        this.emitLine(`${command.name}(${params}, sessionId?: SessionId): Promise<${response}>;`);
        this.emitLine();
    }
    /**
     * @param event the event
     * @param domainName second part of type prefix
     * @param modulePrefix first part of type prefix
     */
    emitApiEvent(
        event: Proto.ProtocolEvent,
        domainName: string,
        modulePrefix: string,
        fullName = false,
    ) {
        const prefix = `${modulePrefix}.${domainName}.`;
        this.emitDescription(event.description);
        const params = event.parameters
            ? `params: ${prefix}${utils.toEventPayloadName(event.name)}`
            : "";
        const callParams = event.parameters
            ? `${prefix}${utils.toEventPayloadName(event.name)}`
            : "void";
        const addSession = ""; // "", sessionId?: string";
        const eventName = fullName ? `${domainName}.${event.name}` : event.name;
        this.emitLine(`on(event: "${eventName}", listener: (${params}${addSession}) => void): void;`);
        this.emitLine(`on(event: \`${eventName}.\${SessionId}\`, listener: (${params}${addSession}) => void): void;`);
        this.emitLine(`once(event: "${eventName}", listener: (${params}${addSession}) => void): void;`);
        this.emitLine(`once(event: \`${eventName}.\${SessionId}\`, listener: (${params}${addSession}) => void): void;`);
        this.emitLine(`off(event: "${eventName}", listener: (${params}${addSession}) => void): void;`);
        this.emitLine(`off(event: \`${eventName}.\${SessionId}\`, listener: (${params}${addSession}) => void): void;`);
        // alternative to once syntax
        if (!fullName)
            this.emitLine(`${eventName}(sessionId?: SessionId): Promise<${callParams}>;`);
        this.emitLine();
    }

    emitDomainApi(domain: Proto.ProtocolDomain, modulePrefix: string) {
        this.emitLine();
        const domainName = utils.toTitleCase(domain.domain);
        this.emitOpenBlock(exportInterface(`${domainName}Api`));
        if (domain.commands) {
            domain.commands.forEach((c) => this.emitApiCommand(c, domainName, modulePrefix));
        }
        if (domain.events) {
            domain.events.forEach((e) => this.emitApiEvent(e, domainName, modulePrefix));
        }
        this.emitCloseBlock();
    }

    /** main entry 3 */

    emitApi(moduleName: string, domains: Proto.ProtocolDomain[]) {
        moduleName = utils.toTitleCase(moduleName);
        this.emitLine("// deno-lint-ignore-file adjacent-overload-signatures");
        this.emitLine("/* eslint-disable @typescript-eslint/adjacent-overload-signatures */");
        this.emitHeaderComments();
        this.emitLine(`import Protocol from "./${this.protocolModuleName}${utils.importExtantion}";`);
        this.emitLine();
        this.emitDescription("API generated from Protocol commands and events.");
        this.emitOpenBlock(`export namespace ${moduleName}`);
        this.emitLine("export type SessionId = string;");
        this.emitLine();
        this.emitOpenBlock(exportInterface("ProtocolApi"));
        domains.forEach((d) => {
            this.emitLine(`${d.domain}: ${d.domain}Api;`);
            this.emitLine();
        });
        this.emitCloseBlock();
        this.emitLine();

        const modulePrefix = utils.toTitleCase(this.protocolModuleName);
        domains.forEach((d) => this.emitDomainApi(d, modulePrefix));
        this.emitCloseBlock();

        this.emitLine();
        this.emitLine(`export default ${moduleName};`);
    }

    /**
     * main entry 4
     */
    emitEvents(moduleName: string, domains: Proto.ProtocolDomain[]) {
        moduleName = utils.toTitleCase(moduleName);
        this.emitHeaderComments();
        this.emitLine(`import Protocol from "./${this.protocolModuleName}${utils.importExtantion}";`);
        this.emitLine();
        this.emitDescription("all protocol events.");
        // emitLine("export type SessionId = string;");

        // const allEvents = [] as string[];
        // domains.forEach((domain) => {
        //   if (domain.events) {
        //     const domainName = toTitleCase(domain.domain); // "Accessibility" | "Animation" | "Audits" | "BackgroundService"...
        //     domain.events.forEach(event => allEvents.push(`${domainName}.${event.name}`));
        //   }
        // });
        //emitLine(`export type ProtocolEventsName = ${allEvents.map(e=>`"${e}"`).join(" | ")};`);
        // emitOpenBlock(`exportInterface(moduleName));
        this.emitOpenBlock(`export type ${moduleName} =`);

        // list all interfaces;
        // domains.forEach((domain) => {
        //   if (domain.events) {
        //     const domainName = toTitleCase(domain.domain); // "Accessibility" | "Animation" | "Audits" | "BackgroundService"...
        //     const modulePrefix = toTitleCase(protocolModuleName); // "Protocol"
        //     domain.events.forEach((e) => emitApiEvent(e, domainName, modulePrefix, true));
        //   }
        // });
        // emitDescription("Catch all event");
        // emitLine("on(event: \"event\", listener: (type: ProtocolEventsName, params: any) => void): void;");
        // emitLine("once(event: \"event\", listener: (type: ProtocolEventsName, params: any) => void): void;");
        // emitLine("off(event: \"event\", listener: (type: ProtocolEventsName, params: any) => void): void;");

        domains.forEach((domain) => {
            if (domain.events) {
                const domainName = utils.toTitleCase(domain.domain); // "Accessibility" | "Animation" | "Audits" | "BackgroundService"...
                const modulePrefix = utils.toTitleCase(this.protocolModuleName); // "Protocol"
                //domain.events.forEach((e) => emitApiEvent(e, domainName, modulePrefix, true));
                domain.events.forEach((event) => {
                    const prefix = `${modulePrefix}.${domainName}.`;
                    this.emitDescription(event.description);
                    const params = event.parameters
                        ? `${prefix}${utils.toEventPayloadName(event.name)}`
                        : "Record<never, never>";
                    // const callParams = event.parameters
                    //   ? `${prefix}${toEventPayloadName(event.name)}`
                    //   : "void";
                    const addSession = ""; // "", sessionId?: string";
                    this.emitLine(
                        `"${domainName}.${event.name}": [params: ${params}${addSession}, sessionId?: string],`,
                    );
                    // do not work with deno 1.23.3
                    // emitLine(`// \`${domainName}.${event.name}.\${SessionId}\`: [params: ${params}${addSession}, sessionId?: string],`);
                });
            }
        });
        this.emitDescription("Catch all events");
        this.emitLine("event: [params: ProtocolEventParam],");
        this.emitDescription("Message queue is empty");
        this.emitLine("ready: [void],");
        this.emitDescription("websocket connection closed");
        this.emitLine("disconnect: [void],");
        this.emitCloseBlock();
        this.emitLine();
        this.emitLine(
            'export type ProtocolEventsName = Exclude<keyof ProtocolEventsApi, "event" | "ready" >;',
        );
        this.emitLine();
        this.emitOpenBlock(exportInterface("ProtocolEventParam"));
        this.emitDescription("id of the message, empty if it's an event");
        this.emitLine("id?: number;");
        this.emitDescription("error messge");
        this.emitLine("error?: Error;");
        this.emitLine("result?: unknown;");
        this.emitDescription("error messge");
        this.emitLine("method: ProtocolEventsName;");
        this.emitLine("params?: unknown;");
        this.emitLine("sessionId?: string;");
        this.emitCloseBlock();
        this.emitLine();
        this.emitLine(`export default ${moduleName};`);
    }

    flushEmitToFile() {
        console.log(`Writing to ${this.destProtocolFilePath}`);
        // fs.writeFileSync(path, emitStr, { encoding: "utf-8" });
        Deno.writeTextFileSync(this.destProtocolFilePath, this.emitStr);
        // this.numIndents = 0;
        // this.emitStr = "";
    }
}
