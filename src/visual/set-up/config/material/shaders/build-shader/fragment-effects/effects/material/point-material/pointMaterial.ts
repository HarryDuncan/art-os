import { formatFragmentParameters } from "../../../../helpers/formatFragmentParameters";
import { generateUniqueFragName } from "../../../../helpers/generateUniqueFragName";
import { mergeUniformConfigs } from "../../../../shader-properties/uniforms/helpers/mergeUniformConfigs";
import {
  PointMaterialFragmentEffectProps,
  UniformConfig,
} from "../../../../types";
import { ROTATION_ATTRIBUTES } from "../../../../vertex-effects/effects/rotation/rotation.consts";
import { FRAGMENT_EFFECT } from "../../../fragmentEffects.consts";
import {
  DEFAULT_POINT_MATERIAL_PROPS,
  POINT_MATERIAL_ATTRIBUTES,
  POINT_MATERIAL_FUNCTIONS,
  POINT_MATERIAL_UNIFORMS,
  POINT_MATERIAL_VARYINGS,
} from "./pointMaterial.consts";
import { pointMaterialTransform } from "./pointMaterialTransform";

export const pointMaterial = (
  previousFragName,
  effectProps: Partial<PointMaterialFragmentEffectProps> = {}
) => {
  const fragName = generateUniqueFragName(
    FRAGMENT_EFFECT.POINT_MATERIAL,
    effectProps.pointParent
  );

  const formattedProps = formatFragmentParameters(
    effectProps,
    DEFAULT_POINT_MATERIAL_PROPS
  ) as PointMaterialFragmentEffectProps;

  const { effectUniforms, transformation } = pointMaterialTransform(
    fragName,
    previousFragName,
    formattedProps
  );

  const mergedUniformConfigs = mergeUniformConfigs([
    effectUniforms,
    POINT_MATERIAL_UNIFORMS as UniformConfig,
  ]);

  return {
    requiredFunctions: POINT_MATERIAL_FUNCTIONS,
    uniformConfig: mergedUniformConfigs,
    transformation,
    varyingConfig: POINT_MATERIAL_VARYINGS,
    attributeConfig: POINT_MATERIAL_ATTRIBUTES,
    fragName,
  };
};
