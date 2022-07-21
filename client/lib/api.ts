// deno-lint-ignore-file no-explicit-any
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
// imported fron https://github.com/cyrus-and/chrome-remote-interface/blob/master/lib/api.js
// this file will be removed, so do not fix it
// Copyright (c) 2021 Andrea Cardaci <cyrus.and@gmail.com>

import { Chrome } from "./Chrome";
import { Protocol } from "./Protocol";

function arrayToObject(parameters: { name: string }[]): any {
  const keyValue = {} as { [key: string]: any };
  parameters.forEach((parameter) => {
    const name = parameter.name!;
    delete (parameter as { name?: string }).name;
    keyValue[name] = parameter;
  });
  return keyValue;
}
function decorate(
  to: any,
  category: "type",
  object: Protocol.ProtocolType,
): void;
function decorate(
  to: any,
  category: "command",
  object: Protocol.ProtocolCommand,
): void;
function decorate(
  to: any,
  category: "event",
  object: Protocol.ProtocolEvent,
): void;
function decorate(
  to: any,
  category: "type" | "command" | "event",
  object:
    | Protocol.ProtocolEvent
    | Protocol.ProtocolCommand
    | Protocol.ProtocolType,
): void {
  to.category = category;
  Object.keys(object).forEach((field) => {
    // skip the 'name' field as it is part of the function prototype
    if (field === "name") {
      return;
    }
    // commands and events have parameters whereas types have properties
    if (
      category === "type" && field === "properties" || field === "parameters"
    ) {
      to[field] = arrayToObject((object as any)[field]);
    } else {
      to[field] = (object as any)[field];
    }
  });
}

/**
 * inject all send method as
 * - Chrome[${domainName}.${command.name}](params)
 * and
 * - Chrome[${domainName}][${command.name}](params)
 */
function addCommand(
  chrome: Chrome,
  domainName: string,
  command: Protocol.ProtocolCommand,
) {
  const commandName = `${domainName}.${command.name}`;
  const handler = (params: any, sessionId: string) => {
    return chrome.send(commandName, params, sessionId);
  };
  decorate(handler, "command", command);
  (chrome as any)[commandName] =
    (chrome as any)[domainName][command.name] =
      handler;
}

/**
 * inject all event method as
 * - Chrome[${domainName}.${command.name}](sessionId).then(data)
 * and
 * - Chrome[${domainName}][${command.name}](sessionId).then(data)
 */
function addEvent(
  chrome: Chrome,
  domainName: string,
  event: Protocol.ProtocolEvent,
) {
  const eventName = `${domainName}.${event.name}`;
  const handler = (sessionId?: string) => {
    const rawEventName = sessionId ? `${eventName}.${sessionId}` : eventName;
    // TODO add , reject + timeout
    return new Promise((fulfill) => chrome.once(rawEventName, fulfill));
  };
  decorate(handler, "event", event);
  (chrome as any)[eventName] = handler;
  (chrome as any)[domainName][event.name] = handler;
}

/**
 * inject help data in
 * Chrome[type] = {}
 * @param chrome
 * @param domainName
 * @param type
 */
function addType(
  chrome: Chrome,
  domainName: string,
  type: Protocol.ProtocolType,
) {
  const typeName = `${domainName}.${type.id}`;
  const help = {};
  decorate(help, "type", type);
  (chrome as any)[typeName] = (chrome as any)[domainName][type.id] = help;
}

export function prepare(object: Chrome, protocol: Protocol.ProtocolShape) {
  // assign the protocol and generate the shorthands
  // object.protocol = protocol;
  protocol.domains.forEach((domain) => {
    const domainName = domain.domain;
    (object as any)[domainName] = {};
    // add commands
    if (domain.commands) {
      domain.commands.forEach((command) =>
        addCommand(object, domainName, command)
      );
    }
    // add events
    if (domain.events) {
      domain.events.forEach((event) => addEvent(object, domainName, event));
    }
    // add types
    if (domain.types) {
      domain.types.forEach((type) => addType(object, domainName, type));
    }
    // add utility listener for each domain
    (object as any)[domainName].on = (
      eventName: string,
      handler: (arg: any) => void,
    ) => {
      return (object as any)[domainName][eventName](handler);
    };
  });
}
