import { Asset } from "visual/set-up/assets/asset.types";
import { AssetMap } from "../shaders.types";

export const mapAssetsToUniforms = (
  assetMapping: AssetMap[],
  assets: Asset[],
  uniforms: Record<string, unknown> = {}
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
    const texture = mappedAsset.data;
    return texture;
  }
  console.warn(`no mapped asset found for ${assetMapping.assetId}`);
};
