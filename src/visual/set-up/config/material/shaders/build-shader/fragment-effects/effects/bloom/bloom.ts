import { FRAGMENT_COLOR_NAMES } from "../../fragmentEffects.consts";
import { FragmentEffectData, BloomEffectProps } from "../../../types";
import {
  BLOOM_UNIFORMS,
  BLOOM_VARYINGS,
  BLOOM_FUNCTIONS,
  BLOOM_ATTRIBUTES,
  DEFAULT_BLOOM_EFFECT_PARAMS,
} from "./bloom.consts";
import { formatFragmentParameters } from "../../../helpers/formatFragmentParameters";
import { bloomTransform } from "./bloomTransform";
import { generateUniqueFragName } from "../../../helpers/generateUniqueFragName";

export const bloom = (
  previousFragName: string,
  effectProps: Partial<BloomEffectProps>
): FragmentEffectData => {
  const formattedEffectParams = formatFragmentParameters(
    effectProps,
    DEFAULT_BLOOM_EFFECT_PARAMS
  ) as BloomEffectProps;
  const fragName = generateUniqueFragName(
    FRAGMENT_COLOR_NAMES.BLOOM,
    formattedEffectParams.pointParent
  );
  const uniformConfig = BLOOM_UNIFORMS;
  const varyingConfig = BLOOM_VARYINGS;
  const requiredFunctions = BLOOM_FUNCTIONS;
  const attributeConfig = BLOOM_ATTRIBUTES;
  const { fragmentColorInstantiation, transformation } = bloomTransform(
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
