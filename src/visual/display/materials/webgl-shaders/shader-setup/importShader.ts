/* eslint import/namespace: ['error', { allowComputed: true }] */
import { ShaderType } from "../shaders.types";
import * as Shaders from "../shaders";

export const importShader = (shaderId: string, _shaderType?: ShaderType) => {
  try {
    const { fragmentShader, vertexShader, defaultUniforms } = Shaders[shaderId];
    return { fragmentShader, vertexShader, defaultUniforms };
  } catch {
    console.error(`${shaderId} not a valid fragment`);
    return { fragmentShader: "", vertexShader: "", defaultUniforms: {} };
  }
};
