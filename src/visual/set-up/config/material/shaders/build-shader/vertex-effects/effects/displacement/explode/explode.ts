import { ShaderPropertyValueTypes } from "../../../../buildShader.constants";
import {
  AttributeConfig,
  ExplodeEffectProps,
  UniformConfig,
} from "../../../../buildShader.types";
import { VERTEX_EFFECT_POINT_NAMES } from "../../../vertexEffects.consts";
import { VertexEffectData } from "../../../vertexEffects.types";
import {
  DEFAULT_EXPLODE_PARAMETERS,
  EXPLODE_FUNCTIONS,
  EXPLODE_UNIFORMS,
  EXPLODE_VARYINGS,
} from "./explode.consts";
import { explodeTransformation } from "./explodeTransformation";

export const explode = (
  transformPointName: string,
  effectProps: Partial<ExplodeEffectProps> | undefined
): VertexEffectData => {
  const explodeEffectProps = formatProps(effectProps ?? {});
  const pointName = VERTEX_EFFECT_POINT_NAMES.EXPLODED_POINT;
  const uniformConfig = EXPLODE_UNIFORMS as UniformConfig;
  const varyingConfig = EXPLODE_VARYINGS;
  const transformation = explodeTransformation(
    transformPointName,
    pointName,
    explodeEffectProps
  );
  const requiredFunctions = EXPLODE_FUNCTIONS;
  const attributeConfig = [
    { id: "randomAngle", valueType: ShaderPropertyValueTypes.FLOAT },
    { id: "signDirection", valueType: ShaderPropertyValueTypes.FLOAT },
  ] as AttributeConfig[];
  const defaultInstantiation = `vec3 ${pointName} = ${transformPointName}.xyz;`;
  return {
    attributeConfig,
    requiredFunctions,
    uniformConfig,
    transformation,
    varyingConfig,
    pointName,
    defaultInstantiation,
  };
};

const formatProps = (parsedEffectProps: Partial<ExplodeEffectProps>) => {
  return { ...DEFAULT_EXPLODE_PARAMETERS, ...parsedEffectProps };
};
