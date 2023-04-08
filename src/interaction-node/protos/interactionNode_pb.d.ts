import * as jspb from 'google-protobuf'



export class InitializeInteractionNodeRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InitializeInteractionNodeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: InitializeInteractionNodeRequest): InitializeInteractionNodeRequest.AsObject;
  static serializeBinaryToWriter(message: InitializeInteractionNodeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InitializeInteractionNodeRequest;
  static deserializeBinaryFromReader(message: InitializeInteractionNodeRequest, reader: jspb.BinaryReader): InitializeInteractionNodeRequest;
}

export namespace InitializeInteractionNodeRequest {
  export type AsObject = {
  }
}

export class InitializeInteractionNodeResponse extends jspb.Message {
  getIsinitialized(): boolean;
  setIsinitialized(value: boolean): InitializeInteractionNodeResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InitializeInteractionNodeResponse.AsObject;
  static toObject(includeInstance: boolean, msg: InitializeInteractionNodeResponse): InitializeInteractionNodeResponse.AsObject;
  static serializeBinaryToWriter(message: InitializeInteractionNodeResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InitializeInteractionNodeResponse;
  static deserializeBinaryFromReader(message: InitializeInteractionNodeResponse, reader: jspb.BinaryReader): InitializeInteractionNodeResponse;
}

export namespace InitializeInteractionNodeResponse {
  export type AsObject = {
    isinitialized: boolean,
  }
}

export class InitializeAlgorithmRequest extends jspb.Message {
  getAlgorithmType(): string;
  setAlgorithmType(value: string): InitializeAlgorithmRequest;

  getDataTransformType(): string;
  setDataTransformType(value: string): InitializeAlgorithmRequest;

  getId(): string;
  setId(value: string): InitializeAlgorithmRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InitializeAlgorithmRequest.AsObject;
  static toObject(includeInstance: boolean, msg: InitializeAlgorithmRequest): InitializeAlgorithmRequest.AsObject;
  static serializeBinaryToWriter(message: InitializeAlgorithmRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InitializeAlgorithmRequest;
  static deserializeBinaryFromReader(message: InitializeAlgorithmRequest, reader: jspb.BinaryReader): InitializeAlgorithmRequest;
}

export namespace InitializeAlgorithmRequest {
  export type AsObject = {
    algorithmType: string,
    dataTransformType: string,
    id: string,
  }
}

export class InitializeAlgorithmResponse extends jspb.Message {
  getId(): string;
  setId(value: string): InitializeAlgorithmResponse;

  getIsinitialized(): boolean;
  setIsinitialized(value: boolean): InitializeAlgorithmResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InitializeAlgorithmResponse.AsObject;
  static toObject(includeInstance: boolean, msg: InitializeAlgorithmResponse): InitializeAlgorithmResponse.AsObject;
  static serializeBinaryToWriter(message: InitializeAlgorithmResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InitializeAlgorithmResponse;
  static deserializeBinaryFromReader(message: InitializeAlgorithmResponse, reader: jspb.BinaryReader): InitializeAlgorithmResponse;
}

export namespace InitializeAlgorithmResponse {
  export type AsObject = {
    id: string,
    isinitialized: boolean,
  }
}

export class RunAlgorithmRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RunAlgorithmRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RunAlgorithmRequest): RunAlgorithmRequest.AsObject;
  static serializeBinaryToWriter(message: RunAlgorithmRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RunAlgorithmRequest;
  static deserializeBinaryFromReader(message: RunAlgorithmRequest, reader: jspb.BinaryReader): RunAlgorithmRequest;
}

export namespace RunAlgorithmRequest {
  export type AsObject = {
  }
}

export class RunAlgorithmResponse extends jspb.Message {
  getId(): string;
  setId(value: string): RunAlgorithmResponse;

  getIsrunning(): boolean;
  setIsrunning(value: boolean): RunAlgorithmResponse;

  getErrormessage(): string;
  setErrormessage(value: string): RunAlgorithmResponse;
  hasErrormessage(): boolean;
  clearErrormessage(): RunAlgorithmResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RunAlgorithmResponse.AsObject;
  static toObject(includeInstance: boolean, msg: RunAlgorithmResponse): RunAlgorithmResponse.AsObject;
  static serializeBinaryToWriter(message: RunAlgorithmResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RunAlgorithmResponse;
  static deserializeBinaryFromReader(message: RunAlgorithmResponse, reader: jspb.BinaryReader): RunAlgorithmResponse;
}

export namespace RunAlgorithmResponse {
  export type AsObject = {
    id: string,
    isrunning: boolean,
    errormessage?: string,
  }

  export enum ErrormessageCase { 
    _ERRORMESSAGE_NOT_SET = 0,
    ERRORMESSAGE = 3,
  }
}

