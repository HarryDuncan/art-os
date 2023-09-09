import { Scene } from "three";
import { SceneProperties } from "visual/set-up/config/config.types";

export const setSceneProperties = (
  sceneProperties: SceneProperties | undefined,
  scene: Scene
) => {
  if (!sceneProperties) return;
  if (sceneProperties.background !== null) {
    scene.background = sceneProperties?.background ?? null;
  }
};
