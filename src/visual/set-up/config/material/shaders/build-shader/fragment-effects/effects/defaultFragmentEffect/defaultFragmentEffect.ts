import { FragmentEffectData } from "../../../buildShader.types";
import { EMPTY_UNIFORM_CONFIG } from "../../../shader-properties/uniforms/uniforms.consts";
import { FRAGMENT_COLOR_NAMES } from "../../fragmentEffects.consts";

export const defaultFragmentEffect = (): FragmentEffectData => {
  const fragmentColorName = FRAGMENT_COLOR_NAMES.DEFAULT;
  const uniformConfig = { ...EMPTY_UNIFORM_CONFIG };
  const transformation = `vec4 ${fragmentColorName} = vec4(1.0,0,0,1.0);`;
  return {
    requiredFunctions: [],
    uniformConfig,
    transformation,
    varyingConfig: [],
    attributeConfig: [],
    fragmentColorName,
  };
};
