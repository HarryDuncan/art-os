import { useCallback, useEffect } from "react";
import { useAppDispatch } from "app/redux/store";
import { setInteractionEvents } from "app/redux/interaction/actions";
import { useInitializeAlgorithm } from "./interaction-node-requests/useInitializeAlgorithm";
import {
  ExternalInteractionConfig,
  InteractionConfig,
} from "interaction/interactions.types";
import { INTERACTION_ALGORITHIMS, KEYPOINT } from "./interactions.constants";

const CONFIG = {
  algorithmType: INTERACTION_ALGORITHIMS.POSENET,
  algorithmConfig: {
    threshold: 0.8,
    keypoints: [KEYPOINT.LEFT_WRIST],
  },
  dataTransformType: "keypoint-positions",
  id: "algo",
};
export const useExternalInteractions = (
  externalInteractionConfig: ExternalInteractionConfig | undefined
) => {
  const initializeAlgorithm = useInitializeAlgorithm();
  useEffect(() => {
    initializeAlgorithm(CONFIG);
  }, [initializeAlgorithm]);

  const dispatch = useAppDispatch();
  return useCallback((interactionEvents: InteractionConfig[]) => {
    dispatch(setInteractionEvents({ interactionEvents }));
  }, []);
};
