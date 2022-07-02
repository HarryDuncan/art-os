import { useCallback } from "react";
import { LinearFilter, RGBFormat, Texture } from "three";
import { Asset } from "visual/hooks/use-assets/types";

export const useTextureFeature = () =>
  useCallback((assets: Asset[]) => {
    return assets
      .map((asset) => {
        if (!asset.data) return null;
        return getTextureFeatures(asset.data as Texture);
      })
      .filter((loadedTexture) => loadedTexture);
  }, []);

const getTextureFeatures = (loadedTexture: Texture) => {
  loadedTexture.minFilter = LinearFilter;
  loadedTexture.magFilter = LinearFilter;
  loadedTexture.format = RGBFormat;

  const width = loadedTexture.image.width;
  const height = loadedTexture.image.height;
  const numPoints = width * height;
  return { texture: loadedTexture, width, height, numPoints };
};
