import { useAppDispatch } from "app/redux/store";
import { getResponseValue } from "utils/grpc/getResponseValue";
import { mapResponseToObject } from "utils/grpc/mapResponseToObject";
import { setInitialization } from "app/redux/interaction/actions";
import { useEffect } from "react";
import { INTERACTION_NODE_CLIENT } from "./interactions.constants";
import { InitializeInteractionNodeRequest } from "./protos/interactionNode_pb";

const initializeResponseObj = {
  isInitialized: false,
};
export const useInteractionNode = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const client = INTERACTION_NODE_CLIENT;
    const request = new InitializeInteractionNodeRequest();
    client.initializeInteractionNode(request, {}, (err, response) => {
      if (err) {
        console.error(err);
      }
      const values = getResponseValue(response);
      const formatted = mapResponseToObject(values, initializeResponseObj);
      dispatch(setInitialization(formatted as { isInitialized: boolean }));
    });
  }, []);
};
