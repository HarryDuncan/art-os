import { Asset } from "visual/hooks/use-assets/types";
import { SceneDataConfig } from "./config.types";
import { formatAssetBasedMaterial } from "visual/helpers/assets/formatAssetBasedMaterial";
import { getMaterialsFromConfig } from "./getMaterialsFromConfig";

export const formatGlobalMaterials = (
  assets: Asset[],
  config: SceneDataConfig
) => {
  const assetBasedMaterials = formatAssetBasedMaterial(assets);
  const globalMaterials = getMaterialsFromConfig(config);
  return [...assetBasedMaterials, ...globalMaterials];
};
