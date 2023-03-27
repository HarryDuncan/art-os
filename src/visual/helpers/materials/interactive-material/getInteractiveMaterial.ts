import {
  InteractiveRawShader,
  InteractiveShader,
} from "visual/components/interactive";
import { INTERACTIVE_SHADER_TYPES } from "visual/components/interactive/shaders/shaders.constants";
import { getBoundInteractions } from "../../interactions/getBoundInteractions";
import { Binding, InteractionEventObject } from "../../interactions/types";
import { InteractiveMaterialParameters } from "../materials.types";

export const getInteractiveMaterial = (
  materialParams: InteractiveMaterialParameters,
  interactions: InteractionEventObject[],
  materialFunctions
) => {
  const {
    shaderType,
    shaders,
    uniforms,
  } = materialParams as InteractiveMaterialParameters;
  const boundInteractions = getBoundInteractions(
    interactions,
    Binding.InteractiveMesh
  );
  switch (shaderType) {
    case INTERACTIVE_SHADER_TYPES.RAW_SHADER:
      return new InteractiveRawShader(
        uniforms,
        shaders,
        boundInteractions,
        materialFunctions
      );
    case INTERACTIVE_SHADER_TYPES.SHADER:
      return new InteractiveShader(
        uniforms,
        shaders,
        boundInteractions,
        materialFunctions
      );

    case INTERACTIVE_SHADER_TYPES.NON_INTERACTIVE:
    default:
  }
};
