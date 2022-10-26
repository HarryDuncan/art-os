import {
  InteractiveMaterialFunctions,
  InteractiveParam,
} from "visual/components/interactive-shaders/types";
import { Asset } from "visual/hooks/use-assets/types";
import { InteractionEventObject } from "visual/helpers/interactions/types";
import { ThreeJsParams } from "visual/hooks/use-three-js/types";

export interface InteractiveObjectParams {
  threeJsParams: ThreeJsParams;
  interactionEvents: InteractionEventObject[];
  assets: Asset[];
  materialParams: InteractiveParam;
  materialFunctions: InteractiveMaterialFunctions;
}
