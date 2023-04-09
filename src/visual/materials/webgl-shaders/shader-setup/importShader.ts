import { ShaderType } from "../shaders.types";
import * as Shaders from "../shaders";

export const importShader = (shaderId: string, shaderType?: ShaderType) => {
  try {
    const { fragmentShader, vertexShader } = Shaders[shaderId].frag;
    return { fragmentShader, vertexShader };
  } catch {
    console.error(`${shaderId} not a valid fragment`);
  }
};
