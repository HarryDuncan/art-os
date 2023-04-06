import { Asset } from "utils/assets/use-assets/types";
import { addMaterialsToMeshConfig } from "./addMaterialsToMeshConfig";
import { formatMeshGeometry } from "./formatMeshGeometry";
import { Material } from "three";
import { SceneDataConfig } from "scenes/config-helpers/config.types";

export const getMeshConfigs = (
  assets: Asset[],
  materials: Material[],
  config: SceneDataConfig
) => {
  const formattedGeometries = formatMeshGeometry(assets, config);
  const meshConfigs = addMaterialsToMeshConfig(
    formattedGeometries,
    materials,
    config
  );
  return meshConfigs;
};
