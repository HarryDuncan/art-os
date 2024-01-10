import { setScenePlayState } from "app/redux/scene-data/actions";
import { ScenePlayState } from "app/redux/scene-data/slice";
import { useAppDispatch } from "app/redux/store";
import { useCallback } from "react";

const RESTART_SCENE_TIMEOUT = 1000;

export const useRestartScene = () => {
  const dispatch = useAppDispatch();
  return useCallback(() => {
    dispatch(setScenePlayState(ScenePlayState.STOP));
    setTimeout(() => {
      dispatch(setScenePlayState(ScenePlayState.PLAY));
    }, RESTART_SCENE_TIMEOUT);
  }, [dispatch]);
};
