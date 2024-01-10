import { InteractionNodeServiceClient } from "interaction/external/protos/InteractionNodeServiceClientPb";
import { PORT_NUMBERS } from "utils/grpc/grpc.constants";

export const SCENE_CAPTURE_SERVICE = new InteractionNodeServiceClient(
  `http://localhost:${PORT_NUMBERS.SCENE_CAPTURE}/`
);
