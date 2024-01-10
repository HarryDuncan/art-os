import * as jspb from 'google-protobuf'



export class InitializeSceneCaptureRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InitializeSceneCaptureRequest.AsObject;
  static toObject(includeInstance: boolean, msg: InitializeSceneCaptureRequest): InitializeSceneCaptureRequest.AsObject;
  static serializeBinaryToWriter(message: InitializeSceneCaptureRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InitializeSceneCaptureRequest;
  static deserializeBinaryFromReader(message: InitializeSceneCaptureRequest, reader: jspb.BinaryReader): InitializeSceneCaptureRequest;
}

export namespace InitializeSceneCaptureRequest {
  export type AsObject = {
  }
}

export class InitializeSceneCaptureResponse extends jspb.Message {
  getIsInitialized(): boolean;
  setIsInitialized(value: boolean): InitializeSceneCaptureResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InitializeSceneCaptureResponse.AsObject;
  static toObject(includeInstance: boolean, msg: InitializeSceneCaptureResponse): InitializeSceneCaptureResponse.AsObject;
  static serializeBinaryToWriter(message: InitializeSceneCaptureResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InitializeSceneCaptureResponse;
  static deserializeBinaryFromReader(message: InitializeSceneCaptureResponse, reader: jspb.BinaryReader): InitializeSceneCaptureResponse;
}

export namespace InitializeSceneCaptureResponse {
  export type AsObject = {
    isInitialized: boolean,
  }
}

export class RunCaptureRequest extends jspb.Message {
  getCaptureName(): string;
  setCaptureName(value: string): RunCaptureRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RunCaptureRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RunCaptureRequest): RunCaptureRequest.AsObject;
  static serializeBinaryToWriter(message: RunCaptureRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RunCaptureRequest;
  static deserializeBinaryFromReader(message: RunCaptureRequest, reader: jspb.BinaryReader): RunCaptureRequest;
}

export namespace RunCaptureRequest {
  export type AsObject = {
    captureName: string,
  }
}

export class RunCaptureResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RunCaptureResponse.AsObject;
  static toObject(includeInstance: boolean, msg: RunCaptureResponse): RunCaptureResponse.AsObject;
  static serializeBinaryToWriter(message: RunCaptureResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RunCaptureResponse;
  static deserializeBinaryFromReader(message: RunCaptureResponse, reader: jspb.BinaryReader): RunCaptureResponse;
}

export namespace RunCaptureResponse {
  export type AsObject = {
  }
}

export class StopCaptureRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StopCaptureRequest.AsObject;
  static toObject(includeInstance: boolean, msg: StopCaptureRequest): StopCaptureRequest.AsObject;
  static serializeBinaryToWriter(message: StopCaptureRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StopCaptureRequest;
  static deserializeBinaryFromReader(message: StopCaptureRequest, reader: jspb.BinaryReader): StopCaptureRequest;
}

export namespace StopCaptureRequest {
  export type AsObject = {
  }
}

export class StopCaptureResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StopCaptureResponse.AsObject;
  static toObject(includeInstance: boolean, msg: StopCaptureResponse): StopCaptureResponse.AsObject;
  static serializeBinaryToWriter(message: StopCaptureResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StopCaptureResponse;
  static deserializeBinaryFromReader(message: StopCaptureResponse, reader: jspb.BinaryReader): StopCaptureResponse;
}

export namespace StopCaptureResponse {
  export type AsObject = {
  }
}

