import { FragmentEffectData, MaterialEffectProps } from "../../../../types";
import { FRAGMENT_COLOR_NAMES } from "../../../fragmentEffects.consts";
import { generateUniqueFragName } from "../../../../helpers/generateUniqueFragName";
import { formatFragmentParameters } from "../../../../helpers/formatFragmentParameters";
import { DEFAULT_UNIFORM_CONFIG } from "../../../../vertex-effects/effects/morph/morphVertex.consts";
import { physicalMaterialTransform } from "./physicalMaterialTransform";
import {
  DEFAULT_PHYSICAL_MATERIAL_EFFECT_PROPS,
  PHYSICAL_MATERIAL_UNIFORM_CONFIG,
} from "./physicalMaterial.consts";

export const physicalMaterial = (
  previousFragName: string,
  effectProps: Partial<MaterialEffectProps> = {}
): FragmentEffectData => {
  const fragName = generateUniqueFragName(
    FRAGMENT_COLOR_NAMES.PHYSICAL_MATERIAL,
    effectProps.pointParent
  );

  //   const formattedProps = formatFragmentParameters(
  //     effectProps,
  //     DEFAULT_PHYSICAL_MATERIAL_EFFECT_PROPS
  //   ) as MaterialEffectProps;

  const { transform } = physicalMaterialTransform(fragName, previousFragName);
  const uniformConfig = PHYSICAL_MATERIAL_UNIFORM_CONFIG;
  const varyingConfig = [];
  const requiredFunctions = [];

  return {
    requiredFunctions,
    uniformConfig,
    transformation: transform,
    varyingConfig,
    attributeConfig: [],
    fragName,
  };
};
