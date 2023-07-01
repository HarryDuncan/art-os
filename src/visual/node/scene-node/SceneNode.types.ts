import { CustomAnimationConfig } from "visual/display/animation/animation.types";
import { SceneData } from "visual/display/components/interactive-scene";
import { Asset } from "visual/set-up/assets/use-assets/types";

export interface SceneNodeProps {
  assets: Asset[];
  sceneFunctions;
  visualComponentConfig;
  events;
  animations?: CustomAnimationConfig[];
  sceneData: SceneData;
}
