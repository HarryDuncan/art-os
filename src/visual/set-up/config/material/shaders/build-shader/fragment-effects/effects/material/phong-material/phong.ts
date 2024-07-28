import { FragmentEffectData, MaterialEffectProps } from "../../../../types";
import { FRAGMENT_COLOR_NAMES } from "../../../fragmentEffects.consts";
import { generateUniqueFragName } from "../../../../helpers/generateUniqueFragName";
import {
  DEFAULT_MATCAP_EFFECT_PROPS,
  DEFAULT_MATCAP_UNIFORMS,
  MATCAP_REQUIRED_FUNCTIONS,
  MATCAP_VARYINGS,
} from "./phong.consts";
import { formatFragmentParameters } from "../../../../helpers/formatFragmentParameters";
import { phongTransform } from "./phongTransform";

export const phongMaterial = (
  previousFragName: string,
  effectProps: Partial<MaterialEffectProps> = {}
): FragmentEffectData => {
  const fragName = generateUniqueFragName(
    FRAGMENT_COLOR_NAMES.MATERIAL,
    effectProps.pointParent
  );

  const formattedProps = formatFragmentParameters(
    effectProps,
    DEFAULT_MATCAP_EFFECT_PROPS
  ) as MaterialEffectProps;

  const { transform } = phongTransform(
    fragName,
    previousFragName,
    formattedProps
  );
  const uniformConfig = DEFAULT_MATCAP_UNIFORMS;
  const varyingConfig = MATCAP_VARYINGS;
  const requiredFunctions = MATCAP_REQUIRED_FUNCTIONS;

  return {
    requiredFunctions,
    uniformConfig,
    transformation: transform,
    varyingConfig,
    attributeConfig: [],
    fragName,
  };
};
