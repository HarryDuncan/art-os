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

export class InitalizeAlgorithimResponse extends jspb.Message {
  getId(): string;
  setId(value: string): InitalizeAlgorithimResponse;

  getIsintialized(): boolean;
  setIsintialized(value: boolean): InitalizeAlgorithimResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InitalizeAlgorithimResponse.AsObject;
  static toObject(includeInstance: boolean, msg: InitalizeAlgorithimResponse): InitalizeAlgorithimResponse.AsObject;
  static serializeBinaryToWriter(message: InitalizeAlgorithimResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InitalizeAlgorithimResponse;
  static deserializeBinaryFromReader(message: InitalizeAlgorithimResponse, reader: jspb.BinaryReader): InitalizeAlgorithimResponse;
}

export namespace InitalizeAlgorithimResponse {
  export type AsObject = {
    id: string,
    isintialized: boolean,
  }
}

