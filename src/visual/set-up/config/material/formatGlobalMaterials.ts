import { textureMaterialFromAsset } from "visual/set-up/assets/textureMaterialFromAsset";
import { Asset } from "visual/set-up/assets/use-assets/types";
import { SceneConfig } from "../config.types";
import { getMaterialsFromConfig } from "./getMaterialsFromConfig";
import { getShaderMaterials } from "./getShaderMaterials";
import { Material } from "three";

export const formatGlobalMaterials = (
  assets: Asset[],
  config: SceneConfig
): Material[] => {
  const textureMaterials = textureMaterialFromAsset(assets);
  const shaderMaterials = getShaderMaterials(config, assets);
  const globalMaterials = getMaterialsFromConfig(config);
  return [...textureMaterials, ...shaderMaterials, ...globalMaterials];
};
