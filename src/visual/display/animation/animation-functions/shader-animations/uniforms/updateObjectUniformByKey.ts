import { RawShaderMaterial } from "three";
import { ExtendedMesh } from "visual/set-up/config/mesh/mesh.types";

export const updateObjectUniformByKey = (
  mesh: ExtendedMesh,
  uniformKey: string,
  uniformValue: unknown
) => {
  const material = mesh.material as RawShaderMaterial;
  if (material.uniforms[uniformKey]) {
    material.uniforms[uniformKey].value = uniformValue;
  }
};
