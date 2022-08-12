import { localDescriptor } from "../lib/protocol1_3.ts";
import { SourceEmiter } from "./sourceEmiter.ts";

// Main
// substring windows only

//import * as fs from "fs";
//import { join, basename } from "path";
//import { Protocol as Proto } from "../lib/Protocol";
//import { localDescriptor } from "../lib/protocol1_3";

/**
 * forked from https://github.com/ChromeDevTools/devtools-protocol/blob/master/scripts/protocol-dts-generator.ts
 */
// ProtocolType | ProtocolItems
// P.RefType & P.PropertyBaseType


// fs.mkdirSync(typeDir, { recursive: true });
const se = new SourceEmiter("protocol");
se.emitModule(localDescriptor.domains);
se.flushEmitToFile();

const se2 = new SourceEmiter("protocol-mapping");
const mappingModuleName = "ProtocolMapping";
se2.emitMapping(mappingModuleName, localDescriptor.domains);
se2.flushEmitToFile();

const se3 = new SourceEmiter("protocol-proxy-api");
const apiModuleName = "ProtocolProxyApi";
se3.emitApi(apiModuleName, localDescriptor.domains);
se3.flushEmitToFile();

const se4 = new SourceEmiter("protocol-events");
const protocolEventsName = "ProtocolEventsApi";
se4.emitEvents(protocolEventsName, localDescriptor.domains);
se4.flushEmitToFile();

// deno run --allow-read --allow-write .\scripts\protocol-dts-generator.ts
// deno fmt
