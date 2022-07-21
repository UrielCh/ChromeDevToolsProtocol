import * as fs from "fs";
import { join, basename } from "path";
import { Protocol as Proto } from "../lib/Protocol";
import { localDescriptor } from "../lib/protocol1_3";

/**
 * forked from https://github.com/ChromeDevTools/devtools-protocol/blob/master/scripts/protocol-dts-generator.ts
 */

let numIndents = 0;
let emitStr = "";

const emit = (str: string) => {
  emitStr += str;
};

const getIndent = () => "    ".repeat(numIndents); // 4 spaced indents

const emitIndent = () => {
  emitStr += getIndent();
};

const emitLine = (str?: string) => {
  if (str) {
    emitIndent();
    emit(`${str}\n`);
  } else {
    emit("\n");
  }
};

const emitOpenBlock = (str: string, openChar = " {") => {
  emitLine(`${str}${openChar}`);
  numIndents++;
};

const emitCloseBlock = (closeChar = "}") => {
  numIndents--;
  emitLine(closeChar);
};

const emitHeaderComments = () => {
  emitLine("/* eslint-disable no-unused-vars */");
  emitLine("/**********************************************************************");
  emitLine(" * Auto-generated by protocol-dts-generator.ts, do not edit manually. *");
  emitLine(" **********************************************************************/");
  emitLine();
};

const fixCamelCase = (name: string): string => {
  let prefix = "";
  let result = name;
  if (name[0] === "-") {
    prefix = "Negative";
    result = name.substring(1);
  }
  const refined = result.split("-").map(toTitleCase).join("");
  return prefix +
    refined.replace(/HTML|XML|WML|API/i, (match) => match.toUpperCase());
};

const emitEnum = (enumName: string, enumValues: string[]) => {
  emitOpenBlock(`export const enum ${enumName}`);
  enumValues.forEach((value) => {
    emitLine(`${fixCamelCase(value)} = "${value}",`);
  });
  emitCloseBlock();
};

const emitPublicDocDeclaration = () => {
  emitLine("/**");
  emitLine(" * The Chrome DevTools Protocol.");
  emitLine(" * @public");
  emitLine(" */");
};

const emitModule = (moduleName: string, domains: Proto.ProtocolDomain[]) => {
  moduleName = toTitleCase(moduleName);
  emitLine("// deno-lint-ignore-file no-explicit-any");
  emitHeaderComments();
  emitPublicDocDeclaration();
  emitOpenBlock(`export namespace ${moduleName}`);
  emitGlobalTypeDefs();
  domains.forEach(emitDomain);
  emitCloseBlock();
  emitLine();
  emitLine(`export default ${moduleName};`);
};

const emitGlobalTypeDefs = () => {
  emitLine();
  emitLine("export type integer = number;");
};

const emitDomain = (domain: Proto.ProtocolDomain) => {
  const domainName = toTitleCase(domain.domain);
  emitLine();
  emitDescription(domain.description);
  emitOpenBlock(`export namespace ${domainName}`);
  if (domain.types) domain.types.forEach(emitDomainType);
  if (domain.commands) domain.commands.forEach(emitCommand);
  if (domain.events) domain.events.forEach(emitEvent);
  emitCloseBlock();
};

const getCommentLines = (description: string) => {
  const lines = description
    .split(/\r?\n/g)
    .map((line) => ` * ${line}`);
  return ["/**", ...lines, " */"];
};

const emitDescription = (description?: string) => {
  if (description) getCommentLines(description).map((l) => emitLine(l));
};

const isPropertyInlineEnum = (prop: Proto.ProtocolProperty): boolean => {
  if ("$ref" in prop) {
    return false;
  }
  return prop.type === "string" && prop.enum !== null &&
    prop.enum !== undefined;
};

