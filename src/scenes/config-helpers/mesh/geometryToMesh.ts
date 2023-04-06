import { DEFAULT_POSITION } from "consts/threejs";
import { Vector3 } from "three";
import { vector3DegreesToEuler } from "visual/helpers/three-dimension-space/degreesToEuler";
import { FormattedGeometry } from "utils/assets/geometry/geometry.types";
import { formatGeometriesFromAsset } from "utils/assets/geometry/formatGeometryFromAsset";
import { SceneDataConfig } from "../config.types";
import { Asset } from "utils/assets/use-assets/types";

export const geometryToMesh = (
  loadedAssets: Asset[],
  config: SceneDataConfig
): FormattedGeometry[] => {
  const { meshComponentConfigs } = config;
  const geometries = formatGeometriesFromAsset(loadedAssets);
  return geometries.flatMap((geometry) => {
    const meshConfig = getMeshConfigForGeometry(geometry, meshComponentConfigs);
    if (!meshConfig || meshConfig.hidden) {
      return [];
    }
    const position = formatPosition(meshConfig);
    const rotation = formatRotation(meshConfig);
    setScale(geometry, meshConfig);
    return {
      geometry: geometry.geometry.center(),
      name: meshConfig.id,
      position,
      rotation,
    };
  });
};
const getMeshConfigForGeometry = (geometry, configs) => {
  const meshConfig = configs.find(
    ({ geometryId }) => geometryId === geometry.name
  );
  if (!meshConfig) {
    console.warn(
      `no mesh config found for ${geometry.name} this geometry will not be rendered`
    );
  }
  return meshConfig;
};

const formatRotation = (config) => {
  const rotation = new Vector3(0, 0, 0);
  rotation.setX(config.rotation?.x ?? 0);
  rotation.setY(config.rotation?.y ?? 0);
  rotation.setZ(config.rotation?.z ?? 0);
  const eulerRotation = vector3DegreesToEuler(rotation);
  return eulerRotation;
};
const formatPosition = (config) => {
  const position = { ...DEFAULT_POSITION };
  position.x = config?.position?.x ?? 0;
  position.y = config?.position?.y ?? 0;
  position.z = config?.position?.z ?? 0;
  return new Vector3(position.x, position.y, position.z);
};

const setScale = (geometry, config) => {
  const size = config?.size;
  if (size) {
    geometry.geometry.scale(size, size, size);
  }
};
