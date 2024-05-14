import { DEFAULT_UNIFORMS } from "../../../../../constants";
import { ImageToPointsEffectProps } from "../../../../../types";

export const imageToPointsTransform = (
  pointName: string,
  previousPointName: string,
  imageVertexEffectProps: ImageToPointsEffectProps
) => {
  const { declareInTransform } = imageVertexEffectProps;
  const effectUniforms = DEFAULT_UNIFORMS;
  const effectVaryings = [];
  const effectFunctions = [];
  const effectAttributes = [];

  const vertexPointInstantiation = `vec4 ${pointName} = vec4(${previousPointName}.xyz, 1.0);`;
  const transformation = `
  ${declareInTransform ? vertexPointInstantiation : ""}
      vUv = uv;
      // particle uv
      vec2 puv = offset.xy / uTextureSize;
      vPUv = puv;

      // pixel color
      vec4 colA = texture2D(uTexture, puv);
      float grey = colA.r * 0.2 + colA.g * 0.71 + colA.b * 0.07;
      vec3 displaced = offset;
      // randomise
      displaced.xy += vec2(random(pointIndex) - 0.5, random(offset.x + pointIndex) - 0.5) * uRandom;
      float rndz = (random(pointIndex) + noise(vec2(pointIndex * 0.1, uTime * 0.1)));
      displaced.z += rndz * (random(pointIndex) * 2.0 * uDepth);
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

      // final position
      vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
      mvPosition.xyz += position * psize;
      vec4 finalPosition = projectionMatrix * mvPosition;



        gl_Position = finalPosition;

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
