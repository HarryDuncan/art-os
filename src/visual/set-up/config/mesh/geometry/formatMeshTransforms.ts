import { MeshTransformConfig } from "../../config.types";
import { ShaderAttributeConfig } from "../../material/shaders/build-shader/buildShader.types";

export const formatMeshTransforms = (
  meshTransforms: MeshTransformConfig[],
  shaderAttributeConfigs: ShaderAttributeConfig[]
) =>
  meshTransforms.map((transform) => {
    if (transform.materialId) {
      const shaderAttributes = shaderAttributeConfigs.find(
        ({ materialId }) => materialId === transform.materialId
      );
      if (shaderAttributes) {
        const attributeConfig = [
          ...(transform.attributeConfig ?? []),
          ...shaderAttributes.attributeConfigs,
        ];
        return { ...transform, attributeConfig };
      }
      console.warn(`no shader attributes found for ${transform.materialId}`);
      return transform;
    }
    return transform;
  });
