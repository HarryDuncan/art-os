import { useCallback, useEffect, useState } from "react";
import {
  InteractiveScene,
  InteractiveSceneFunctions,
} from "./InteractiveScene";
import { EventConfig } from "interaction/interactions.types";
import { AnimationConfig } from "visual/display/animation/animation.types";
import { Object3D } from "three";
import { SceneLight } from "visual/display/scene-elements/lights/lights.types";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { setSceneProperties } from "visual/display/helpers/scene/setSceneProperties";
import { SceneProperties } from "visual/set-up/config/config.types";

export const useInteractiveScene = (
  sceneFunction: InteractiveSceneFunctions,
  eventConfig: EventConfig[],
  animationConfig: AnimationConfig[],
  meshes: Object3D[],
  lights: SceneLight[],
  sceneComponents: Object3D[],
  orbitControls: OrbitControls | null,
  sceneProperties: SceneProperties
): null | InteractiveScene => {
  const [initializedScene, setScene] = useState<null | InteractiveScene>(null);
  const setUpSceneObjects = useCallback(
    async (scene: InteractiveScene) => {
      meshes.forEach((mesh) => scene.add(mesh));
      lights.forEach((light) => scene.add(light));
      sceneComponents.forEach((component) => scene.add(component));
      scene.addOrbitControls(orbitControls);
      setSceneProperties(sceneProperties, scene);
      setScene(scene);
    },
    [setScene, meshes, lights, sceneComponents, orbitControls, sceneProperties]
  );
  useEffect(() => {
    async function setUpScene() {
      const scene = new InteractiveScene(
        sceneFunction,
        eventConfig,
        animationConfig
      );
      await setUpSceneObjects(scene);
    }
    setUpScene();
  }, [sceneFunction, eventConfig, animationConfig, setUpSceneObjects]);

  return initializedScene;
};
