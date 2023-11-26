import { RawShaderMaterial } from "three";
import { InteractiveScene } from "visual/display/components/interactive-scene/InteractiveScene";
import { getMeshesByIdentifier } from "visual/utils/scene/object-finding/getMeshesByIdentifier";

export const updateUniformByKey = (
  scene: InteractiveScene,
  identifier: string,
  uniformKey: string,
  uniformValue: unknown
) => {
  const meshes = getMeshesByIdentifier(scene, identifier);
  meshes.forEach((mesh) => {
    const material = mesh.material as RawShaderMaterial;
    if (material.uniforms[uniformKey]) {
      material.uniforms[uniformKey].value = uniformValue;
    }
  });
};
