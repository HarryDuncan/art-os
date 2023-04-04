import { AnimationConfig } from "visual/animation/animation.types";
import { MaterialConfig } from "visual/helpers/materials/materials.types";
import { LightConfigs } from "visual/scene-elements/lights/lights.types";

export type SceneDataConfig = {
  meshComponentConfigs: Record<string, unknown>;
  globalMaterialConfigs: MaterialConfig[];
  animationConfig: AnimationConfig[];
  lightConfig: LightConfigs[];
};
