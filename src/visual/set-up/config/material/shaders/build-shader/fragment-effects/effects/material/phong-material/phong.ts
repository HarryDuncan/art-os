import {
  FragmentEffectData,
  MaterialEffectProps,
  PhongFragmentEffectProps,
} from "../../../../types";
import { FRAGMENT_COLOR_NAMES } from "../../../fragmentEffects.consts";
import { generateUniqueFragName } from "../../../../helpers/generateUniqueFragName";
import {
  DEFAULT_PHONG_EFFECT_PROPS,
  DEFAULT_PHONG_UNIFORMS,
  PHONG_REQUIRED_FUNCTIONS,
  PHONG_VARYINGS,
} from "./phong.consts";
import { formatFragmentParameters } from "../../../../helpers/formatFragmentParameters";
import { phongTransform } from "./phongTransform";

export const phongMaterial = (
  previousFragName: string,
  effectProps: Partial<PhongFragmentEffectProps> = {}
): FragmentEffectData => {
  const fragName = generateUniqueFragName(
    FRAGMENT_COLOR_NAMES.MATERIAL,
    effectProps.pointParent
  );

  const formattedProps = formatFragmentParameters(
    effectProps,
    DEFAULT_PHONG_EFFECT_PROPS
  ) as MaterialEffectProps;

  const { transform } = phongTransform(
    fragName,
    previousFragName,
    formattedProps
  );
  const uniformConfig = DEFAULT_PHONG_UNIFORMS;
  const varyingConfig = PHONG_VARYINGS;
  const requiredFunctions = PHONG_REQUIRED_FUNCTIONS;

  return {
    requiredFunctions,
    uniformConfig,
    transformation: transform,
    varyingConfig,
    attributeConfig: [],
    fragName,
  };
};