const getPropertyDef = (
  interfaceName: string,
  prop: Proto.ProtocolProperty,
): string => {
  // Quote key if it has a . in it.
  const propName = prop.name.includes(".") ? `"${prop.name}"` : prop.name;
  const type = getPropertyType(
    interfaceName,
    prop as unknown as Proto.ProtocolType,
  );
  return `${propName}${prop.optional ? "?" : ""}: ${type}`;
};

// ProtocolType | ProtocolItems
const getPropertyType = (
  interfaceName: string,
  prop: Proto.ProtocolType,
): string => {
  if ("$ref" in prop) {
    return prop.$ref as string;
  } else if (prop.type === "array") {
    return `${getPropertyType(interfaceName, prop.items as Proto.ProtocolType)}[]`;
  } else if (prop.type === "object") {
    if (!prop.properties) {
      // TODO: actually 'any'? or can use generic '[key: string]: string'?
      return "any";
    } else {
      // hack: access indent, \n directly
      let objStr = "{\n";
      numIndents++;
      objStr += prop.properties
        .map((p) => `${getIndent()}${getPropertyDef(interfaceName, p)};\n`)
        .join("");
      numIndents--;
      objStr += `${getIndent()}}`;
      return objStr;
    }
  } else if (prop.type === "string" && prop.enum) {
    return "(" + prop.enum.map((v: string) => `"${v}"`).join(" | ") + ")";
  }
  return prop.type;
};

const emitProperty = (interfaceName: string, prop: Proto.ProtocolProperty) => {
  let description = prop.description;
  if (isPropertyInlineEnum(prop)) {
    const enumName = interfaceName + toTitleCase(prop.name);
    description = `${description || ""} (${enumName} enum)`;
  }

  emitDescription(description);
  emitLine(`${getPropertyDef(interfaceName, prop)};`);
};

const emitInlineEnumForDomainType = (type: Proto.ProtocolType) => {
  if ("type" in type && type.type === "object") {
    emitInlineEnums(type.id, type.properties);
  }
};

const emitInlineEnumsForCommands = (command: Proto.ProtocolCommand) => {
  emitInlineEnums(toCmdRequestName(command.name), command.parameters);
  emitInlineEnums(toCmdResponseName(command.name), command.returns);
};

const emitInlineEnumsForEvents = (event: Proto.ProtocolEvent) => {
  emitInlineEnums(toEventPayloadName(event.name), event.parameters);
};

const emitInlineEnums = (
  prefix: string,
  propertyTypes?: Proto.ProtocolProperty[],
) => {
  if (!propertyTypes) {
    return;
  }
  for (const type of propertyTypes) {
    if (isPropertyInlineEnum(type)) {
      emitLine();
      const enumName = prefix + toTitleCase(type.name);
      emitEnum(enumName, type.enum || []);
    }
  }
};

const emitInterface = (
  interfaceName: string,
  props?: Proto.ProtocolProperty[],
) => {
  emitOpenBlock(`export interface ${interfaceName}`);
  props
    ? props.forEach((prop) => emitProperty(interfaceName, prop))
    : emitLine("[key: string]: string;");
  emitCloseBlock();
};

const emitDomainType = (type: Proto.ProtocolType) => {
  emitInlineEnumForDomainType(type);
  emitLine();
  emitDescription(type.description);

  if ("type" in type && type.type === "object") {
    emitInterface(type.id, type.properties);
  } else {
    emitLine(`export type ${type.id} = ${getPropertyType(type.id, type)};`);
  }
};

const toTitleCase = (str: string) => str[0].toUpperCase() + str.substr(1);

const toCmdRequestName = (commandName: string) =>
  `${toTitleCase(commandName)}Request`;

const toCmdResponseName = (commandName: string) =>
  `${toTitleCase(commandName)}Response`;

const emitCommand = (command: Proto.ProtocolCommand) => {
  emitInlineEnumsForCommands(command);
  // TODO(bckenny): should description be emitted for params and return types?
  if (command.parameters) {
    emitLine();
    emitInterface(toCmdRequestName(command.name), command.parameters);
  }

  if (command.returns) {
    emitLine();
    emitInterface(toCmdResponseName(command.name), command.returns);
  }
};

