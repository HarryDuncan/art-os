import { useCallback, useMemo } from "react";
import {
  DataTexture,
  FloatType,
  NearestFilter,
  PlaneGeometry,
  RGBAFormat,
} from "three";
import { Asset } from "visual/hooks/use-assets/types";
import { ImageDistortionMaterialParam } from "./types";

export const useFormatWebGL = (
  loadedAssets: Asset[],
  areAssetsInitialized: boolean,
  materialParams: ImageDistortionMaterialParam
) => {
  const { uniforms, shaders } = materialParams;
  const formatUniformsAndGeometry = useCallback(
    (assets: Asset[], unformattedUniforms): { geometry; uniforms; shaders } => {
      const geometry = new PlaneGeometry(1, 1, 1, 1);
      formatAssetWithUniforms(unformattedUniforms, assets);
      return { geometry, uniforms: unformattedUniforms, shaders };
    },
    [shaders]
  );

  return useMemo(() => {
    if (!areAssetsInitialized) {
      return { geometry: undefined, uniforms: undefined, shaders: undefined };
    }
    return formatUniformsAndGeometry(loadedAssets, uniforms);
  }, [areAssetsInitialized, formatUniformsAndGeometry, loadedAssets, uniforms]);
};

function formatAssetWithUniforms(uniforms, assets: Asset[]) {
  assets.forEach((asset) => {
    uniforms[asset.name].value = asset.data;
  });
  updateGrid(uniforms);
  resize(uniforms);
}

const resize = (uniforms) => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  // image cover
  const imageAspect = 1 / 1.5;
  let a1;
  let a2;
  if (height / width > imageAspect) {
    a1 = (width / height) * imageAspect;
    a2 = 1;
  } else {
    a1 = 1;
    a2 = height / width / imageAspect;
  }

  uniforms.uResolution.value.x = width;
  uniforms.uResolution.value.y = height;
  uniforms.uResolution.value.z = a1;
  uniforms.uResolution.value.w = a2;
  updateGrid(uniforms);
};

export const updateGrid = (uniforms) => {
  const size = uniforms.uGridSize.value;

  const width = size;
  const height = size;

  const sizeSquared = width * height;
  const data = new Float32Array(4 * sizeSquared);

  for (let i = 0; i < sizeSquared; i += 1) {
    const r = Math.random() * 255 - 125;
    const r1 = Math.random() * 255 - 125;

    const stride = i * 4;

    data[stride] = r;
    data[stride + 1] = r1;
    data[stride + 2] = r;
    data[stride + 3] = 1;
  }

  // used the buffer to create a DataTexture
  const texture = new DataTexture(data, width, height, RGBAFormat, FloatType);
  texture.magFilter = NearestFilter;
  texture.minFilter = NearestFilter;
  uniforms.uDataTexture.value = texture;
  uniforms.uDataTexture.value.needsUpdate = true;
};
