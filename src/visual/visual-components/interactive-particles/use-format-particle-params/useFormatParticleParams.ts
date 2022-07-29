import { useCallback, useMemo } from "react";
import { LinearFilter, RGBAFormat, Texture, WebGLRenderer } from "three";
import { InteractiveParam } from "visual/components/interactive-shaders/types";
import { Asset } from "visual/hooks/use-assets/types";
import { useFormatTextureToGeometry } from "./useFormatTextureToGeometry";

export const useFormatParticleParams = (
  assets: Asset[],
  areAssetsInitialized: boolean,
  materialParams: InteractiveParam,
  renderer: WebGLRenderer
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
        }
        return [];
      });
      setRendererSizeToImageSize(
        loadedTextures[0].texture as Texture,
        renderer
      );
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

const setRendererSizeToImageSize = (
  loadedTexture: Texture,
  renderer: WebGLRenderer
) => {
  const { width, height } = loadedTexture.image;
  //renderer.setSize(width, height, true);
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
