import { SHADER_TYPES } from "./shaders.constants";

type FragmentShaderTag = "interactive" | "mouse" | "noUniforms" | "uniforms";
export type ShaderType = keyof typeof SHADER_TYPES;
export enum UniformTypes {
  Float = "float",
  sampler2D = "sampler2D",
  Vec3 = "vec3",
  Vec2 = "vec2",
}
export interface CustomShader {
  id: string;
  type: ShaderType;
  shader: string;
  tags?: FragmentShaderTag[];
}
export type AssetMap = {
  uniform: string;
  assetId: string;
  relationship: string;
};
export interface ShaderConfig {
  shaderId: string;
  assetMapping?: AssetMap[];
  fragmentShaderId?: string;
  vertexShaderId?: string;
}

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

export type Uniform = Record<string, unknown>;

export interface UniformDefinition {
  uniformName: string;
  uniformType: UniformTypes;
  type?: string;
  value?;
}
