import { useCallback, useEffect, useMemo } from "react";
import { getFileTypeFromFilename } from "utils/getFileType";
import { loadGeometry } from "visual/helpers/geometry/load-geometry/LoadGeometry";
import { Asset, AssetType } from "./types";
import { cloneDeep } from "lodash";
import { loadTexture } from "visual/helpers/texture/load-texture/loadTexture";

export const useInitializeAssets = (assets: Asset[]) => {
  async function initializeAsset(asset: Asset) {
    const loadedAsset = await loadAsset(asset);
    return { ...asset, data: loadedAsset };
  }
  return useCallback(async () => {
    const loadedAssets = await Promise.all(
      assets.map(async (asset) => initializeAsset(asset))
    );
    return loadedAssets;
  }, []);
};

const loadAsset = async (asset: Asset) => {
  const { assetType, url: path } = asset;
  const fileType = getFileTypeFromFilename(path);
  switch (assetType) {
    case AssetType.Geometry:
      const geometry = await loadGeometry(path, fileType);
      return geometry;
    case AssetType.Texture:
      const texture = await loadTexture(path);
      return texture;
    default:
      return null;
  }
};
