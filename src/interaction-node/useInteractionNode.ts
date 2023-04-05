import { PORT_NUMBERS } from "interaction-node/grpc.constants";
import { InteractionNodeServiceClient } from "./protos/InteractionNodeServiceClientPb";
import { InitializeInteractionNodeRequest } from "./protos/interactionNode_pb";

export const useInteractionNode = () => {
  const client = new InteractionNodeServiceClient(
    `http://localhost:${PORT_NUMBERS.VISUAL_INPUT_NODE}/`
  );

  const request = new InitializeInteractionNodeRequest();
  client.initializeInteractionNode(request, {}, (err, response) => {
    if (err) {
      console.log(err);
    }
    console.log(response);
  });
};
