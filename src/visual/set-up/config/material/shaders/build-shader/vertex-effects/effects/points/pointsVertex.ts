import { shaderSafeFloat } from "visual/utils/conversion/shaderConversions";
import { PointsEffectProps } from "../../../buildShader.types";
import { EMPTY_UNIFORM_CONFIG } from "../../../shader-properties/uniforms/uniforms.consts";
import { DEFAULT_POINT_EFFECT_CONFIG } from "../../vertexEffects.consts";
import { pointsPerspective } from "./pointsPerspective";

export const pointsVertex = (
  transformPointName: string,
  effectProps: Partial<PointsEffectProps> = {}
) => {
  const { pointSize, perspectiveConfig } = formatPointsProps(effectProps);
  const uniformConfig = { ...EMPTY_UNIFORM_CONFIG };
  const perspective = pointsPerspective(transformPointName, perspectiveConfig);
  const transformation = `gl_PointSize = ${
    perspective.length ? perspective : shaderSafeFloat(pointSize)
  };`;
  return {
    requiredFunctions: [],
    uniformConfig,
    transformation,
    varyingConfig: [],
    pointName: transformPointName,
  };
};

const formatPointsProps = (parsedEffectProps: Partial<PointsEffectProps>) => {
  return { ...DEFAULT_POINT_EFFECT_CONFIG, ...parsedEffectProps };
};
