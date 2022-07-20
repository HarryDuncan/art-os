import { Mesh, PlaneGeometry, RawShaderMaterial, ShaderMaterial } from "three";
import { defaultVertex } from "visual/shaders/vertex-shaders";
import { formatFragmentShader } from "visual/shaders/shader-functions/formatFragmentShader";
import { UniformDefinition } from "visual/shaders/types";
import { formatUniforms } from "visual/shaders/shader-functions/uniforms/formatUniforms";

export type Shader = RawShaderMaterial & { derivatives: boolean };

export const setUpWebGLShader = (
  shaderName: string,
  uniformParams: UniformDefinition[] = []
) => {
  const { uniforms, uniformText } = formatUniforms(uniformParams);

  const geometry = new PlaneGeometry(2, 2);

  const fragShader = formatFragmentShader(shaderName, uniformText);
  const material: Shader = new ShaderMaterial({
    uniforms: uniforms,
    vertexShader: defaultVertex.vert,
    fragmentShader: fragShader.frag,
    depthWrite: true,
    //@ts-ignore
    derivatives: true,
  });

  const sceneMesh = new Mesh(geometry, material);

  return { sceneMesh, uniforms };
};
