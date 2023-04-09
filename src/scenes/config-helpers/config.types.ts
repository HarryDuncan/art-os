import { CustomAnimationConfig } from "visual/animation/animation.types";

import { Asset } from "utils/assets/use-assets/types";
import { LightConfigs } from "visual/scene-elements/lights/lights.types";
import { ThreeDPosition } from "visual/helpers/three-dimension-space/position/position.types";
import { MaterialConfig } from "visual/materials/materials.types";
import { SceneComponentConfig } from "visual/components/interactive-scene";
import { InteractionConfig } from "interaction-node/interactions.types";

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
  interactionConfig?: InteractionConfig[];
};
