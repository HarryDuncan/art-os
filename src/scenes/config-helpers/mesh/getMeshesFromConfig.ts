import { Asset } from "utils/assets/use-assets/types";
import { Material, Mesh, Object3D } from "three";
import { SceneDataConfig } from "scenes/config-helpers/config.types";
import { geometryToMesh } from "./geometryToMesh";
import { addMaterials } from "./addMaterials";
import { setUpMeshes } from "./setUpMeshes";
import { setUpRandomizedMeshConfigs } from "./setUpRandomizedMeshConfigs";

export const getMeshesFromConfig = (
  assets: Asset[],
  materials: Material[],
  config: SceneDataConfig
): Object3D[] => {
  const { meshComponentConfigs } = config;
  const meshConfigs = meshComponentConfigs.filter(
    (meshConfig) => !meshConfig.randomizationConfig
  );
  const randomizedMeshes = setUpRandomizedMeshConfigs(meshComponentConfigs);
  const allMeshes = [...meshConfigs, ...randomizedMeshes];
  const formattedGeometry = geometryToMesh(assets, allMeshes);

  const meshParametersWithMaterials = addMaterials(
    formattedGeometry,
    materials,
    allMeshes
  );
  const meshes = setUpMeshes(meshParametersWithMaterials);
  return meshes;
};
