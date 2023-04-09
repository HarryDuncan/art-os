import { ShaderConfig } from "../shaders.types";
import { importShader } from "./importShader";

export const configureShaders = (shaderConfig: ShaderConfig) => {
  const { shaderId } = shaderConfig;
  // @ts-ignore
  const { fragmentShader, vertexShader } = importShader(shaderId);
  return { fragmentShader, vertexShader };
};
