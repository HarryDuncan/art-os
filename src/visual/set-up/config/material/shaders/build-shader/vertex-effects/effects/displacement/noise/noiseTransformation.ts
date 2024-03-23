import { shaderSafeFloat } from "visual/utils/conversion/shaderConversions";
import { NoiseEffectProps } from "../../../../buildShader.types";
import { NOISE_EFFECT_TYPES } from "./noise.consts";

export const noiseTransformation = (
  transformPointName: string,
  pointName: string,
  noiseParameters: NoiseEffectProps
) => {
  const { declareInTransform } = noiseParameters;
  const vertexPointInstantiation = `vec3 ${pointName} = ${transformPointName}.xyz;`;
  const transformation = `
        // NOISE VERTEX POSITIONS
        ${declareInTransform ? vertexPointInstantiation : ""}
        ${getNoiseTransform(transformPointName, pointName, noiseParameters)}
      `;
  return { vertexPointInstantiation, transformation };
};

const getNoiseTransform = (
  transformPointName: string,
  pointName: string,
  noiseParameters: NoiseEffectProps
) => {
  const { effectStrength } = noiseParameters;
  switch (pointName) {
    case NOISE_EFFECT_TYPES.NORMAL:
    default:
      return `
            float offsetX = noise3D(${transformPointName}.xyz + vec3(0.0, 0.0, 0.0) ) * ${shaderSafeFloat(
        effectStrength
      )} * uNoiseStrength;
            float offsetY = noise3D(${transformPointName}.xyz + vec3(1.0, 1.0, 1.0)) * ${shaderSafeFloat(
        effectStrength
      )} * uNoiseStrength;
            float offsetZ = noise3D(${transformPointName}.xyz + vec3(2.0, 2.0, 2.0)) * ${shaderSafeFloat(
        effectStrength
      )} * uNoiseStrength;
            ${pointName} = vec3(${transformPointName}.xyz + vec3(offsetX, offsetY, offsetZ));
          `;
  }
};
