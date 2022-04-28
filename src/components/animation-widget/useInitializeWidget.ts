import { useEffect, useState } from "react";
import { Clock, WebGLRenderer } from "three";
import { INITIAL_FRAMEWORK } from "./consts";
import { IAnimationWidgetScene, IFramework } from "./interfaces";
import { getHeightVhToPx, getWidthVwToPx } from "./utils";
import * as Scenes from "../../@visual/scenes/widget-scenes";

export const useInitializeWidget = (
  scenes: IAnimationWidgetScene[],
  viewWidth: string,
  viewHeight: string
) => {
  const [sceneIndex, updateSceneIndex] = useState<number>(0);
  const [sceneArray, setSceneArray] = useState<any[]>([]);

  // Initializes the INITIAL_FRAMEWORK and scenes
  useEffect(() => {
    initializeScenes(scenes);
  }, []);

  const initializeScenes = async (scenes: IAnimationWidgetScene[]) => {
    const returnArray: any = [];
    let errorCount = 0;
    scenes.forEach((sceneItem) => {
      const newScene = Scenes[sceneItem.name];
      newScene
        .init(sceneItem, manager)
        .then((response) => {
          const { scene, camera, sceneParams } = response;
          newScene.camera = camera;
          newScene.scene = scene;
          newScene.sceneParams = sceneParams;
          returnArray.push(newScene);
          if (errorCount + returnArray.length === scenes.length) {
            setSceneArray(returnArray);
          }
        })
        .catch((error) => {
          console.error(error);
          errorCount++;
        });
    });
  };

  const initializeFramework = () => {
    const returnManager: IFramework = {
      ...INITIAL_FRAMEWORK,
      breakAnimation: false,
      initialized: true,
      viewportWidth: getWidthVwToPx(Number(viewWidth.replace(/\D/g, ""))),
      viewportHeight: getHeightVhToPx(Number(viewHeight.replace(/\D/g, ""))),
      renderer: new WebGLRenderer({
        powerPreference: "high-performance",
        antialias: true,
      }),
      clock: new Clock(),
    };

    returnManager.renderer.setPixelRatio(window.devicePixelRatio);
    returnManager.renderer.setSize(window.innerWidth, window.innerHeight);

    return returnManager;
  };

  const [manager, setManager] = useState<IFramework>(initializeFramework());

  return { manager, setManager, sceneIndex, updateSceneIndex, sceneArray };
};
