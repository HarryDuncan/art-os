import { CustomAnimationConfig } from "visual/animation/animation.types";
import { SceneComponentConfig } from "visual/components/interactive";
import { MaterialConfig } from "visual/helpers/materials/materials.types";
import { Asset } from "utils/assets/use-assets/types";
import { LightConfigs } from "visual/scene-elements/lights/lights.types";
import { ThreeDPosition } from "visual/helpers/three-dimension-space/position/position.types";

export type MeshComponentConfig = {
  id: string;
  geometryId?: string;
  rotation?: Partial<ThreeDPosition>;
  position?: Partial<ThreeDPosition>;
  size?: number;
  materialConfig: MaterialConfig;
};
export type SceneDataConfig = {
  assets?: Asset[];
  meshComponentConfigs: MeshComponentConfig[];
  globalMaterialConfigs: MaterialConfig[];
  animationConfig: CustomAnimationConfig[];
  lightConfig: LightConfigs[];
  sceneComponentConfigs?: SceneComponentConfig[];
  // TOOD - type config
  interactionConfig?: any;
};
