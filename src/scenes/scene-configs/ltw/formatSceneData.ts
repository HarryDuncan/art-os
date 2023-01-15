import { DEFAULT_POSITION } from "consts/threejs";
import { Texture, Vector2, Vector3 } from "three";
import { SceneData } from "visual/components/interactive-scene/types";
import { LIGHT_TYPES } from "visual/components/three-js-components/lights/lights.types";
import {
  COMPONENT_TYPES,
  MarchingCubesProps,
} from "visual/components/three-js-components/components/threeJsComponents.types";
import { getGeometriesFromAssets } from "visual/helpers/assets/getGeometriesFromAssets";
import { formatImportedGeometry } from "visual/helpers/geometry/formatImportedGeometry";
import { MATERIAL_TYPES } from "visual/helpers/geometry/three-geometry/types";
import { vector3DegreesToEuler } from "visual/helpers/three-dimension-space/degreesToEuler";
import { Asset } from "visual/hooks/use-assets/types";

export const formatSceneData = (loadedAssets: Asset[]): SceneData => {
  const geometries = getGeometriesFromAssets(loadedAssets).map((geometry) => ({
    geometry: formatImportedGeometry(geometry),
    name: geometry.name,
  }));
  const matcaps = loadedAssets.flatMap((asset) =>
    asset.name.indexOf("matcap") !== -1 ? asset : []
  );
  const backgroundMatcap = matcaps[1];
  const sceneData: SceneData = {
    isSceneDataInitialized: true,
    meshConfigs: geometries.flatMap((geometry, index) => {
      const matcap = matcaps[0];

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
    sceneProperties: {
      background: backgroundMatcap.data as Texture,
    },
    sceneComponents: [
      {
        componentType: COMPONENT_TYPES.MARCHING_CUBES,
        componentProps: { name: "marching-cubes" } as MarchingCubesProps,
      },
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