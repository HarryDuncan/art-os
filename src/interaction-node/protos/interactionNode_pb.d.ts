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
  getPointsList(): Array<RunAlgorithmResponse.Locations>;
  setPointsList(value: Array<RunAlgorithmResponse.Locations>): RunAlgorithmResponse;
  clearPointsList(): RunAlgorithmResponse;
  addPoints(value?: RunAlgorithmResponse.Locations, index?: number): RunAlgorithmResponse.Locations;

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
    pointsList: Array<RunAlgorithmResponse.Locations.AsObject>,
    errormessage?: string,
  }

  export class Locations extends jspb.Message {
    getX(): number;
    setX(value: number): Locations;

    getY(): number;
    setY(value: number): Locations;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Locations.AsObject;
    static toObject(includeInstance: boolean, msg: Locations): Locations.AsObject;
    static serializeBinaryToWriter(message: Locations, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Locations;
    static deserializeBinaryFromReader(message: Locations, reader: jspb.BinaryReader): Locations;
  }

  export namespace Locations {
    export type AsObject = {
      x: number,
      y: number,
    }
  }


  export enum ErrormessageCase { 
    _ERRORMESSAGE_NOT_SET = 0,
    ERRORMESSAGE = 2,
  }
}

export class StopAlgorithmRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StopAlgorithmRequest.AsObject;
  static toObject(includeInstance: boolean, msg: StopAlgorithmRequest): StopAlgorithmRequest.AsObject;
  static serializeBinaryToWriter(message: StopAlgorithmRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StopAlgorithmRequest;
  static deserializeBinaryFromReader(message: StopAlgorithmRequest, reader: jspb.BinaryReader): StopAlgorithmRequest;
}

export namespace StopAlgorithmRequest {
  export type AsObject = {
  }
}

export class StopAlgorithmResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StopAlgorithmResponse.AsObject;
  static toObject(includeInstance: boolean, msg: StopAlgorithmResponse): StopAlgorithmResponse.AsObject;
  static serializeBinaryToWriter(message: StopAlgorithmResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StopAlgorithmResponse;
  static deserializeBinaryFromReader(message: StopAlgorithmResponse, reader: jspb.BinaryReader): StopAlgorithmResponse;
}

export namespace StopAlgorithmResponse {
  export type AsObject = {
  }
}

