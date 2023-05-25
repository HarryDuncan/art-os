import { DEFAULT_POSITION } from "consts/threejs";
import { Vector3 } from "three";
import { vector3DegreesToEuler } from "visual/display/helpers/three-dimension-space/degreesToEuler";
import { MeshComponentConfig } from "../config.types";
import { cloneDeep } from "lodash";
import { Asset } from "visual/set-up/assets/use-assets/types";
import {
  FormattedGeometry,
  MESH_TYPES,
} from "visual/set-up/assets/geometry/geometry.types";
import { formatGeometriesFromAsset } from "visual/set-up/assets/geometry/formatGeometryFromAsset";

export const geometryToMesh = (
  loadedAssets: Asset[],
  meshComponentConfigs: MeshComponentConfig[]
): FormattedGeometry[] => {
  const geometries = formatGeometriesFromAsset(loadedAssets);
  return meshComponentConfigs.flatMap((meshConfig) => {
    const geometry = getGeometryForMeshConfig(
      geometries,
      meshConfig.geometryId ?? ""
    );
    const position = formatPosition(meshConfig);
    const rotation = formatRotation(meshConfig);
    setScale(geometry, meshConfig);
    const centeredGeometry = geometry.geometry;
    centeredGeometry.center();
    return {
      geometry: centeredGeometry,
      name: meshConfig.id,
      meshType: MESH_TYPES.MESH,
      position,
      rotation,
    } as FormattedGeometry;
  }) as FormattedGeometry[];
};
const getGeometryForMeshConfig = (geometries, geometryId: string) => {
  const meshGeometry = geometries.find(
    (geometry) => geometry.name === geometryId
  );
  if (!meshGeometry) {
    console.warn(
      `no geometry found for ${geometryId} this mesh will not be rendered`
    );
  }
  const geometry = cloneDeep(meshGeometry);
  return geometry;
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
