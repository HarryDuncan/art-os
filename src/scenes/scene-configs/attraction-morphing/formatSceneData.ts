import { Vector2, Vector3 } from "three";
import { SceneData } from "visual/components/interactive-scene/types";
import { InteractiveShaderTypes } from "visual/components/interactive-shaders/types";
import { formatGeometriesFromAsset } from "visual/helpers/assets/geometry/formatGeometryFromAsset";

import { MATERIAL_TYPES } from "visual/helpers/assets/geometry/types";
import { Asset } from "visual/hooks/use-assets/types";
import { attractionMorphingFrag } from "visual/shaders/fragment-shaders";
import { attractionMorphingVertex } from "visual/shaders/vertex-shaders";

export const formatSceneData = (loadedAssets: Asset[]): SceneData => {
  const geom = formatGeometriesFromAsset(loadedAssets)[0].geometry;
  const matcapValue = loadedAssets.find((asset) => asset.name === "matcap")
    ?.data;

  const formattedUniforms = {
    uTime: {
      type: "f",
      value: 0.0,
    },
    uFrame: {
      type: "f",
      value: 0.0,
    },
    uResolution: {
      type: "v2",
      value: new Vector2(window.innerWidth, window.innerHeight).multiplyScalar(
        window.devicePixelRatio
      ),
    },
    matcap: { value: matcapValue },
    uPosition: {
      type: "v2",
      value: new Vector2(50, 50),
    },
    uMouse: {
      type: "v2",
      value: new Vector2(
        0.7 * window.innerWidth,
        window.innerHeight
      ).multiplyScalar(window.devicePixelRatio),
    },
  };

  const geometry = geom.clone();
  geometry.computeBoundingBox();
  const size = new Vector3();
  geometry.boundingBox.getSize(size);
  geometry.scale(0.3, 0.3, 0.3);
  return {
    isSceneDataInitialized: true,
    meshConfigs: [
      {
        materialType: MATERIAL_TYPES.interactive,
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
