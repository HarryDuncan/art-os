import { EMPTY_UNIFORM_CONFIG } from "../../../shader-properties/uniforms/uniforms.consts";
import { VERTEX_EFFECT_POINT_NAMES } from "../../vertexEffects.consts";

export const pointsVertex = () => {
  const pointName = VERTEX_EFFECT_POINT_NAMES.DEFAULT_POINT;
  const uniformConfig = { ...EMPTY_UNIFORM_CONFIG };
  const varyingConfig = [];
  const transformation = ` gl_PointSize = 20.0;`;
  const requiredFunctions = [];
  return {
    requiredFunctions,
    uniformConfig,
    transformation,
    varyingConfig,
    pointName,
  };
};
