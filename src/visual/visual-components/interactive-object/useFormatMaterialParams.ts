import { useCallback, useMemo } from "react";
import { Vector3 } from "three";
import { InteractiveParam } from "visual/components/interactive-shaders/types";
import { getGeometryFromAsset } from "visual/helpers/assets/getGeometryFromAsset";
import { Asset } from "visual/hooks/use-assets/types";

export const useFormatMaterialParams = (
  initializedAssets: Asset[],
  areAssetsInitialized: boolean,
  materialParams: InteractiveParam
) => {
  const { uniforms, shaders } = materialParams;
  const formatUniformsAndGeometry = useCallback(
    (
      assets: Asset[],
      unformattedUniforms
    ): {
      geometry;
      uniforms;
      shaders;
    } => {
      const geom = getGeometryFromAsset(assets);
      const matcap = assets.find((asset) => asset.name === "matcap")?.data;
      const formattedUniforms = Object.assign(unformattedUniforms);
      formattedUniforms.matcap.value = matcap;
      const geometry = geom.clone();
      geometry.computeBoundingBox();
      const size = new Vector3();
      geometry.boundingBox.getSize(size);
      unformattedUniforms.size.value.copy(size);
      return { geometry, uniforms: unformattedUniforms, shaders };
    },
    [shaders]
  );

  return useMemo(() => {
    if (!areAssetsInitialized)
      return { geometry: undefined, uniforms: undefined, shaders: undefined };
    return formatUniformsAndGeometry(initializedAssets, uniforms);
  }, [
    areAssetsInitialized,
    formatUniformsAndGeometry,
    initializedAssets,
    uniforms,
  ]);
};
