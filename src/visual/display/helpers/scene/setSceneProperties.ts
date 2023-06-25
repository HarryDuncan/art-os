import { Scene } from "three";
import { SceneProperties } from "visual/display/components/interactive-scene";

export const setSceneProperties = (
  sceneProperties: SceneProperties | undefined,
  scene: Scene
) => {
  if (!sceneProperties) return;
  if (sceneProperties.background !== null) {
    scene.background = sceneProperties?.background ?? null;
  }
};
