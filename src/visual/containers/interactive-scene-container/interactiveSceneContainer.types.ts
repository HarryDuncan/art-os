import { Asset } from "utils/assets/use-assets/types";
import { ThreeJsParams } from "visual/hooks/use-three-js/types";
import { CustomAnimationConfig } from "visual/animation/animation.types";
import { SceneData } from "visual/components/interactive-scene";

export interface InteractiveSceneProps {
  threeJsParams: ThreeJsParams;
  assets: Asset[];
  sceneFunctions;
  visualComponentConfig;
  events;
  animations?: CustomAnimationConfig[];
  sceneData: SceneData;
}
