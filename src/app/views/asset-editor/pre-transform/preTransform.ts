import { translateToOrigin } from "app/views/asset-editor/pre-transform/translateToOrigin";
import { Asset } from "visual/set-up/assets/asset.types";
import { getAssetBufferGeometry } from "visual/set-up/config/mesh/geometry/getAssetGeometries";

interface PreTransformConfig {
  centerGeometry?: boolean;
}
export const preTransformGeometry = (
  assets: Asset[],
  preTransformConfig: PreTransformConfig
) =>
  assets.map((asset) => {
    const geometry = getAssetBufferGeometry(asset);
    const { centerGeometry } = preTransformConfig;
    if (geometry) {
      if (centerGeometry) {
        translateToOrigin(geometry);
      }
    }
    return asset;
  });
