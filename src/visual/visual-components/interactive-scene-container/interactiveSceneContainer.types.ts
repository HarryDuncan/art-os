import { Asset } from "visual/hooks/use-assets/types";
import { InteractionEventObject } from "visual/helpers/interactions/types";
import { ThreeJsParams } from "visual/hooks/use-three-js/types";
import { SceneData } from "visual/components/interactive/scene/types";
import { CustomAnimation } from "visual/components/animation-manager/animationManager.types";

export interface InteractiveSceneProps {
  threeJsParams: ThreeJsParams;
  interactions: InteractionEventObject[];
  assets: Asset[];
  sceneFunctions;
  visualComponentConfig;
  formatSceneData: (loadedAssets: Asset[], context, dispatch) => SceneData;
  events;
  animations?: CustomAnimation[];
}
