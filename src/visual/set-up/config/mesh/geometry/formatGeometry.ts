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

import {
  formatPositionFromConfig,
  formatRotationFromConfig,
} from "visual/utils/three-dimension-space/formatFromConfig";

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

    const position = formatPositionFromConfig(meshConfig);
    const rotation = formatRotationFromConfig(meshConfig);
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
