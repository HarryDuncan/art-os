import { FRAGMENT_COLOR_NAMES } from "../../fragmentEffects.consts";
import {
  FragmentEffectData,
  OpacityEffectProps,
  VanishEffectProps,
} from "../../../buildShader.types";

import { formatFragmentParameters } from "../../../helpers/formatFragmentParameters";
import { generateUniqueFragName } from "../../../helpers/generateUniqueFragName";
import {
  DEFAULT_VANISH_EFFECT_PARAMS,
  VANISH_ATTRIBUTES,
  VANISH_FUNCTIONS,
  VANISH_UNIFORMS,
  VANISH_VARYINGS,
} from "./vanish.consts";
import { vanishTransform } from "./vanishTransform";

export const vanishEffect = (
  previousFragName: string,
  effectProps: Partial<VanishEffectProps>
): FragmentEffectData => {
  const formattedEffectParams = formatFragmentParameters(
    effectProps,
    DEFAULT_VANISH_EFFECT_PARAMS
  ) as VanishEffectProps;
  const fragName = generateUniqueFragName(
    FRAGMENT_COLOR_NAMES.VANISH,
    formattedEffectParams.pointParent
  );
  const uniformConfig = VANISH_UNIFORMS;
  const varyingConfig = VANISH_VARYINGS;
  const requiredFunctions = VANISH_FUNCTIONS;
  const attributeConfig = VANISH_ATTRIBUTES;
  const { fragmentColorInstantiation, transformation } = vanishTransform(
    fragName,
    previousFragName,
    formattedEffectParams
  );
  return {
    requiredFunctions,
    uniformConfig,
    transformation,
    varyingConfig,
    attributeConfig,
    fragName,
    fragmentColorInstantiation,
  };
};
