import { Asset } from "visual/set-up/assets/asset.types";
import { SceneConfig } from "../config.types";
import { getMaterialsFromConfig } from "./getMaterialsFromConfig";
import { getShaderMaterials } from "./shaders/getShaderMaterials";
import { Material } from "three";
import { getAssetMappedMaterials } from "./getAssetMappedMaterials";
import { getBuiltShaderMaterials } from "./shaders/getBuiltShaderMaterials";
import { ShaderAttributeConfig } from "./shaders/build-shader/buildShader.types";

export const formatGlobalMaterials = (
  assets: Asset[],
  config: SceneConfig
): { materials: Material[]; attributeConfigs: ShaderAttributeConfig[] } => {
  const assetMappedMaterials = getAssetMappedMaterials(
    config?.globalMaterialConfigs ?? [],
    assets
  );
  console.log(assetMappedMaterials);
  const shaderMaterials = getShaderMaterials(config, assets);
  const { builtShaders, attributeConfigs } = getBuiltShaderMaterials(
    config,
    assets
  );
  const globalMaterials = getMaterialsFromConfig(config);
  return {
    materials: [
      ...assetMappedMaterials,
      ...shaderMaterials,
      ...(builtShaders ?? []),
      ...globalMaterials,
    ],
    attributeConfigs,
  };
};
