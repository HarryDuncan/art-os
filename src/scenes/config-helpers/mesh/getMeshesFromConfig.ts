import { Asset } from "utils/assets/use-assets/types";
import { Material, Mesh, Object3D } from "three";
import { SceneDataConfig } from "scenes/config-helpers/config.types";
import { geometryToMesh } from "./geometryToMesh";
import { addMaterials } from "./addMaterials";
import { setUpMeshes } from "./setUpMeshes";

export const getMeshesFromConfig = (
  assets: Asset[],
  materials: Material[],
  config: SceneDataConfig
): Object3D[] => {
  const meshParameters = geometryToMesh(assets, config);
  console.log(meshParameters);
  const meshParametersWithMaterials = addMaterials(
    meshParameters,
    materials,
    config
  );
  const meshes = setUpMeshes(meshParametersWithMaterials);
  return meshes;
};
