import { VisualComponentConfig } from "app/redux/visual/types";
import { Asset } from "visual/hooks/use-assets/types";
import { InteractionEventObject } from "visual/helpers/interactions/types";
import { ThreeJsParams } from "visual/hooks/use-three-js/types";

export interface InteractiveSceneParams {
  threeJsParams: ThreeJsParams;
  interactionEvents: InteractionEventObject[];
  assets: Asset[];
  materialFunctions: any;
  materialParams: any;
  sceneFunctions: any;
  visualComponentConfig: VisualComponentConfig;
  formatSceneData: any;
}
