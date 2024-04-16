import {
  AXIS,
  Axis,
} from "visual/utils/three-dimension-space/position/position.types";
import { RotationEffectProps } from "../../../buildShader.types";
import {
  rotateX,
  rotateY,
  rotateZ,
} from "../../../shader-properties/functions/rotation/rotation";
import { ROTATION_UNIFORMS } from "./rotation.consts";

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
export const rotationTransform = (
  pointName: string,
  previousPointName: string,
  rotationEffect: RotationEffectProps
) => {
  const { axis, speed, declareInTransform } = rotationEffect;
  const uniformConfig = {
    ...ROTATION_UNIFORMS,
    customUniforms: ROTATION_UNIFORMS.customUniforms.map((uniformConfig) =>
      uniformConfig.id === "uRotationSpeed"
        ? { ...uniformConfig, value: speed }
        : uniformConfig
    ),
  };
  const requiredFunctions = getRequiredFunctions(axis as Axis);

  const vertexPointInstantiation = `vec4 ${pointName} = vec4(${previousPointName}.xyz, 1.0);`;
  const transformation = `
    ${declareInTransform ? vertexPointInstantiation : ""}
    float rotationAngle = uTime * uRotationSpeed;
    mat4 rotationMatrix = ${getFunctionName(axis as Axis)}(rotationAngle);
    ${pointName} = ${pointName} * rotationMatrix; 
  `;

  return {
    uniformConfig,
    requiredFunctions,
    transformation,
    vertexPointInstantiation,
  };
};
