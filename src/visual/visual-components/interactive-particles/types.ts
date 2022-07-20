import {
  InteractiveMaterialFunctions,
  InteractiveParam,
} from "visual/components/interactive-shaders/types";
import { Asset } from "visual/hooks/use-assets/types";
import { InteractionEventObject } from "visual/hooks/use-interactions/types";
import { ThreeJsParams } from "visual/hooks/use-three-js/types";

export interface InteractiveParticlesParams {
  threeJsParams: ThreeJsParams;
  interactionEvents: InteractionEventObject[];
  assets: Asset[];
  materialParams: InteractiveParam;
  materialFunctions: InteractiveMaterialFunctions;
}

export interface TextureFeature {
  textureData: any;
  width: number;
  height: number;
  numberOfPoints: number;
}
