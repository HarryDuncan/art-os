import { DEFAULT_POSITION } from "consts/threejs";
import { Vector2, Vector3 } from "three";
import { SceneData } from "visual/components/interactive-scene/types";
import { InteractiveShaderTypes } from "visual/components/interactive-shaders/types";
import { getGeometriesFromAssets } from "visual/helpers/assets/getGeometriesFromAssets";
import { formatMatcapTextureUniforms } from "visual/helpers/assets/texture/formatMatcapTextureUniforms";
import { formatImportedGeometry } from "visual/helpers/geometry/formatImportedGeometry";
import { FormattedGeometryType } from "visual/helpers/geometry/three-geometry/types";
import { vector3DegreesToEuler } from "visual/helpers/three-dimension-space/degreesToEuler";
import { Asset } from "visual/hooks/use-assets/types";
import { attractionMorphingFrag } from "visual/shaders/fragment-shaders";
import { attractionMorphingVertex } from "visual/shaders/vertex-shaders";

const GEOMETRY_UNIFORMS = {
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
  matcap: { value: null },
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

export const formatSceneData = (loadedAssets: Asset[]): SceneData => {
  const geometries = getGeometriesFromAssets(loadedAssets).map((geometry) => ({
    geometry: formatImportedGeometry(geometry),
    name: geometry.name,
  }));
  const matcaps = loadedAssets.flatMap((asset) =>
    asset.name.indexOf("matcap") !== -1 ? asset : []
  );

  const sceneData = {
    isSceneDataInitialized: true,
    geometries: geometries.flatMap((geometry, index) => {
      const matcap = matcaps[index];
      if (!matcap) return [];
      const uniforms = formatMatcapTextureUniforms(
        GEOMETRY_UNIFORMS,
        matcap.data
      );
      const position = formatPosition(index);
      const rotation = formatRotation(index);
      return {
        geometryType: FormattedGeometryType.standardShader,
        geometry: geometry.geometry,
        name: geometry.name,
        position,
        rotation,
        materialParameters: {
          shaderType: InteractiveShaderTypes.SHADER,
          shaders: {
            vertexShader: attractionMorphingVertex,
            fragmentShader: attractionMorphingFrag,
          },
          uniforms,
        },
      };
    }),
  };
  console.log(sceneData);
  return sceneData;
};

const formatRotation = (index: number) => {
  const rotation = new Vector3(90, 0, 0);
  const eulerRotation = vector3DegreesToEuler(rotation);
  return eulerRotation;
};
const formatPosition = (index: number) => {
  const position = { ...DEFAULT_POSITION };
  return position;
};
