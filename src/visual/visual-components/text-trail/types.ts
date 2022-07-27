import { Asset } from "visual/hooks/use-assets/types";
import { InteractionEventObject } from "visual/hooks/use-interactions/types";
import { ThreeJsParams } from "visual/hooks/use-three-js/types";

export type TextTrailParams = {
  threeJsParams: ThreeJsParams;
  interactionEvents: InteractionEventObject[];
  assets: Asset[];
  materialParams: any;
  materialFunctions: any;
};
