import { PORT_NUMBERS } from "utils/grpc/grpc.constants";
import { InteractionNodeServiceClient } from "./protos/InteractionNodeServiceClientPb";

export enum INTERACTION_ALGORITHIMS {
  BODY_PIX = "BODY_PIX",
  POSENET = "POSENET",
}

export enum KEYPOINT {
  NOSE,
  LEFT_EYE,
  RIGHT_EYE,
  LEFT_EAR,
  RIGHT_EAR,
  LEFT_SHOULDER,
  RIGHT_SHOULDER,
  LEFT_ELBOW,
  RIGHT_ELBOW,
  LEFT_WRIST,
  RIGHT_WRIST,
  LEFT_HIP,
  RIGHT_HIP,
  LEFT_KNEE,
  RIGHT_KNEE,
  LEFT_ANKLE,
  RIGHT_ANKLE,
}

export const INTERACTION_NODE_CLIENT = new InteractionNodeServiceClient(
  `http://localhost:${PORT_NUMBERS.INTERACTION_NODE}/`
);

export const DATA_TRANSFORM_TYPE = {
  PERSON_POSITION: "PERSON_POSITION",
};

export const EVENT_BINDING_TYPE = {
  SCENE: "SCENE",
  MATERIAL: "MATERIAL",
};

export const EXTERNAL_INTERACTION_EVENT_KEYS = {
  POSITION_UPDATE: "position:update",
};
