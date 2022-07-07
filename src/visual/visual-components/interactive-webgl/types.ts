import { InteractiveMaterialFunctions } from "visual/components/interactive-material/types";
import { Asset } from "visual/hooks/use-assets/types";
import { InteractionEventObject } from "visual/hooks/use-interactions/types";
import { ThreeJsParams } from "visual/hooks/use-three-js/types";
import { UniformDefinition } from "visual/shaders/types";

export interface WebGLShaderMaterialParams {
  shaderName: string;
  uniformDefinition: null | UniformDefinition[];
}

export interface InteractiveObjectParams {
  threeJsParams: ThreeJsParams;
  interactionEvents: InteractionEventObject[];
  assets: Asset[];
  materialParams: WebGLShaderMaterialParams;
  materialFunctions: InteractiveMaterialFunctions;
}
