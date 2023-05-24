import { ASSET_TAG, Asset } from "utils/assets/use-assets/types";
import { Material, Texture } from "three";
import { hasCommonValues } from "visual/utils/hasCommonElement";
import { MaterialType } from "visual/materials/materials.types";
import { getMaterial } from "visual/materials/getMaterial";

export const formatAssetBasedMaterial = (assets: Asset[]) =>
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
