import { DEFAULT_POSITION } from "visual/consts/threejs";
import { BufferGeometry, Vector3 } from "three";
import { Asset } from "visual/set-up/assets/asset.types";
import {
  FormattedGeometry,
  GeometryConfig,
  MESH_TYPES,
} from "visual/set-up/assets/geometry/geometry.types";
import { DEFAULT_MODEL3D_CONFIG } from "visual/set-up/assets/assets.constants";
import { MeshComponentConfig } from "../../config.types";
import { getAssetGeometries } from "visual/set-up/config/mesh/geometry/getAssetGeometries";
import { vector3DegreesToEuler } from "visual/utils/three-dimension-space/degreesToEuler";

export const formatGeometry = (
  loadedAssets: Asset[],
  meshComponentConfigs: MeshComponentConfig[]
): FormattedGeometry[] => {
  const geometries = getAssetGeometries(loadedAssets);
  return meshComponentConfigs.flatMap((meshConfig) => {
    const geometry = getGeometryForMeshConfig(
      geometries,
      meshConfig.geometryId ?? ""
    );
    if (!geometry?.geometry) {
      return [];
    }

    const position = formatPosition(meshConfig);
    const rotation = formatRotation(meshConfig);
    const configuredGeometry = configureGeometry(
      geometry.geometry,
      meshConfig.geometryConfig
    );

    return {
      geometry: configuredGeometry,
      name: meshConfig.id,
      meshType: meshConfig.meshType ?? MESH_TYPES.MESH,
      position,
      rotation,
      groupId: meshConfig.groupId,
    } as FormattedGeometry;
  }) as FormattedGeometry[];
};

export const configureGeometry = (
  geometry: BufferGeometry,
  geometryConfig: GeometryConfig = DEFAULT_MODEL3D_CONFIG
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
      `no geometry found for ${geometryId} this mesh will not be rendered
      geometry names ${geometries.map(({ name }) => name)}`
    );
  }
  return {
    ...meshGeometry,
    geometry: meshGeometry?.geometry.clone(),
  };
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
