import { Asset } from "visual/hooks/use-assets/types";
import { EventConfig } from "visual/hooks/use-events/events.types";
import { InteractionEventObject } from "visual/helpers/interactions/types";
import { ThreeJsParams } from "visual/hooks/use-three-js/types";
import { UniformDefinition } from "visual/shaders/shaders.types";
import { InteractiveMaterialFunctions } from "visual/components/interactive/shaders/shaders.types";

export interface WebGLShaderMaterialParams {
  shaderName: string;
  uniformDefinition: null | UniformDefinition[];
}

export interface InteractiveObjectParams {
  threeJsParams: ThreeJsParams;
  interactions: InteractionEventObject[];
  assets: Asset[];
  materialParams: WebGLShaderMaterialParams;
  materialFunctions: InteractiveMaterialFunctions;
  events?: EventConfig[];
}
