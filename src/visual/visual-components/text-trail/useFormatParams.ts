import { useCallback, useMemo } from "react";
import { PlaneGeometry } from "three";
import { Asset } from "visual/hooks/use-assets/types";

export const useFormatParams = (
  assets: Asset[],
  areAssetsInitialized: boolean,
  materialParams: any
) => {
  const { uniforms, shaders } = materialParams;
  const formatUniformsAndGeometry = useCallback(
    (assets: Asset[], unformattedUniforms): { geometry; uniforms; shaders } => {
      const geometry = new PlaneGeometry(1, 1, 1, 1);

      return { geometry, uniforms: unformattedUniforms, shaders };
    },
    [shaders]
  );

  return useMemo(() => {
    if (!areAssetsInitialized)
      return { geometry: undefined, uniforms: undefined, shaders: undefined };
    return formatUniformsAndGeometry(assets, uniforms);
  }, [areAssetsInitialized, formatUniformsAndGeometry, assets, uniforms]);
};
