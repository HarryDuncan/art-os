import { PORT_NUMBERS } from "utils/grpc/grpc.constants";
import { SceneCaptureServiceClient } from "./protos/SceneCaptureServiceClientPb";

export const SCENE_CAPTURE_SERVICE = new SceneCaptureServiceClient(
  `http://localhost:${PORT_NUMBERS.SCENE_CAPTURE}/`
);

export const SCENE_CAPTURE_STATES = {
  RECORDING: "RECORDING",
  STOPPED: "STOPPED",
};