const toEventPayloadName = (eventName: string) =>
  `${toTitleCase(eventName)}Event`;

const emitEvent = (event: Proto.ProtocolEvent) => {
  if (!event.parameters) {
    return;
  }

  emitInlineEnumsForEvents(event);
  emitLine();
  emitDescription(event.description);
  emitInterface(toEventPayloadName(event.name), event.parameters);
};

// P.RefType & P.PropertyBaseType
const getEventMapping = (
  event: Proto.ProtocolEvent,
  domainName: string,
  modulePrefix: string,
): Omit<Proto.ProtocolTypeRef, "id"> & { name: string } => {
  // Use TS3.0+ tuples
  const payloadType = event.parameters
    ? `[${modulePrefix}.${domainName}.${toEventPayloadName(event.name)}]`
    : "[]";

  return {
    // domain-prefixed name since it will be used outside of the module.
    name: `${domainName}.${event.name}`,
    description: event.description,
    $ref: payloadType,
  };
};

const isWeakInterface = (params: Proto.ProtocolParameter[]): boolean => {
  return params.every((p) => !!p.optional);
};

// P.ObjectType & P.PropertyBaseType
const getCommandMapping = (
  command: Proto.ProtocolCommand,
  domainName: string,
  modulePrefix: string,
): Omit<Proto.ProtocolTypeObject, "id"> & { name: string } => {
  const prefix = `${modulePrefix}.${domainName}.`;
  // Use TS3.0+ tuples for paramsType
  let requestType = "[]";
  if (command.parameters) {
    const optional = isWeakInterface(command.parameters) ? "?" : "";
    requestType = "[" + prefix + toCmdRequestName(command.name) + optional +
      "]";
  }
  const responseType = command.returns
    ? prefix + toCmdResponseName(command.name)
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
};

const flatten = <T>(arr: T[][]) => ([] as T[]).concat(...arr);

const emitMapping = (
  moduleName: string,
  protocolModuleName: string,
  domains: Proto.ProtocolDomain[],
) => {
  moduleName = toTitleCase(moduleName);
  emitHeaderComments();
  emitLine(`import Protocol from "./${protocolModuleName}";`);
  emitLine();
  emitDescription(
    "Mappings from protocol event and command names to the types required for them.",
  );
  emitOpenBlock(`export namespace ${moduleName}`);

  const modulePrefix = toTitleCase(protocolModuleName);
  const eventDefs = flatten(domains.map((d) => {
    const domainName = toTitleCase(d.domain);
    return (d.events || []).map((e) =>
      getEventMapping(e, domainName, modulePrefix)
    );
  }));
  emitInterface("Events", eventDefs);

  emitLine();

  const commandDefs = flatten(domains.map((d) => {
    const domainName = toTitleCase(d.domain);
    return (d.commands || []).map((c) =>
      getCommandMapping(c, domainName, modulePrefix)
    );
  }));
  emitInterface("Commands", commandDefs);

  emitCloseBlock();
  emitLine();
  emitLine(`export default ${moduleName};`);
};

const emitApiCommand = (
  command: Proto.ProtocolCommand,
  domainName: string,
  modulePrefix: string,
) => {
  const prefix = `${modulePrefix}.${domainName}.`;
  emitDescription(command.description);
  let params = "";
  if (command.parameters) {
    if (command.parameters.find((a) => !a.optional)) {
      params = `params: ${prefix}${toCmdRequestName(command.name)}`;
    } else {
      params = `params?: ${prefix}${toCmdRequestName(command.name)}`;
    }
    // params += ", sessionId?: string"; // not shure
  } else {
    params = "params?: Record<never, never>";
  }
  const response = command.returns
    ? `${prefix}${toCmdResponseName(command.name)}`
    : "void";
  emitLine(`${command.name}(${params}, sessionId?: SessionId): Promise<${response}>;`);
  emitLine();
};

