import { RotationEffectProps } from "../../../buildShader.types";
import { VERTEX_EFFECT_POINT_NAMES } from "../../vertexEffects.consts";
import { formatVertexParameters } from "../../../helpers/formatVertexParameters";
import {
  DEFAULT_ROTATION_EFFECT_CONFIG,
  ROTATION_ATTRIBUTES,
  ROTATION_VARYINGS,
} from "./rotation.consts";
import { VertexEffectData } from "../../vertexEffects.types";
import { generateUniquePointName } from "../../../helpers/generateUniquePointName";
import { rotationTransform } from "./rotationTransform";

export const rotationEffect = (
  previousPointName: string,
  effectProps: Partial<RotationEffectProps> = {}
): VertexEffectData => {
  const pointName = generateUniquePointName(
    VERTEX_EFFECT_POINT_NAMES.ROTATED_POINT,
    effectProps.pointParent
  );
  const formattedProps = formatVertexParameters(
    effectProps,
    DEFAULT_ROTATION_EFFECT_CONFIG as RotationEffectProps
  ) as RotationEffectProps;

  const {
    uniformConfig,
    requiredFunctions,
    transformation,
    vertexPointInstantiation,
  } = rotationTransform(pointName, previousPointName, formattedProps);

  return {
    requiredFunctions,
    uniformConfig,
    transformation,
    varyingConfig: ROTATION_VARYINGS,
    attributeConfig: ROTATION_ATTRIBUTES,
    vertexPointInstantiation,
    pointName,
  };
};
