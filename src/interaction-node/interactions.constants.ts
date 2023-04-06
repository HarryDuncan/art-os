import { PORT_NUMBERS } from "utils/grpc/grpc.constants";
import { InteractionNodeServiceClient } from "./protos/InteractionNodeServiceClientPb";

export const INTERACTION_ALGORITHIMS = {
  BODY_PIX: "BODY_PIX",
};

export const INTERACTION_NODE_CLIENT = new InteractionNodeServiceClient(
  `http://localhost:${PORT_NUMBERS.INTERACTION_NODE}/`
);

export const DATA_TRANSFORM_TYPE = {
  PERSON_POSITION: "PERSON_POSITION",
};
