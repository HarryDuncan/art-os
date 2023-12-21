import { randomFloat } from "visual/display/materials/webgl-shaders/shader-functions/random/random";
import { ShaderPropertyValueTypes } from "../../../buildShader.constants";
import { AttributeConfig, UniformConfig } from "../../../buildShader.types";
import { VERTEX_EFFECT_POINT_NAMES } from "../../vertexEffects.consts";

export const interactiveEffect = (transformName: string) => {
  //   const formattedProps = mergeWithDefault(effectProps);
  //   const { axis, speed } = formattedProps;
  const pointName = VERTEX_EFFECT_POINT_NAMES.INTERACTED_POINT;
  const uniformConfig = {
    defaultUniforms: ["uPosition", "uStrength"],
    customUniforms: [],
  } as UniformConfig;
  const varyingConfig = [
    {
      id: "vAffected",
      valueType: "FLOAT",
      varyingType: "CUSTOM",
      value: "isAffected",
    },
  ];
  const transformation = `
  // uPosition will be set to 2000 is there is no detections made
  // Convert screen coordinates to NDC
  vec2 ndcCoords = (uPosition.xy - 0.5) * 2.0;
  // Assuming zero depth for simplicity
  vec3 ndcPosition = vec3(ndcCoords, 0.0);
  vec3 ${pointName} = ${transformName}.xyz;
  float isAffected = 0.0;
  if( ndcPosition.x > -2000.0){
    vec3 displacedPosition = vec3(${transformName}.xy, 0);
    vec3 effect = vec3(ndcPosition.xy, 0);
    vec3 effectDistanceVector =  effect - displacedPosition;
    float effectDistanceLength = length(effectDistanceVector);
    float effectStrength =  0.5 * uStrength;
    if(effectDistanceLength <= 0.9 * uStrength){
      float effectDirection =  signDirection;
      if(effectDirection == 0.0){
       effectDirection = -1.0; 
      }
      float rand = random(uTime);
      ${pointName}.x += cos(randomAngle * rand) * effectStrength * effectDirection;
      ${pointName}.y += sin(randomAngle * rand) * effectStrength * effectDirection;
      isAffected = 1.0;
    }
  } `;
  const requiredFunctions = [
    { id: "randomFloat", functionDefinition: randomFloat },
  ];
  const attributeConfig = [
    { id: "randomAngle", valueType: ShaderPropertyValueTypes.FLOAT },
    { id: "signDirection", valueType: ShaderPropertyValueTypes.FLOAT },
  ] as AttributeConfig[];
  return {
    requiredFunctions,
    uniformConfig,
    attributeConfig,
    transformation,
    varyingConfig,
    pointName,
  };
};
