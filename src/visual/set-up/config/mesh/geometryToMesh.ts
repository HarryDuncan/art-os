import { DEFAULT_POSITION } from "visual/consts/threejs";
import { BufferGeometry, Vector3 } from "three";
import { vector3DegreesToEuler } from "visual/display/helpers/three-dimension-space/degreesToEuler";
import { cloneDeep } from "lodash";
import { Asset } from "visual/set-up/assets/asset.types";
import {
  FormattedGeometry,
  GeometryConfig,
  MESH_TYPES,
} from "visual/set-up/assets/geometry/geometry.types";
import { formatGeometriesFromAsset } from "visual/set-up/assets/geometry/formatGeometryFromAsset";
// import { LoopSubdivision } from "three-subdivide";
import { DEFAULT_GEOMETRY_CONFIG } from "visual/set-up/assets/assets.constants";
import { MeshComponentConfig } from "../config.types";

export const geometryToMesh = (
  loadedAssets: Asset[],
  meshComponentConfigs: MeshComponentConfig[]
): FormattedGeometry[] => {
  const geometries = formatGeometriesFromAsset(loadedAssets);
  console.log(geometries);
  return meshComponentConfigs.flatMap((meshConfig) => {
    const geometry = getGeometryForMeshConfig(
      geometries,
      meshConfig.geometryId ?? ""
    );
    const position = formatPosition(meshConfig);
    const rotation = formatRotation(meshConfig);

    if (!geometry?.geometry) {
      return [];
    }
    const configuredGeometry = configureGeometry(
      geometry.geometry,
      meshConfig.geometryConfig
    );

    return {
      geometry: configuredGeometry,
      name: meshConfig.id,
      meshType: MESH_TYPES.MESH,
      position,
      rotation,
      groupId: meshConfig.groupId,
    } as FormattedGeometry;
  }) as FormattedGeometry[];
};

export const configureGeometry = (
  geometry: BufferGeometry,
  geometryConfig: GeometryConfig = DEFAULT_GEOMETRY_CONFIG
) => {
  const formattedGeometry = geometry.clone();
  const { scale, centerMesh } = geometryConfig;
  formattedGeometry.scale(scale, scale, scale);
  if (centerMesh) {
    formattedGeometry.center();
  }

  const size = new Vector3();
  formattedGeometry.computeBoundingBox();
  formattedGeometry.boundingBox?.getSize(size);
  // if (subdivision) {
  //   return LoopSubdivision.modify(
  //     formattedGeometry,
  //     subdivision.subdevisionIterations,
  //     subdivision.subdivisionProps
  //   );
  // }
  return formattedGeometry;
};

const getGeometryForMeshConfig = (
  geometries: FormattedGeometry[],
  geometryId: string
) => {
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

const formatRotation = (config: MeshComponentConfig) => {
  const rotation = new Vector3(0, 0, 0);
  rotation.setX(config.rotation?.x ?? 0);
  rotation.setY(config.rotation?.y ?? 0);
  rotation.setZ(config.rotation?.z ?? 0);
  const eulerRotation = vector3DegreesToEuler(rotation);
  return eulerRotation;
};
const formatPosition = (config: MeshComponentConfig) => {
  const position = { ...DEFAULT_POSITION };
  position.x = config?.position?.x ?? 0;
  position.y = config?.position?.y ?? 0;
  position.z = config?.position?.z ?? 0;
  return new Vector3(position.x, position.y, position.z);
};
