import { Asset } from "visual/hooks/use-assets/types";
import { addMaterialsToMeshConfig } from "./addMaterialsToMeshConfig";
import { formatMeshGeometry } from "./formatMeshGeometry";

export const getMeshConfigs = (assets: Asset[], materials, config) => {
  const formattedGeometries = formatMeshGeometry(assets, config);
  const meshConfigs = addMaterialsToMeshConfig(
    formattedGeometries,
    materials,
    config
  );
  return meshConfigs;
};
