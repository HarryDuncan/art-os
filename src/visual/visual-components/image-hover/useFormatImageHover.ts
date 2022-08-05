import { useCallback, useMemo } from "react";
import { PlaneGeometry, Vector2, MathUtils, Texture } from "three";
import { Asset } from "visual/hooks/use-assets/types";

export const useFormatImageHover = (
  loadedAssets: Asset[],
  areAssetsInitialized: boolean,
  materialParams: any
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
  uniforms.uCoverImageRatio.value = getRatio(assets[0].data as Texture);
  uniforms.uRevealedImageRatio.value = getRatio(assets[1].data as Texture);
}

const getRatio = (texture: Texture) => {
  const { height, width } = texture.image;
  console.log(height, width);
  const m = multiplyMatrixAndPoint(rotateMatrix(MathUtils.degToRad(0)), [
    width,
    height,
  ]);
  const originalRatio = {
    w: m[0] / width,
    h: m[1] / height,
  };

  const coverRatio = 1 / Math.max(originalRatio.w, originalRatio.h);

  return new Vector2(
    originalRatio.w * coverRatio,
    originalRatio.h * coverRatio
  );
};

const multiplyMatrixAndPoint = (matrix, point) => {
  const c0r0 = matrix[0];
  const c1r0 = matrix[1];
  const c0r1 = matrix[2];
  const c1r1 = matrix[3];
  const x = point[0];
  const y = point[1];
  return [Math.abs(x * c0r0 + y * c0r1), Math.abs(x * c1r0 + y * c1r1)];
};

const rotateMatrix = (a) => [
  Math.cos(a),
  -Math.sin(a),
  Math.sin(a),
  Math.cos(a),
];
