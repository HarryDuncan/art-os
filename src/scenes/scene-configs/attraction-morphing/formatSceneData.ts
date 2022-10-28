import { useCallback, useMemo } from "react";
import { Vector3 } from "three";
import { SceneData } from "visual/components/interactive-scene/types";
import { InteractiveShaderTypes } from "visual/components/interactive-shaders/types";
import { getGeometryFromAsset } from "visual/helpers/assets/getGeometryFromAsset";
import { FormattedGeometryType } from "visual/helpers/geometry/three-geometry/types";
import { Asset } from "visual/hooks/use-assets/types";
import { attractionMorphingFrag } from "visual/shaders/fragment-shaders";
import { attractionMorphingVertex } from "visual/shaders/vertex-shaders";

export const formatSceneData = (
  loadedAssets: Asset[],
  materialParams: any
): SceneData => {
  const geom = getGeometryFromAsset(loadedAssets);
  const matcapValue = loadedAssets.find((asset) => asset.name === "matcap")
    ?.data;
  const { uniforms } = materialParams;
  const formattedUniforms = {
    ...uniforms,
  };
  formattedUniforms.matcap = { value: matcapValue };
  const geometry = geom.clone();
  geometry.computeBoundingBox();
  const size = new Vector3();
  geometry.boundingBox.getSize(size);
  geometry.scale(0.3, 0.3, 0.3);
  return {
    isSceneDataInitialized: true,
    geometries: [
      {
        geometryType: FormattedGeometryType.interactive,
        geometry,
        materialParameters: {
          shaderType: InteractiveShaderTypes.SHADER,
          shaders: {
            vertexShader: attractionMorphingVertex,
            fragmentShader: attractionMorphingFrag,
          },
          uniforms: formattedUniforms,
        },
      },
    ],
  };
};

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
