import { IAnimationWidgetScene, FunctionBasedScene } from "../types";
import { cloneDeep } from "lodash";
import * as Scenes from "../../../scenes/widget-scenes";
import { useCallback } from "react";

export const useInitializeScenes = (scenes: IAnimationWidgetScene[]) => {
  async function initializeScene(unInitializedScene: IAnimationWidgetScene) {
    const { name } = unInitializedScene;
    const initializedScene: FunctionBasedScene = cloneDeep(Scenes[name]);
    const { scene, camera, sceneParams } = await initializedScene.init(
      unInitializedScene
    );
    initializedScene.camera = camera;
    initializedScene.scene = scene;
    initializedScene.sceneParams = sceneParams;
    initializedScene.name = name;
    return initializedScene;
  }

  return useCallback(async () => {
    const loadedScenes = await Promise.all(
      scenes.map(async (scene) => initializeScene(scene))
    );
    return loadedScenes;
  }, [scenes]);
};
