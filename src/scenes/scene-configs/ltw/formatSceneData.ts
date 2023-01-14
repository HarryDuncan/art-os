import { DEFAULT_POSITION } from "consts/threejs";
import { Texture, Vector2, Vector3 } from "three";
import { SceneData } from "visual/components/interactive-scene/types";
import { LIGHT_TYPES } from "visual/components/three-js-components/lights/lights.types";
import { COMPONENT_TYPES } from "visual/components/three-js-components/three-js-components.types";
import { getGeometriesFromAssets } from "visual/helpers/assets/getGeometriesFromAssets";
import { formatImportedGeometry } from "visual/helpers/geometry/formatImportedGeometry";
import { MATERIAL_TYPES } from "visual/helpers/geometry/three-geometry/types";
import { vector3DegreesToEuler } from "visual/helpers/three-dimension-space/degreesToEuler";
import { Asset } from "visual/hooks/use-assets/types";

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
    meshConfigs: geometries.flatMap((geometry, index) => {
      const matcap = matcaps[index];
      if (!matcap) return [];

      const position = formatPosition(index);
      const rotation = formatRotation(index);
      return {
        materialType: MATERIAL_TYPES.matcap,
        geometry: geometry.geometry,
        name: geometry.name,
        position,
        rotation,
        materialParameters: {
          matcap: (matcap.data as Texture) ?? null,
        },
      };
    }),
    sceneComponents: [
      { name: "marching-cubes", componentType: COMPONENT_TYPES.MARCHING_CUBES },
    ],
    lights: [
      {
        name: "ambient-light",
        lightType: LIGHT_TYPES.AMBIENT,
      },
      {
        name: "point-light",
        lightType: LIGHT_TYPES.POINT_LIGHT,
      },
      {
        name: "directional-light",
        lightType: LIGHT_TYPES.DIRECTIONAL_LIGHT,
      },
    ],
  };
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
