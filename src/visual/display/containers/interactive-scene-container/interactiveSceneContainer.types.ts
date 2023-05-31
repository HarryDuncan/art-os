import { CustomAnimationConfig } from "visual/display/animation/animation.types";
import { SceneData } from "visual/display/components/interactive-scene";
import { ThreeJsParams } from "visual/display/hooks/use-three-js/types";
import { Asset } from "visual/set-up/assets/use-assets/types";

export interface InteractiveSceneProps {
  threeJsParams: ThreeJsParams;
  assets: Asset[];
  sceneFunctions;
  visualComponentConfig;
  events;
  animations?: CustomAnimationConfig[];
  sceneData: SceneData;
}
