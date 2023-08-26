import { Material, Object3D } from "three";
import { formatGeometry } from "./geometry/formatGeometry";
import { addMaterials } from "./addMaterials";
import { setUpMeshes } from "./mesh-setup/setUpMeshes";
import { setUpRandomizedMeshConfigs } from "./setUpRandomizedMeshConfigs";
import { Asset } from "visual/set-up/assets/asset.types";
import { SceneConfig } from "../config.types";
import { transformGeometry } from "./geometry/transformGeometries";

export const getMeshesFromConfig = (
  assets: Asset[],
  materials: Material[],
  config: SceneConfig
): Object3D[] => {
  const { meshComponentConfigs, meshTransforms } = config;
  const meshConfigs =
    meshComponentConfigs?.filter(
      (meshConfig) => !meshConfig.randomizationConfig
    ) ?? [];
  const randomizedMeshes = setUpRandomizedMeshConfigs(meshComponentConfigs);
  const allMeshes = [...meshConfigs, ...randomizedMeshes];
  const formattedGeometry = formatGeometry(assets, allMeshes);
  const transformedGeometry = transformGeometry(
    meshTransforms,
    formattedGeometry
  );
  const geometriesWithMaterials = addMaterials(
    transformedGeometry,
    materials,
    allMeshes
  );
  const meshes = setUpMeshes(geometriesWithMaterials);
  return meshes;
};
