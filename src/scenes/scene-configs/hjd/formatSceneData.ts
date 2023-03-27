import { DEFAULT_POSITION, GREEN_SCREEN } from "consts/threejs";
import { MeshPhongMaterial, Texture, Vector3 } from "three";
import { SceneData } from "visual/components/interactive/scene/types";
import {
  COMPONENT_TYPES,
  PlaneProps,
  ThreeJsComponentType,
} from "visual/components/three-js-components/components/threeJsComponents.types";
import {
  LightType,
  LIGHT_TYPES,
} from "visual/components/three-js-components/lights/lights.types";
import { formatGeometriesFromAsset } from "visual/helpers/assets/geometry/formatGeometryFromAsset";
import { getMatcaps } from "visual/helpers/assets/texture/getMatcaps";
import { MATERIAL_TYPES } from "visual/helpers/materials/materials.constants";
import { MaterialParameterTypes } from "visual/helpers/materials/materials.types";
import { vector3DegreesToEuler } from "visual/helpers/three-dimension-space/degreesToEuler";
import { Asset } from "visual/hooks/use-assets/types";
import { bg, CONFIGS, CONFIG_INDEX } from "./hjd.constants";

const LARGE = 0.9;
export const formatSceneData = (loadedAssets: Asset[]): SceneData => {
  const geometries = formatGeometriesFromAsset(loadedAssets, { scale: LARGE });
  const matcaps = getMatcaps(loadedAssets);
  setGeometryPositionAndRotations(geometries, matcaps);

  const sceneData: SceneData = {
    isSceneDataInitialized: true,
    meshConfigs: setGeometryPositionAndRotations(geometries, matcaps),
    sceneProperties: {},
    sceneComponents: [
      {
        componentType: COMPONENT_TYPES.PLANE as ThreeJsComponentType,
        componentProps: {
          name: "bg",
          position: { x: -5, y: -5, z: -5 },

          material: {
            materialType: MATERIAL_TYPES.MATERIAL,
            material: bg,
          },
        } as PlaneProps,
      },
    ],
    lights: [
      {
        name: "ambient-light",
        lightType: LIGHT_TYPES.AMBIENT as LightType,
        props: {},
      },
      {
        name: "point-light",
        lightType: LIGHT_TYPES.POINT_LIGHT as LightType,
        props: {},
      },
      {
        name: "directional-light",
        lightType: LIGHT_TYPES.DIRECTIONAL_LIGHT as LightType,
        props: {},
      },
    ],
  };
  return sceneData;
};

const setGeometryPositionAndRotations = (geometries, matcaps) => {
  const matcap = matcaps[0];
  return geometries.flatMap((geometry) => {
    if (isGeometryHidden(geometry)) {
      return [];
    }
    const position = formatPosition(geometry.name);
    const rotation = formatRotation(geometry.name);
    const subName = getGeometryName(geometry.name);
    if (CONFIGS[CONFIG_INDEX][subName]?.size) {
      const scaleSize = CONFIGS[CONFIG_INDEX][subName]?.size;
      geometry.geometry.scale(scaleSize, scaleSize, scaleSize);
    }
    return {
      materialType: MATERIAL_TYPES.MATCAP,
      geometry: geometry.geometry.center(),
      name: geometry.name,
      position,
      rotation,
      materialParameters: {
        matcap: (matcap.data as Texture) ?? null,
      },
    };
  });
};

const isGeometryHidden = (geometry) => {
  const geometryConfigId = getGeometryName(geometry.name);
  return CONFIGS[CONFIG_INDEX][geometryConfigId]?.hidden ?? false;
};

const getGeometryName = (name: string) => name.substring(0, name.indexOf("-"));
const formatRotation = (name: string) => {
  const rotation = new Vector3(0, 0, 0);
  const subName = getGeometryName(name);
  rotation.setX(CONFIGS[CONFIG_INDEX][subName]?.rotation?.x ?? 0);
  rotation.setY(CONFIGS[CONFIG_INDEX][subName]?.rotation?.y ?? 0);
  rotation.setZ(CONFIGS[CONFIG_INDEX][subName]?.rotation?.z ?? 0);
  const eulerRotation = vector3DegreesToEuler(rotation);
  return eulerRotation;
};
const formatPosition = (name: string) => {
  const position = { ...DEFAULT_POSITION };
  const subName = getGeometryName(name);
  position.x = CONFIGS[CONFIG_INDEX][subName]?.position?.x ?? 0;
  position.y = CONFIGS[CONFIG_INDEX][subName]?.position?.y ?? 0;
  position.z = CONFIGS[CONFIG_INDEX][subName]?.position?.z ?? 0;

  return position;
};

// {
//   name: "ambient-light",
//   lightType: LIGHT_TYPES.AMBIENT,
//   props: { color: CONFIGS[CONFIG_INDEX].ambientLightColor },
// },
// {
//   name: "point-light",
//   lightType: LIGHT_TYPES.POINT_LIGHT,
//   props: {
//     color: CONFIGS[CONFIG_INDEX].pointLightColor,
//   },
// },
// {
//   name: "directional-light",
//   lightType: LIGHT_TYPES.DIRECTIONAL_LIGHT,
//   props: {
//     color: CONFIGS[CONFIG_INDEX].directionalLightColor,
//   },
// },
