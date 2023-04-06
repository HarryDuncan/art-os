import { Asset } from "utils/assets/use-assets/types";
import { SceneDataConfig } from "../config.types";
import { getMaterialsFromConfig } from "./getMaterialsFromConfig";
import { formatAssetBasedMaterial } from "utils/assets/formatAssetBasedMaterial";

export const formatGlobalMaterials = (
  assets: Asset[],
  config: SceneDataConfig
) => {
  const assetBasedMaterials = formatAssetBasedMaterial(assets);
  const globalMaterials = getMaterialsFromConfig(config);
  return [...assetBasedMaterials, ...globalMaterials];
};
