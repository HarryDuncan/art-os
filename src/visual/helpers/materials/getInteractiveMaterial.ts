import { InteractiveRawShader } from "visual/components/interactive-shaders/interactive-raw-shader";
import { InteractiveShader } from "visual/components/interactive-shaders/interactive-shader";
import { InteractiveShaderTypes } from "visual/components/interactive-shaders/types";
import { InteractiveMaterialParameters } from "../assets/geometry/types";
import { getBoundInteractions } from "../interactions/getBoundInteractions";
import { Binding, InteractionEventObject } from "../interactions/types";

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
    case InteractiveShaderTypes.RAW_SHADER:
      return new InteractiveRawShader(
        uniforms,
        shaders,
        boundInteractions,
        materialFunctions
      );
    case InteractiveShaderTypes.SHADER:
      return new InteractiveShader(
        uniforms,
        shaders,
        boundInteractions,
        materialFunctions
      );

    case InteractiveShaderTypes.NON_INTERACTIVE:
    default:
  }
};
