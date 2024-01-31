import { setScenePlayState } from "app/redux/scene-data/actions";
import { ScenePlayState } from "app/redux/scene-data/slice";
import { useAppDispatch } from "app/redux/store";
import { useCallback } from "react";
import { ENGINE_EVENTS } from "visual/display/engine/engine.consts";

const RESTART_SCENE_TIMEOUT = 1000;

export const useRestartScene = () => {
  const dispatch = useAppDispatch();
  const removeAllElements = () => {
    const videoElements = document.querySelectorAll("video");
    // Iterate through each video element and pause it
    videoElements.forEach((video) => {
      video.pause();
    });
    const container = document.getElementById("append-container");
    if (container) {
      container.innerHTML = "";
    }
  };

  return useCallback(() => {
    dispatch(setScenePlayState(ScenePlayState.STOP));
    removeAllElements();
    stopEngineEvents();
    setTimeout(() => {
      dispatch(setScenePlayState(ScenePlayState.PLAY));
    }, RESTART_SCENE_TIMEOUT);
  }, [dispatch]);
};

const stopEngineEvents = () => {
  Object.keys(ENGINE_EVENTS).forEach((key) => {
    document.removeEventListener(ENGINE_EVENTS[key], () => {
      console.warn(`${ENGINE_EVENTS[key]} removed`);
    });
  });
};
