import { Material, Texture } from "three";
import { getMaterial } from "visual/display/materials/getMaterial";
import {
  EnvMapMaterialProps,
  MatcapMaterialProps,
  MaterialConfig,
  MaterialType,
  VideoMaterialProps,
} from "visual/set-up/config/material/materials.types";
import { Asset } from "../../assets/asset.types";
import {
  ASSET_MAPPED_MATERIALS,
  MATERIAL_TYPES,
} from "visual/display/materials/materials.consts";

export const getAssetMappedMaterials = (
  materialConfig: MaterialConfig[],
  assets: Asset[]
): Material[] =>
  materialConfig.flatMap((configItem) => {
    if (!ASSET_MAPPED_MATERIALS.includes(configItem.materialType)) {
      return [];
    }
    const mappedAsset = assets.find(
      (asset) => asset.id === configItem.materialProps.assetId
    );
    if (mappedAsset) {
      const material = formatMaterial(configItem, mappedAsset);
      if (material) {
        material.name = configItem.id;
        return material;
      }
      return [];
    }

    return [];
  });

const formatMaterial = (configItem, mappedAsset) => {
  switch (configItem.materialType) {
    case MATERIAL_TYPES.ENV_MAP: {
      getEnvMapMaterial(
        configItem.materialProps as EnvMapMaterialProps,
        mappedAsset
      );
      break;
    }
    case MATERIAL_TYPES.VIDEO: {
      return getVideoMaterial(
        configItem.materialProps as VideoMaterialProps,
        mappedAsset
      );
    }
    case MATERIAL_TYPES.MATCAP: {
      return getMatcapMaterial(
        configItem.materialProps as MatcapMaterialProps,
        mappedAsset
      );
    }
    default:
      return null;
  }
};
const getMatcapMaterial = (
  materialProps: MatcapMaterialProps,
  asset: Asset
): Material => {
  materialProps.matcap = asset.data as Texture;
  return getMaterial(
    MATERIAL_TYPES.MATCAP as MaterialType,
    materialProps
  ) as Material;
};

const getEnvMapMaterial = (
  materialProps: EnvMapMaterialProps,
  asset: Asset
): Material => {
  materialProps.imageUrl = asset.url;
  return getMaterial(
    MATERIAL_TYPES.ENV_MAP as MaterialType,
    materialProps
  ) as Material;
};

const getVideoMaterial = (
  materialProps: VideoMaterialProps,
  asset: Asset
): Material => {
  materialProps.videoId = asset.id;
  console.log(asset);
  return getMaterial(
    MATERIAL_TYPES.VIDEO as MaterialType,
    materialProps
  ) as Material;
};
