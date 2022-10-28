import { useCallback } from "react";
import { getFileTypeFromFilename } from "utils/getFileType";
import { loadImage } from "visual/helpers/assets/image/load-image/LoadImage";
import { loadTexture } from "visual/helpers/assets/texture/load-texture/loadTexture";
import { loadGeometry } from "visual/helpers/geometry/load-geometry/LoadGeometry";

import { Asset, AssetType } from "./types";

export const useInitializeAssets = (assets: Asset[]) => {
  async function initializeAsset(asset: Asset) {
    const loadedAsset = await loadAsset(asset);
    return { ...asset, data: loadedAsset };
  }
  return useCallback(async () => {
    const loadedAssets = await Promise.all(
      assets.map(async (asset) => initializeAsset(asset))
    );
    return loadedAssets as Asset[];
  }, [assets]);
};

const loadAsset = async (asset: Asset) => {
  const { assetType, url: path } = asset;
  const fileType = getFileTypeFromFilename(path);
  switch (assetType) {
    case AssetType.Geometry: {
      const geometry = await loadGeometry(path, fileType);
      return geometry;
    }
    case AssetType.Texture: {
      const texture = await loadTexture(path);
      return texture;
    }
    case AssetType.Image: {
      const image = await loadImage(path);
      return image;
    }
    default: {
      return null;
    }
  }
};