/**
 * @param event the event
 * @param domainName second part of type prefix
 * @param modulePrefix first part of type prefix
 */
const emitApiEvent = (
  event: Proto.ProtocolEvent,
  domainName: string,
  modulePrefix: string,
  fullName = false,
) => {
  const prefix = `${modulePrefix}.${domainName}.`;
  emitDescription(event.description);
  const params = event.parameters
    ? `params: ${prefix}${toEventPayloadName(event.name)}`
    : "";
  const callParams = event.parameters
    ? `${prefix}${toEventPayloadName(event.name)}`
    : "void";
  const addSession = ""; // "", sessionId?: string";
  const eventName = fullName ? `${domainName}.${event.name}` : event.name;
  emitLine(`on(event: "${eventName}", listener: (${params}${addSession}) => void): void;`);
  emitLine(`on(event: \`${eventName}.\${SessionId}\`, listener: (${params}${addSession}) => void): void;`);
  emitLine(`once(event: "${eventName}", listener: (${params}${addSession}) => void): void;`);
  emitLine(`once(event: \`${eventName}.\${SessionId}\`, listener: (${params}${addSession}) => void): void;`);
  emitLine(`off(event: "${eventName}", listener: (${params}${addSession}) => void): void;`);
  emitLine(`off(event: \`${eventName}.\${SessionId}\`, listener: (${params}${addSession}) => void): void;`);
  // alternative to once syntax
  if (!fullName)
    emitLine(`${eventName}(sessionId?: SessionId): Promise<${callParams}>;`);
  emitLine();
};

const emitDomainApi = (domain: Proto.ProtocolDomain, modulePrefix: string) => {
  emitLine();
  const domainName = toTitleCase(domain.domain);
  emitOpenBlock(`export interface ${domainName}Api`);
  if (domain.commands) {
    domain.commands.forEach((c) => emitApiCommand(c, domainName, modulePrefix));
  }
  if (domain.events) {
    domain.events.forEach((e) => emitApiEvent(e, domainName, modulePrefix));
  }
  emitCloseBlock();
};

const emitApi = (moduleName: string, protocolModuleName: string, domains: Proto.ProtocolDomain[]) => {
  moduleName = toTitleCase(moduleName);
  emitLine("// deno-lint-ignore-file adjacent-overload-signatures");
  emitHeaderComments();
  emitLine(`import Protocol from "./${protocolModuleName}";`);
  emitLine();
  emitDescription("API generated from Protocol commands and events.");
  emitOpenBlock(`export namespace ${moduleName}`);
  emitLine("export type SessionId = string;");
  emitLine();
  emitOpenBlock("export interface ProtocolApi");
  domains.forEach((d) => {
    emitLine(`${d.domain}: ${d.domain}Api;`);
    emitLine();
  });
  emitCloseBlock();
  emitLine();

  const modulePrefix = toTitleCase(protocolModuleName);
  domains.forEach((d) => emitDomainApi(d, modulePrefix));
  emitCloseBlock();

  emitLine();
  emitLine(`export default ${moduleName};`);
};

