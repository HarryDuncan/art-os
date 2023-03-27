import { SHADER_TYPES } from "./shaders.constants";

type FragmentShaderTag = "interactive" | "mouse" | "noUniforms" | "uniforms";

export interface FragmentShader {
  frag: string;
  tags?: FragmentShaderTag[];
}

export interface VertexShader {
  vert: string;
  tags?: FragmentShaderTag[];
}

export interface Shaders {
  fragmentShader: FragmentShader;
  vertexShader: VertexShader;
}
export interface UniformDefinition {
  uniformName: string;
  uniformType: UniformTypes;
  type?: string;
  value?;
}
export type ShaderTypes = keyof typeof SHADER_TYPES;
export type Uniform = Record<string, unknown>;
export enum UniformTypes {
  Float = "float",
  sampler2D = "sampler2D",
  Vec3 = "vec3",
  Vec2 = "vec2",
}
