import { UniformConfig, VaryingConfig } from "../../../../buildShader.types";
import { VERTEX_EFFECT_POINT_NAMES } from "../../../vertexEffects.consts";
import { VertexEffectData } from "../../../vertexEffects.types";
import { noise3D } from "visual/display/materials/webgl-shaders/shader-functions/noise/simplex/noise3D";

export const distortFunctions = () => [
  { id: "noise", functionDefinition: noise3D },
];

export const distortUniforms = () => ({
  defaultUniforms: [],
  customUniforms: [{ id: "uTraverseProgress", valueType: "FLOAT", value: 0 }],
});

export const distortVaryings = () =>
  [
    { id: "vPosition", valueType: "VEC3", varyingType: "DEFAULT" },
    {
      id: "vNormal",
      valueType: "VEC3",
      varyingType: "CUSTOM",
      value: "twistedNormal.xyz",
    },
  ] as VaryingConfig[];

export const traverseTransform = (
  transformPointName: string
): VertexEffectData => {
  const pointName = VERTEX_EFFECT_POINT_NAMES.TRAVERSE_POINT;
  const uniformConfig = distortUniforms() as UniformConfig;
  const varyingConfig = [];
  const transformation = traverseDownTransform(transformPointName, pointName);
  const requiredFunctions = distortFunctions();
  return {
    requiredFunctions,
    uniformConfig,
    transformation,
    varyingConfig,
    pointName,
  };
};

export const traverseDownTransform = (
  transformPointName: string,
  pointName: string
) => {
  return `
    // Generate random offset for each vertex (compute once)
    float randomOffsetX = (${transformPointName}.xyz.x + 0.0) * 1.0 * uTraverseProgress;
    float randomOffsetY = (${transformPointName}.xyz.y + 100.0) * 1.0 * uTraverseProgress;
    float randomOffsetZ = (${transformPointName}.xyz.z + 0.0) * 1.0 * uTraverseProgress;
  
    // Apply random offset to the vertex position with downward displacement
    vec4 ${pointName} = vec4(
      ${transformPointName}.xyz + vec3(randomOffsetX, randomOffsetY, randomOffsetZ),
      1.0
    );
  
    // If the vertex has fallen completely, reset its position
    if (uTraverseProgress >= 1.0) {
      ${pointName}.xyz = ${transformPointName}.xyz;
    }
    `;
};
