import { Asset } from "visual/set-up/assets/asset.types";
import { SceneConfig } from "../config.types";
import { getMaterialsFromConfig } from "./getMaterialsFromConfig";
import { getShaderMaterials } from "./shaders/getShaderMaterials";
import { Material } from "three";
import { getAssetMappedMaterials } from "./getAssetMappedMaterials";

export const formatGlobalMaterials = (
  assets: Asset[],
  config: SceneConfig
): Material[] => {
  const assetMappedMaterials = getAssetMappedMaterials(
    config?.globalMaterialConfigs ?? [],
    assets
  );
  const shaderMaterials = getShaderMaterials(config, assets);
  const globalMaterials = getMaterialsFromConfig(config);
  console.log(globalMaterials);
  return [...assetMappedMaterials, ...shaderMaterials, ...globalMaterials];
};
