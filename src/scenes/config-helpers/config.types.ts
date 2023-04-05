import { CustomAnimationConfig } from "visual/animation/animation.types";
import { SceneComponentConfig } from "visual/components/interactive";
import { MaterialConfig } from "visual/helpers/materials/materials.types";
import { LightConfigs } from "visual/scene-elements/lights/lights.types";

export type SceneDataConfig = {
  meshComponentConfigs: Record<string, unknown>;
  globalMaterialConfigs: MaterialConfig[];
  animationConfig: CustomAnimationConfig[];
  lightConfig: LightConfigs[];
  sceneComponentConfigs?: SceneComponentConfig[];
};
