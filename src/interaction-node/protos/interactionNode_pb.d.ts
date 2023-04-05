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

