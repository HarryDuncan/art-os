import * as Scenes from "visual/function-based-scenes";
import { IAnimationWidgetScene } from "../types";
import { cloneDeep } from "lodash";
import { useCallback } from "react";
import { FunctionBasedScene } from "visual/function-based-scenes/types";

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
