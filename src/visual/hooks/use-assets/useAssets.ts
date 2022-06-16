import { useCallback } from "react";
import { getFileTypeFromFilename } from "utils/getFileType";
import { useGeometryLoader } from "visual/helpers/geometry/load-geometry/LoadGeometry";
import { Asset, AssetType } from "./types";

export const useAssets = (assets: Asset[]) => {
  assets.forEach(async (asset) => useAssetLoader(asset));
};

const useAssetLoader = async (asset: Asset) => {
  const fileType = getFileTypeFromFilename(asset.url);

  const geometryLoader = useGeometryLoader(fileType);
  return useCallback(() => {
    switch (asset.assetType) {
      case AssetType.Geometry:
        return geometryLoader;
      default:
        return null;
    }
  }, [geometryLoader]);
};
