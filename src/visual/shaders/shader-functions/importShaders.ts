import { SHADER_TYPES } from "../shaders.constants";
import { ShaderTypes } from "../shaders.types";
import * as FragmentShaders from "visual/shaders/fragment-shaders";

export const importShaders = (shaderName, shaderType: ShaderTypes) => {
  if (shaderType === SHADER_TYPES.FRAGMENT) {
    try {
      const shaderText = FragmentShaders[shaderName].frag;
      return { frag: shaderText };
    } catch {
      console.error(`${shaderName} not a valid fragment`);
    }
  }
};
