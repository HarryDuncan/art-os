import { Material } from "three";
import { getMaterial } from "visual/display/materials/getMaterial";
import { DEFAULT_MATERIAL } from "visual/display/materials/materials.defaults";
import { SceneComponentConfig } from "../config.types";

export const addMaterialsToComponents = (
  componentConfigs: SceneComponentConfig[],
  materials: Material[]
) => {
  return componentConfigs.map((componentConfig) => {
    const material = getComponentMaterial(componentConfig, materials);
    return {
      ...componentConfig,
      componentProps: {
        ...componentConfig.componentProps,
        material,
      },
    };
  });
};

const getComponentMaterial = (
  componentConfig: SceneComponentConfig,
  globalMaterials: Material[]
): Material => {
  const { materialConfig } = componentConfig;
  if (!materialConfig) {
    console.warn(`materialConfig does not exist for ${componentConfig.id}`);
    return DEFAULT_MATERIAL;
  }
  const { materialById, materialType, materialProps, id } = materialConfig;
  if (materialById) {
    const selectedMaterial = globalMaterials.find(
      (material) => String(material.name) === String(materialById)
    );
    if (selectedMaterial) {
      return selectedMaterial;
    }
    console.warn(
      `could not select material by id ${materialById} for ${componentConfig.id}`
    );
    return DEFAULT_MATERIAL;
  }
  const material = getMaterial(materialType, materialProps);
  material.name = id;
  return material;
};
