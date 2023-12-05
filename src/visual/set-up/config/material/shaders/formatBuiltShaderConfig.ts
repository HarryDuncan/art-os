import { Asset } from "visual/set-up/assets/asset.types";
import { BuiltShaderConfig } from "./build-shader/buildShader.types";

export const formatBuiltShaderConfig = (
  parsedConfig: Partial<BuiltShaderConfig>,
  assets: Asset[]
): BuiltShaderConfig => {
  const {
    vertexEffectConfigs,
    fragmentEffectConfigs,
    uniformConfig,
    varyingConfig,
    attributeConfig,
  } = parsedConfig;
  return {
    vertexEffectConfigs: vertexEffectConfigs ?? [],
    fragmentEffectConfigs: fragmentEffectConfigs ?? [],
    uniformConfig: uniformConfig ?? {
      defaultUniforms: [],
      customUniforms: [],
    },
    attributeConfig: attributeConfig ?? [],
    varyingConfig: varyingConfig ?? [],
  };
};
