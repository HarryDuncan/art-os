import { Material, Texture } from "three";
import { getMaterial } from "visual/display/materials/getMaterial";
import {
  EnvMapType,
  MaterialType,
} from "visual/display/materials/materials.types";
import { hasCommonValues } from "visual/display/utils/hasCommonElement";
import { Asset, ASSET_TAG } from "./asset.types";
import { ENV_MAP_TYPES } from "visual/display/materials/materials.constants";

export const textureMaterialFromAsset = (assets: Asset[]) =>
  sortMaterialsFromAssets(assets).flatMap((asset: Asset) => {
    const materialAssetTags = asset.assetTag?.flatMap((tag) =>
      ASSET_TAG.MATERIAL[tag] ? tag : []
    );
    if (materialAssetTags) {
      const materialTag = materialAssetTags[0] as MaterialType;
      switch (materialTag) {
        case ASSET_TAG.MATERIAL.MATCAP: {
          const materialProps = {
            matcap: asset.data as Texture,
          };
          const material = getMaterial(materialTag, materialProps) as Material;
          material.name = asset.id;
          return material;
        }
        case ASSET_TAG.MATERIAL.ENV_MAP: {
          const materialProps = {
            imageUrl: asset.url,
            envMapType: ENV_MAP_TYPES.REFLECTION as EnvMapType,
          };
          const material = getMaterial(materialTag, materialProps) as Material;
          material.name = asset.id;
          return material;
        }
        default:
          return [];
      }
    }
    return [];
  });

const sortMaterialsFromAssets = (assets: Asset[]) => {
  const materialTags = Object.values(ASSET_TAG.MATERIAL);
  const materialAssets = assets.flatMap((asset) =>
    hasCommonValues(asset.assetTag ?? [], materialTags) ? asset : []
  );
  return materialAssets;
};
