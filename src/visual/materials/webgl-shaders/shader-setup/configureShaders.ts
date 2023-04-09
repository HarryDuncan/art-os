import { ShaderConfig } from "../shaders.types";
import { importShader } from "./importShader";

export const configureShaders = (shaderConfig: ShaderConfig) => {
  const { shaderId } = shaderConfig;
  // @ts-ignore
  const { fragmentShader, vertexShader } = importShader(shaderId);
  // TODO - return default shaders and log that the shader ids didn't work
  return { fragmentShader, vertexShader };
};