const emitEvents = (moduleName: string, protocolModuleName: string, domains: Proto.ProtocolDomain[]) => {
  moduleName = toTitleCase(moduleName);
  emitHeaderComments();
  emitLine(`import Protocol from "./${protocolModuleName}";`);
  emitLine();
  emitDescription("all protocol events.");
  // emitLine("export type SessionId = string;");

  // const allEvents = [] as string[];
  // domains.forEach((domain) => {
  //   if (domain.events) {
  //     const domainName = toTitleCase(domain.domain); // "Accessibility" | "Animation" | "Audits" | "BackgroundService"...
  //     domain.events.forEach(event => allEvents.push(`${domainName}.${event.name}`));
  //   }
  // });
  //emitLine(`export type ProtocolEventsName = ${allEvents.map(e=>`"${e}"`).join(" | ")};`);
  // emitOpenBlock(`export interface ${moduleName}`);
  emitOpenBlock(`export type ${moduleName} =`);

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
      const domainName = toTitleCase(domain.domain); // "Accessibility" | "Animation" | "Audits" | "BackgroundService"...
      const modulePrefix = toTitleCase(protocolModuleName); // "Protocol"
      //domain.events.forEach((e) => emitApiEvent(e, domainName, modulePrefix, true));
      domain.events.forEach((event) => {
        const prefix = `${modulePrefix}.${domainName}.`;
        emitDescription(event.description);
        const params = event.parameters
          ? `${prefix}${toEventPayloadName(event.name)}`
          : "Record<never, never>";
        // const callParams = event.parameters
        //   ? `${prefix}${toEventPayloadName(event.name)}`
        //   : "void";
        const addSession = ""; // "", sessionId?: string";
        emitLine(
          `"${domainName}.${event.name}": [params: ${params}${addSession}, sessionId?: string],`,
        );
        // do not work with deno 1.23.3
        // emitLine(`// \`${domainName}.${event.name}.\${SessionId}\`: [params: ${params}${addSession}, sessionId?: string],`);
      });
    }
  });
  emitDescription("Catch all events");
  emitLine("event: [ProtocolEventParam],");
  emitDescription("Message queue is empty");
  emitLine("ready: [],");
  emitDescription("websocket connection closed");
  emitLine("disconnect: [],");
  emitCloseBlock();
  emitLine();
  emitLine(
    'export type ProtocolEventsName = Exclude<keyof ProtocolEventsApi, "event" | "ready" >;',
  );
  emitLine();
  emitOpenBlock("export interface ProtocolEventParam");
  emitDescription("id of the message, empty if it's an event");
  emitLine("id?: number;");
  emitDescription("error messge");
  emitLine("error?: Error;");
  emitLine("result?: unknown;");
  emitDescription("error messge");
  emitLine("method: ProtocolEventsName;");
  emitLine("params?: unknown;");
  emitLine("sessionId?: string;");
  emitCloseBlock();
  emitLine();
  emitLine(`export default ${moduleName};`);
};

const flushEmitToFile = (path: string) => {
  console.log(`Writing to ${path}`);
  fs.writeFileSync(path, emitStr, { encoding: "utf-8" });

  numIndents = 0;
  emitStr = "";
};

const fixBaseName = (fn: string) => {
  return fn.replace(/\\/g, "/").replace(/^.+\//, "");
};

// Main
// substring windows only
// const __dirname = new URL(".", import.meta.url).pathname.substring(1);

console.log(__dirname);
const typeDir = join(__dirname, "..", "types");
fs.mkdirSync(typeDir, { recursive: true });
const destProtocolFilePath = join(typeDir, "protocol.d.ts");
const protocolModuleName = fixBaseName(basename(destProtocolFilePath, ".d.ts"));
// console.log(`basename("${destProtocolFilePath}", ".d.ts"); = ${protocolModuleName}`)
emitModule(protocolModuleName, localDescriptor.domains);
flushEmitToFile(destProtocolFilePath);

const destMappingFilePath = join(typeDir, "protocol-mapping.d.ts");
const mappingModuleName = "ProtocolMapping";
emitMapping(mappingModuleName, protocolModuleName, localDescriptor.domains);
flushEmitToFile(destMappingFilePath);

const destApiFilePath = join(typeDir, "protocol-proxy-api.d.ts");
const apiModuleName = "ProtocolProxyApi";
emitApi(apiModuleName, protocolModuleName, localDescriptor.domains);
flushEmitToFile(destApiFilePath);

const eventsApiFilePath = join(typeDir, "protocol-events.d.ts");
const protocolEventsName = "ProtocolEventsApi";
emitEvents(protocolEventsName, protocolModuleName, localDescriptor.domains);
flushEmitToFile(eventsApiFilePath);

// deno run --allow-read --allow-write .\scripts\protocol-dts-generator.ts
// deno fmt
