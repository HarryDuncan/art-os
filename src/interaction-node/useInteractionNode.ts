import { PORT_NUMBERS } from "interaction-node/grpc.constants";
import { InteractionNodeServiceClient } from "./protos/InteractionNodeServiceClientPb";
import { InitializeInteractionNodeRequest } from "./protos/interactionNode_pb";
import { useAppDispatch, useAppSelector } from "app/redux/store";
import { getResponseValue } from "utils/grpc/getResponseValue";
import { mapResponseToObject } from "utils/grpc/mapResponseToObject";
import { setInitialization } from "app/redux/interaction-node/actions";
import { useEffect } from "react";

const initializeResponseObj = {
  isInitialized: false,
};
export const useInteractionNode = () => {
  const { isInitialized } = useAppSelector((state) => state.interactionNode);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const client = new InteractionNodeServiceClient(
      `http://localhost:${PORT_NUMBERS.VISUAL_INPUT_NODE}/`
    );
    const request = new InitializeInteractionNodeRequest();
    client.initializeInteractionNode(request, {}, (err, response) => {
      if (err) {
        console.log(err);
      }
      const values = getResponseValue(response);
      const formatted = mapResponseToObject(values, initializeResponseObj);
      dispatch(setInitialization(formatted as { isInitialized: boolean }));
    });
  }, []);
};
