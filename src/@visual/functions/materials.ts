import * as THREE from "three";
import { ADVANCED_MESH_MATERIALS } from "../constants/materials";

export const initializeThreeMaterial = (
  materialName: string,
  materialParams
) => {
  try {
    const material = new THREE[materialName]({
      ...materialParams,
      color: 0xffffff,
    });

    return material;
  } catch {
    console.error("Material params did not match the material type");
  }
};

export const initializeAdvancedMaterial = (
  advancedMaterialType: string,
  materialParams
) => {
  const selectedMaterial = ADVANCED_MESH_MATERIALS[advancedMaterialType];
  if (selectedMaterial) {
    const { type } = selectedMaterial.material;
    materialParams = { ...selectedMaterial.material, ...materialParams };
    delete materialParams.type;
    selectedMaterial.material = initializeThreeMaterial(type, materialParams);

    return selectedMaterial;
  } else {
    console.error(`${advancedMaterialType} is an incorrect material`);
  }
};
