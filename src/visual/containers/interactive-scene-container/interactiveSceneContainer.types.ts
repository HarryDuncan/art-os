import { Asset } from "utils/assets/use-assets/types";
import { InteractionEventObject } from "visual/helpers/interactions/types";
import { ThreeJsParams } from "visual/hooks/use-three-js/types";
import { SceneData } from "visual/components/interactive/scene/types";
import { CustomAnimationConfig } from "visual/animation/animation.types";

export interface InteractiveSceneProps {
  threeJsParams: ThreeJsParams;
  interactions: InteractionEventObject[];
  assets: Asset[];
  sceneFunctions;
  visualComponentConfig;
  events;
  animations?: CustomAnimationConfig[];
  sceneData: SceneData;
}
