import { DEFAULT_LIGHTS } from "consts/threejs";
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
import { getRandomRotation } from "visual/helpers/getRandomRotation";
import {
  DEFAULT_MATERIAL,
  MATERIAL_TYPES,
} from "visual/helpers/materials/materials.constants";
import { MaterialType } from "visual/helpers/materials/materials.types";
import { createBoundingBox } from "visual/helpers/three-dimension-space/createBoundingBox";
import { generateRandomlySpreadCoordinates } from "visual/helpers/three-dimension-space/position/getRandomlySpreadCoordinates";
import { BoundingBox } from "visual/helpers/three-dimension-space/position/position.types";
import { Asset, ASSET_TAG } from "visual/hooks/use-assets/types";
import { hasCommonValues } from "visual/utils/hasCommonElement";

import computeConfig from "./config.json";

export const formatSceneData = (assets, context, dispatch): SceneData => {
  const materials = formatGlobalMaterials(assets);
  const meshConfigs = getMeshConfigs(assets, materials);
  const formattedMeshConfigs = setOnesAndZeros(meshConfigs);
  return {
    isSceneDataInitialized: true,
    meshConfigs: formattedMeshConfigs,
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

const setOnesAndZeros = (formattedMeshConfigs) => {
  const one = formattedMeshConfigs.find((mesh) => mesh.name === "one-geometry");
  const zero = formattedMeshConfigs.find(
    (mesh) => mesh.name === "zero-geometry"
  );
  const filteredMeshConfigs = formattedMeshConfigs.filter(
    (mesh) => mesh.name !== "one-geometry" && mesh.name !== "zero-geometry"
  );

  const allowedBoundingBoxes: BoundingBox[] = [
    createBoundingBox({ x: 0, y: 0, z: -2 }, 4, 4, 2),
  ];
  const notAllowedBoundingBoxes: BoundingBox[] = [
    createBoundingBox({ x: 0, y: 0, z: -3.5 }, 2, 2, 8),
  ];
  const AMOUNT = 16;
  const coordinates = generateRandomlySpreadCoordinates(
    AMOUNT,
    allowedBoundingBoxes,
    notAllowedBoundingBoxes,
    1
  );
  const onesAndZeros = coordinates.map((coordinate, index) => {
    const nonRandomizedAxes = { y: true, x: true };
    const rotation = getRandomRotation(1, nonRandomizedAxes)[0];
    if (index % 2 == 1) {
      return {
        ...one,
        position: coordinate,
        name: "binary",
        rotation: { ...rotation, x: one.rotation.x },
      };
    }
    return {
      ...zero,
      position: coordinate,
      name: "binary",
      rotation: { ...rotation, x: zero.rotation.x },
    };
  });

  return [...filteredMeshConfigs, ...onesAndZeros];
};
