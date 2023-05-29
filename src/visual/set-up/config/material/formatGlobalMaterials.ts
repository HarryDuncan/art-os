import { formatAssetBasedMaterial } from "visual/set-up/assets/formatAssetBasedMaterial";
import { Asset } from "visual/set-up/assets/use-assets/types";
import { SceneDataConfig } from "../config.types";
import { getMaterialsFromConfig } from "./getMaterialsFromConfig";

export const formatGlobalMaterials = (
  assets: Asset[],
  config: SceneDataConfig
) => {
  const assetBasedMaterials = formatAssetBasedMaterial(assets);
  const globalMaterials = getMaterialsFromConfig(config);
  return [...assetBasedMaterials, ...globalMaterials];
};
