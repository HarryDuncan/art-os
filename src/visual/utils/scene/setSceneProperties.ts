import { InteractiveScene } from "visual/display/components/interactive-scene/InteractiveScene";
import { SceneProperties } from "visual/set-up/config/config.types";

export const setSceneProperties = (
  sceneProperties: SceneProperties | undefined,
  scene: InteractiveScene
) => {
  if (!sceneProperties) return;
  if (sceneProperties.background !== null) {
    scene.background = sceneProperties?.background ?? null;
  }
  const sceneId = sceneProperties.sceneId ?? "";
  scene.guid = sceneId;
};
