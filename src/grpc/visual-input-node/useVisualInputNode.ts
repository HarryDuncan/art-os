import { PORT_NUMBERS } from "grpc/grpc.constants";
import { VisualInputNodeServiceClient } from "grpc/protos/VisualInputNodeServiceClientPb";
import { InitializeVisualInputNodeRequest } from "grpc/protos/visualInputNode_pb";

export const useVisualInputNode = () => {
  const client = new VisualInputNodeServiceClient(
    `http://localhost:${PORT_NUMBERS.VISUAL_INPUT_NODE}/`
  );

  const request = new InitializeVisualInputNodeRequest();
  client.initializeVisualInputNode(request, {}, (err, response) => {
    if (err) {
      console.log(err);
    }
    console.log(response);
  });
};
