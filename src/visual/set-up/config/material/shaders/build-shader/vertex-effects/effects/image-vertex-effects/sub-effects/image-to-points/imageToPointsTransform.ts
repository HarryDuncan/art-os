import { ShaderPropertyValueTypes } from "../../../../../constants";
import { rand } from "../../../../../shader-properties/functions/maths/maths";
import { EMPTY_UNIFORM_CONFIG } from "../../../../../shader-properties/uniforms/uniforms.consts";
import { VARYING_TYPES } from "../../../../../shader-properties/varyings/varyings.consts";
import { ImageToPointsEffectProps } from "../../../../../types";
import { NOISE_FUNCTIONS } from "../../../displacement/noise/noise.consts";

export const imageToPointsTransform = (
  pointName: string,
  previousPointName: string,
  imageVertexEffectProps: ImageToPointsEffectProps
) => {
  const { declareInTransform } = imageVertexEffectProps;
  const effectUniforms = EMPTY_UNIFORM_CONFIG;
  const effectVaryings = [
    {
      id: "vUv",
      varyingType: VARYING_TYPES.ATTRIBUTE,
      attributeKey: "uv",
      valueType: ShaderPropertyValueTypes.VEC2,
    },
    {
      id: "vPUv",
      varyingType: VARYING_TYPES.CUSTOM,
      valueType: ShaderPropertyValueTypes.VEC2,
    },
  ];
  const effectFunctions = [
    ...NOISE_FUNCTIONS,
    { id: "rand", functionDefinition: rand },
  ];
  const effectAttributes = [];

  const vertexPointInstantiation = `vec4 ${pointName} = vec4(${previousPointName}.xyz, 1.0);`;
  const transformation = `
  ${declareInTransform ? vertexPointInstantiation : ""}
      vUv = uv;
      // particle uv
      vec2 puv = pointOffset.xy / uTextureSize;
      vPUv = puv;

      // pixel color
      vec4 colA = texture2D(uTexture, puv);
      float grey = colA.r * 0.2 + colA.g * 0.71 + colA.b * 0.07;
      vec3 displaced = pointOffset;
      // randomise
      displaced.xy += vec2(rand(pointIndex) - 0.5, random(pointOffset.x + pointIndex) - 0.5) * uRandom;
      float rndz = (rand(pointIndex) + noise(vec2(pointIndex * 0.1, uTime * 0.1)));
      displaced.z += rndz * (rand(pointIndex) * 2.0 * uDepth);
      // center
      displaced.xy -= uTextureSize * 0.5;
      // particle size
      float psize = (noise(vec2(uTime, pointIndex) * 0.5) + 2.0);
      float siz = 0.0;
      if( grey < 0.8 )
      {
          siz = 0.4 ;
      };
      psize *= min(grey, siz);
      psize *= uSize;
      gl_PointSize = psize;

      

`;
  return {
    transformation,
    effectUniforms,
    effectVaryings,
    pointName,
    effectFunctions,
    effectAttributes,
    vertexPointInstantiation,
  };
};
