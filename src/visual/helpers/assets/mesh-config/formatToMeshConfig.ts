import { DEFAULT_POSITION } from "consts/threejs";
import { Vector3 } from "three";
import { getMeshComponentConfigs } from "visual/helpers/config-helpers/getMeshConfigConfig";
import { vector3DegreesToEuler } from "visual/helpers/three-dimension-space/degreesToEuler";
import { formatGeometriesFromAsset } from "../geometry/formatGeometryFromAsset";
import { FormattedGeometry } from "../geometry/geometry.types";

export const formatToMeshConfig = (
  loadedAssets,
  config
): FormattedGeometry[] => {
  const meshComponentConfig = getMeshComponentConfigs(config);
  const geometries = formatGeometriesFromAsset(loadedAssets);
  return geometries.flatMap((geometry) => {
    if (isGeometryVisible(geometry, meshComponentConfig)) {
      return [];
    }
    const position = formatPosition(geometry.name, meshComponentConfig);
    const rotation = formatRotation(geometry.name, meshComponentConfig);
    setScale(geometry, meshComponentConfig);
    return {
      geometry: geometry.geometry.center(),
      name: geometry.name,
      position,
      rotation,
    };
  });
};

export const isGeometryVisible = (geometry, config) => {
  const geometryConfigId = getGeometryId(geometry.name);
  return config[geometryConfigId]?.hidden ?? false;
};

export const getGeometryId = (name: string) =>
  name.substring(0, name.indexOf("-"));

const formatRotation = (name: string, config) => {
  const rotation = new Vector3(0, 0, 0);
  const geometryId = getGeometryId(name);
  rotation.setX(config[geometryId]?.rotation?.x ?? 0);
  rotation.setY(config[geometryId]?.rotation?.y ?? 0);
  rotation.setZ(config[geometryId]?.rotation?.z ?? 0);
  const eulerRotation = vector3DegreesToEuler(rotation);
  return eulerRotation;
};
const formatPosition = (name: string, config) => {
  const position = { ...DEFAULT_POSITION };
  const geometryId = getGeometryId(name);
  position.x = config[geometryId]?.position?.x ?? 0;
  position.y = config[geometryId]?.position?.y ?? 0;
  position.z = config[geometryId]?.position?.z ?? 0;
  return position;
};

const setScale = (geometry, config) => {
  const geometryId = getGeometryId(geometry.name);
  const size = config[geometryId]?.size;
  if (size) {
    geometry.geometry.scale(size, size, size);
  }
};
