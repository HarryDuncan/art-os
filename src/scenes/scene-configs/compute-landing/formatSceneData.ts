import {
  DEFAULT_LIGHTS,
  DEFAULT_POSITION,
  DEFAULT_VECTOR_POSITION,
} from "consts/threejs";
import { Texture } from "three";
import { SceneData } from "visual/components/interactive";
import {
  COMPONENT_TYPES,
  PlaneProps,
  ThreeJsComponentType,
} from "visual/components/three-js-components/components/threeJsComponents.types";
import { addMaterialsToMeshConfig } from "visual/helpers/assets/mesh-config/addMaterialsToMeshConfig";
import { formatToMeshConfig } from "visual/helpers/assets/mesh-config/formatToMeshConfig";
import { getMaterialsFromConfig } from "visual/helpers/config-helpers/getMaterialsFromConfig";
import {
  DEFAULT_MATERIAL,
  ENV_MAP_TYPES,
  MATERIAL_TYPES,
} from "visual/helpers/materials/materials.constants";
import {
  EnvMapMaterialParameters,
  EnvMapType,
  MaterialType,
} from "visual/helpers/materials/materials.types";
import { Asset, AssetTag, ASSET_TAG } from "visual/hooks/use-assets/types";
import { hasCommonValues } from "visual/utils/hasCommonElement";

import computeConfig from "./config.json";

export const formatSceneData = (assets, context, dispatch): SceneData => {
  const materials = formatGlobalMaterials(assets);
  const meshConfigs = getMeshConfigs(assets, materials);
  console.log(materials);
  return {
    isSceneDataInitialized: true,
    meshConfigs,
    sceneComponents: [
      {
        componentType: COMPONENT_TYPES.PLANE as ThreeJsComponentType,
        componentProps: {
          name: "bg",
          position: { x: -5, y: -5, z: -5 },
          material: getMaterialById("computeBackground", materials),
        } as PlaneProps,
      },
    ],
    lights: DEFAULT_LIGHTS,
    sceneObjects: [],
  };
};

const getMeshConfigs = (assets, materials) => {
  const formattedGeometries = formatToMeshConfig(assets, computeConfig[0]);
  const meshConfigs = addMaterialsToMeshConfig(
    formattedGeometries,
    materials,
    computeConfig[0]
  );
  return meshConfigs;
};

const formatGlobalMaterials = (assets: Asset[]) => {
  const assetBasedMaterials = sortMaterialsFromAssets(assets).flatMap(
    (asset: Asset) => {
      const materialAssetTags = asset.assetTag?.flatMap((tag) =>
        !!ASSET_TAG.MATERIAL[tag] ? tag : []
      );
      if (materialAssetTags) {
        switch (materialAssetTags[0] as MaterialType) {
          case ASSET_TAG.MATERIAL.MATCAP:
            return {
              materialParameters: {
                matcap: asset.data as Texture,
              },
              id: asset.id,
              materialType: MATERIAL_TYPES.MATCAP,
            };
          default:
            return [];
        }
      }
      return [];
    }
  );
  const globalMaterials = getMaterialsFromConfig(computeConfig[0]);
  return [...assetBasedMaterials, ...globalMaterials];
};
const sortMaterialsFromAssets = (assets: Asset[]) => {
  const materialTags = Object.values(ASSET_TAG.MATERIAL);
  const materialAssets = assets.flatMap((asset) =>
    hasCommonValues(asset.assetTag ?? [], materialTags) ? asset : []
  );
  return materialAssets;
};

const getMaterialById = (materialId, materials) => {
  const selectedMaterial = materials.find(
    (material) => material.id === materialId
  );
  if (selectedMaterial) return selectedMaterial;
  console.warn(`Material:${materialId} not found`);
  return DEFAULT_MATERIAL;
};
