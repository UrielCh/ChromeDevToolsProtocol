/* eslint-disable @typescript-eslint/no-namespace */

export namespace Protocol {
  export interface ProtocolShape {
    version: ProtocolVersion;
    domains: ProtocolDomain[];
  }

  export interface ProtocolDomain {
    domain: string; //
    experimental?: boolean;
    dependencies?: string[];
    types?: ProtocolType[]; // ProtocolType0
    commands: ProtocolCommand[];
    events?: ProtocolEvent[];
    description?: string;
    deprecated?: boolean;
  }

  export interface ProtocolVersion {
    major: string; // "1"
    minor: string; // "3"
  }
  export interface ProtocolItemsType {
    type: string;
    items?: ProtocolItems;
  }
  export interface ProtocolItemsRef {
    $ref: string;
    items?: ProtocolItems;
  }
  export type ProtocolItems = ProtocolItemsType | ProtocolItemsRef;

  export interface ProtocolTypeCommon {
    id: string;
    description?: string;
    experimental?: boolean;
    deprecated?: boolean;
  }

  export interface ProtocolTypeArray extends ProtocolTypeCommon {
    type: "array";
    items: ProtocolItems; // ProtocolType;
  }

  export interface ProtocolTypeObject extends ProtocolTypeCommon {
    type: "object";
    properties?: ProtocolProperty[];
  }

  export interface ProtocolTypeString extends ProtocolTypeCommon {
    type: "string";
    enum?: string[];
  }
  export interface ProtocolTypeNumber extends ProtocolTypeCommon {
    type: "integer" | "number";
  }

  export interface ProtocolTypeRef extends ProtocolTypeCommon {
    $ref: string;
    items?: ProtocolItems; // Omit<ProtocolType, 'id'>;
  }

  export type ProtocolType =
    | ProtocolTypeArray
    | ProtocolTypeObject
    | ProtocolTypeString
    | ProtocolTypeRef
    | ProtocolTypeNumber;

  export interface ProtocolProperty {
    name: string;
    description?: string;
    experimental?: boolean;
    type?: string;
    $ref?: string;
    optional?: boolean;
    items?: ProtocolItems;
    deprecated?: boolean;
    enum?: string[]; // not in ProtocolReturn
  }

  export interface ProtocolReturn {
    name: string;
    description?: string;
    experimental?: boolean;
    type?: string;
    $ref?: string;
    optional?: boolean;
    items?: ProtocolItems;
    deprecated?: boolean;
  }

  export type ProtocolParameter = ProtocolProperty;

  export interface ProtocolCommand {
    name: string;
    description?: string;
    experimental?: boolean;
    parameters?: ProtocolParameter[];
    returns?: ProtocolReturn[];
    redirect?: string;
    deprecated?: boolean;
  }

  export interface ProtocolEvent {
    name: string;
    description?: string;
    experimental?: boolean;
    parameters?: ProtocolParameter[];
    deprecated?: boolean;
  }
}
