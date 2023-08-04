import { useCallback } from "react";
import { Asset, ASSET_TYPES } from "../asset.types";
import { loadGeometry } from "../geometry/load-geometry/LoadGeometry";
import { loadTexture } from "../texture/load-texture/loadTexture";
import { loadImage } from "../image/load-image/LoadImage";
import { loadFont } from "../fonts/loadFont";
import { LoadSvg } from "../svg/loadSvg";
import { getFileTypeFromFilename } from "visual/set-up/config/utils/file";

export const useInitializeAssets = (assets: Asset[]) => {
  async function initializeAsset(asset: Asset) {
    const loadedAsset = await loadAsset(asset);
    if (!loadedAsset) {
      console.warn(`asset ${asset.url} not properly loaded`);
    }
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
    case ASSET_TYPES.GEOMETRY: {
      const geometry = await loadGeometry(path, fileType);
      return geometry;
    }
    case ASSET_TYPES.TEXTURE: {
      const texture = await loadTexture(path);
      return texture;
    }
    case ASSET_TYPES.IMAGE: {
      const image = await loadImage(path);
      return image;
    }
    case ASSET_TYPES.VIDEO: {
      // todo - check if url actually exists
      return "";
    }
    case ASSET_TYPES.FONT: {
      const loadedFont = await loadFont(path);
      return loadedFont;
    }
    case ASSET_TYPES.SVG: {
      const svg = await LoadSvg(path);
      return svg;
    }
    default: {
      return null;
    }
  }
};
