import * as jspb from 'google-protobuf'

import * as google_api_annotations_pb from '../google/api/annotations_pb';


export class InitializeVisualInputNodeRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InitializeVisualInputNodeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: InitializeVisualInputNodeRequest): InitializeVisualInputNodeRequest.AsObject;
  static serializeBinaryToWriter(message: InitializeVisualInputNodeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InitializeVisualInputNodeRequest;
  static deserializeBinaryFromReader(message: InitializeVisualInputNodeRequest, reader: jspb.BinaryReader): InitializeVisualInputNodeRequest;
}

export namespace InitializeVisualInputNodeRequest {
  export type AsObject = {
  }
}

export class InitializeVisualInputNodeResponse extends jspb.Message {
  getIsinitialized(): boolean;
  setIsinitialized(value: boolean): InitializeVisualInputNodeResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InitializeVisualInputNodeResponse.AsObject;
  static toObject(includeInstance: boolean, msg: InitializeVisualInputNodeResponse): InitializeVisualInputNodeResponse.AsObject;
  static serializeBinaryToWriter(message: InitializeVisualInputNodeResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InitializeVisualInputNodeResponse;
  static deserializeBinaryFromReader(message: InitializeVisualInputNodeResponse, reader: jspb.BinaryReader): InitializeVisualInputNodeResponse;
}

export namespace InitializeVisualInputNodeResponse {
  export type AsObject = {
    isinitialized: boolean,
  }
}

