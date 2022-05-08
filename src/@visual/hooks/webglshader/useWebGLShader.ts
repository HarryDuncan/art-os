// @ts-nocheck
import * as THREE from "three";
import { ShaderMaterial } from "three";
import { useFragmentShader } from "./fragmentShaders/useFragmentShader";
import { useUniforms } from "./uniforms/useUniforms";
import { vertShader } from "./vertexShader/vert";

export type Shader = ShaderMaterial & { derivatives: boolean };
export type UniformParams = any;
export const useWebGLShader = (
  shaderName: string,
  uniformParams: UniformParams
) => {
  const { uniforms, uniformText } = useUniforms(uniformParams);

  const geometry = new THREE.PlaneGeometry(2, 2);

  const fragShader = useFragmentShader(shaderName, uniformText);

  const material: Shader = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertShader,
    fragmentShader: fragShader,
    depthWrite: true,
    derivatives: true,
  });

  const sceneMesh = new THREE.Mesh(geometry, material);

  return { sceneMesh, uniforms };
};
