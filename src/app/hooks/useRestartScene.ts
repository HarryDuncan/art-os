import { setScenePlayState } from "app/redux/scene-data/actions";
import { ScenePlayState } from "app/redux/scene-data/slice";
import { useAppDispatch } from "app/redux/store";
import { useCallback } from "react";

const RESTART_SCENE_TIMEOUT = 1000;

export const useRestartScene = () => {
  const dispatch = useAppDispatch();
  const removeAllElements = () => {
    const container = document.getElementById("append-container");
    if (container) {
      container.innerHTML = "";
    }
  };

  return useCallback(() => {
    dispatch(setScenePlayState(ScenePlayState.STOP));
    removeAllElements();
    setTimeout(() => {
      dispatch(setScenePlayState(ScenePlayState.PLAY));
    }, RESTART_SCENE_TIMEOUT);
  }, [dispatch]);
};
