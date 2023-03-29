import { PORT_NUMBERS } from "grpc/grpc.constants";
import { VisualInputNodeServiceClient } from "grpc/protos/VisualInputNodeServiceClientPb";
import { InitializeVisualInputNodeRequest } from "grpc/protos/visualInputNode_pb";
import { grpc } from "@improbable-eng/grpc-web";

export const useVisualInputNode = () => {
  const client = new VisualInputNodeServiceClient(
    `http://localhost:${PORT_NUMBERS.VISUAL_INPUT_NODE}`,
    {
      transport: String(grpc.WebsocketTransport()),
    }
  );

  const request = new InitializeVisualInputNodeRequest();
  client.initializeVisualInputNode(request, {}, (err, response) => {
    console.log(response);
  });
};
