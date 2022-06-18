type FragmentShaderTag = "interactive" | "mouse" | "noUniforms" | "uniforms";

export interface FragmentShader {
  frag: string;
  tags?: FragmentShaderTag[];
}

export interface VertexShader {
  vert: string;
  tags?: FragmentShaderTag[];
}
