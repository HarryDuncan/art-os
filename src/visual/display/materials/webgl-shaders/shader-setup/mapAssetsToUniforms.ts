import { Asset } from "visual/set-up/assets/asset.types";
import { AssetMap } from "../shaders.types";
import { UniformObject } from "visual/set-up/config/material/shaders/build-shader/types";
import { Vector2 } from "three";

const ASSET_MAPPING_RELATIONSHIPS = {
  TEXTURE: "TEXTURE",
  DIMENSION: "DIMENSION",
};
export const mapAssetsToUniforms = (
  assetMapping: AssetMap[],
  assets: Asset[],
  uniforms: UniformObject = {}
) => {
  if (assetMapping) {
    assetMapping.forEach((mapping) => {
      const mappedAsset = getMappedAsset(mapping, assets);
      if (mappedAsset) {
        uniforms[mapping.uniform] = { value: mappedAsset };
      }
    });
  }
  return uniforms;
};

const getMappedAsset = (assetMapping: AssetMap, assets: Asset[]) => {
  const mappedAsset = assets.find((asset) => asset.id === assetMapping.assetId);
  if (mappedAsset && mappedAsset.data) {
    switch (assetMapping.relationship) {
      case ASSET_MAPPING_RELATIONSHIPS.TEXTURE:
        const texture = mappedAsset.data;
        return texture;
      case ASSET_MAPPING_RELATIONSHIPS.DIMENSION:
        //@ts-ignore
        const { width, height } = mappedAsset.data.image;
        return new Vector2(width, height);
      default:
        console.warn(`No configuration for ${assetMapping.relationship}`);
        return null;
    }
  }
  console.warn(`no mapped asset found for ${assetMapping.assetId}`);
};
