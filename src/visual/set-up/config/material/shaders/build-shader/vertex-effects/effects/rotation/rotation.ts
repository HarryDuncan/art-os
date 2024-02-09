import {
  AXIS,
  Axis,
} from "visual/utils/three-dimension-space/position/position.types";
import { RotationEffectProps } from "../../../buildShader.types";
import {
  DEFAULT_ROTATE_EFFECT_CONFIG,
  VERTEX_EFFECT_POINT_NAMES,
} from "../../vertexEffects.consts";
import {
  rotateX,
  rotateY,
  rotateZ,
} from "visual/display/materials/webgl-shaders/shader-functions/rotation/rotationFunctions";
import { ShaderPropertyValueTypes } from "../../../buildShader.constants";

const getRequiredFunctions = (axis: Axis) => {
  switch (axis) {
    case AXIS.X:
      return [{ id: "rotateX", functionDefinition: rotateX }];
    case AXIS.Y:
      return [{ id: "rotateY", functionDefinition: rotateY }];
    case AXIS.Z:
    default:
      return [{ id: "rotateZ", functionDefinition: rotateZ }];
  }
};
const getFunctionName = (axis: Axis) => {
  switch (axis) {
    case AXIS.X:
      return "rotateX";
    case AXIS.Y:
      return "rotateY";
    case AXIS.Z:
    default:
      return "rotateZ";
  }
};
export const rotationVertex = (
  transformName: string,
  effectProps: Partial<RotationEffectProps> | undefined = {}
) => {
  const formattedProps = mergeWithDefault(effectProps);
  const { axis, speed } = formattedProps;
  const pointName = VERTEX_EFFECT_POINT_NAMES.ROTATED_POINT;
  const uniformConfig = {
    defaultUniforms: [],
    customUniforms: [
      {
        id: "uRotationSpeed",
        valueType: ShaderPropertyValueTypes.FLOAT,
        value: speed,
      },
    ],
  };

  const transformation = `
    float rotationAngle = uTime * uRotationSpeed;
  mat4 rotationMatrix = ${getFunctionName(axis as Axis)}(rotationAngle);
  vec4 ${pointName} = vec4(${transformName}.xyz,1.0) * rotationMatrix; 
  `;
  const requiredFunctions = getRequiredFunctions(axis as Axis);
  return {
    requiredFunctions,
    uniformConfig,
    transformation,
    varyingConfig: [],
    pointName,
  };
};

const mergeWithDefault = (effectProps: Partial<RotationEffectProps>) => ({
  ...DEFAULT_ROTATE_EFFECT_CONFIG,
  ...effectProps,
});
