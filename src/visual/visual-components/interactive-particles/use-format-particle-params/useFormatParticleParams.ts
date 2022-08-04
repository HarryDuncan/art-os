import { useCallback, useMemo } from "react";
import { LinearFilter, RGBAFormat, Texture } from "three";
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
      unformattedAssets: Asset[],
      unformattedUniforms
    ): {
      geometry;
      uniforms;
      shaders;
    } => {
      const loadedTextures = unformattedAssets.flatMap((unformattedAssets) => {
        if (unformattedAssets.data) {
          return getTextureFeatures(unformattedAssets.data as Texture);
        }
        return [];
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
    if (!areAssetsInitialized) {
      return { geometry: undefined, uniforms: undefined, shaders: undefined };
    }
    return formatUniformsAndGeometry(assets, uniforms);
  }, [areAssetsInitialized, formatUniformsAndGeometry, assets, uniforms]);
};

const getTextureFeatures = (loadedTexture: Texture) => {
  loadedTexture.minFilter = LinearFilter;
  loadedTexture.magFilter = LinearFilter;
  loadedTexture.format = RGBAFormat;

  const { width, height } = loadedTexture.image;
  const numPoints = width * height;
  return {
    texture: loadedTexture,
    width,
    height,
    numPoints,
  };
};
