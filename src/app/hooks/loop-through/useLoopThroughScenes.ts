import { useAppDispatch } from "app/redux/store";
import { useRestartScene } from "../useRestartScene";
import { incrementSceneIndex } from "app/redux/scene-data/actions";
import { useCallback } from "react";

const LOOP_THROUGH_CONFIG = {
  sceneLengthSeconds: 80000,
};
export const useLoopThroughScenes = () => {
  const appDispatch = useAppDispatch();
  const restartScene = useRestartScene();
  const handleChange = useCallback(() => {
    restartScene();
    appDispatch(incrementSceneIndex());
  }, [appDispatch, restartScene]);

  return useCallback(() => {
    const intervalId = setInterval(() => {
      handleChange();
    }, LOOP_THROUGH_CONFIG.sceneLengthSeconds);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [handleChange]);
};
