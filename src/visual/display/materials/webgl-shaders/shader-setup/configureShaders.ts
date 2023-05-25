import { Vector3 } from "three";
import { ShaderConfig } from "../shaders.types";
import { importShader } from "./importShader";

export const configureShaders = (shaderConfig: ShaderConfig, uniforms) => {
  const { shaderId } = shaderConfig;
  // @ts-ignore
  const { fragmentShader, vertexShader, defaultUniforms } = importShader(
    shaderId
  );

  const configuredUniforms = defaultUniforms(uniforms);
  // TODO - return default shaders and log that the shader ids didn't work
  return { fragmentShader, vertexShader, configuredUniforms };
};
