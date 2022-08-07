import { useCallback, useMemo } from "react";
import { Vector3 } from "three";
import { getGeometryFromAsset } from "visual/helpers/assets/getGeometryFromAsset";
import { Asset } from "visual/hooks/use-assets/types";

export const useAttractionMorphingData = (
  loadedAssets: Asset[],
  areAssetsInitialized: boolean,
  materialParams: any
) => {
  const formatUniformsAndGeometry = useCallback(
    (unformattedAssets: Asset[]) => {
      const { shaders, uniforms } = materialParams;
      const geom = getGeometryFromAsset(unformattedAssets);
      const matcap = unformattedAssets.find((asset) => asset.name === "matcap")
        ?.data;
      uniforms.matcap.value = matcap;
      const geometry = geom.clone();
      geometry.computeBoundingBox();
      const size = new Vector3();
      geometry.boundingBox.getSize(size);
      geometry.scale(0.3, 0.3, 0.3);
      return { geometry, uniforms, shaders };
    },
    [materialParams]
  );

  return useMemo(() => {
    if (!areAssetsInitialized) {
      return { geometry: undefined, uniforms: undefined, shaders: undefined };
    }
    return formatUniformsAndGeometry(loadedAssets);
  }, [areAssetsInitialized, formatUniformsAndGeometry, loadedAssets]);
};
