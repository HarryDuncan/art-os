type FragmentShaderTag = "interactive" | "mouse" | "noUniforms" | "uniforms";

export interface IFragmentShader {
  frag: string;
  tags: FragmentShaderTag[];
}
