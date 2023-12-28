import { useAppDispatch } from "app/redux/store";
import { useCallback } from "react";
import { INTERACTION_NODE_CLIENT } from "../interactions.constants";
import { StopAlgorithmRequest } from "../protos/interactionNode_pb";
import { setAlgorithm } from "app/redux/interaction/actions";

export const useStopAlgorithm = () => {
  const dispatch = useAppDispatch();
  return useCallback(() => {
    const client = INTERACTION_NODE_CLIENT;
    const request = new StopAlgorithmRequest();
    client.stopAlgorithm(request, null, () => {
      dispatch(
        setAlgorithm({ isAlgorithmInitialized: false, algorithmType: null })
      );
    });
  }, [dispatch]);
};
