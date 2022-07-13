import { useCallback, useMemo } from "react";
import { LinearFilter, RGBFormat, Texture } from "three";
import { InteractiveParam } from "visual/components/interactive-shaders/types";
import { Asset } from "visual/hooks/use-assets/types";
import { useFormatTextureToGeometry } from "./useFormatTextureToGeometry";

export const useFormatParticleParams = (
  assets: Asset[],
  areAssetsInitialized: boolean,
  materialParams: InteractiveParam
) => {
  const { uniforms, shaders } = materialParams;

  const formatTextureToGeometry = useFormatTextureToGeometry();

  const formatUniformsAndGeometry = useCallback(
    (
      assets: Asset[],
      unformattedUniforms
    ): {
      geometry;
      uniforms;
      shaders;
    } => {
      const loadedTextures = assets.flatMap((asset) => {
        if (asset.data) {
          return getTextureFeatures(asset.data as Texture);
        } else {
          return [];
        }
      });

      const { uniforms, geometry } = formatTextureToGeometry(
        loadedTextures[0],
        unformattedUniforms
      );
      return { uniforms, geometry, shaders };
    },
    [shaders, formatTextureToGeometry]
  );

  return useMemo(() => {
    if (!areAssetsInitialized)
      return { geometry: undefined, uniforms: undefined, shaders: undefined };
    return formatUniformsAndGeometry(assets, uniforms);
  }, [areAssetsInitialized, formatUniformsAndGeometry, assets, uniforms]);
};

const getTextureFeatures = (loadedTexture: Texture) => {
  loadedTexture.minFilter = LinearFilter;
  loadedTexture.magFilter = LinearFilter;
  loadedTexture.format = RGBFormat;

  const width = loadedTexture.image.width;
  const height = loadedTexture.image.height;
  const numPoints = width * height;
  return { texture: loadedTexture, width, height, numPoints };
};
