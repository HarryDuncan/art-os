type FragmentShaderTag = "interactive" | "mouse" | "noUniforms" | "uniforms";

export interface FragmentShader {
  frag: string;
  tags?: FragmentShaderTag[];
}

export interface VertexShader {
  vert: string;
  tags?: FragmentShaderTag[];
}

export enum UniformTypes {
  Float = "float",
  sampler2D = "sampler2D",
  Vec3 = "vec3",
}

export interface UniformDefinition {
  uniformName: string;
  uniformType: UniformTypes;
  type?: string;
  value?;
}
