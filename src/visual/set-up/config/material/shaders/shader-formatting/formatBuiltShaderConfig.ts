import { BuiltShaderConfig } from "../build-shader/buildShader.types";

export const formatBuiltShaderConfig = (
  parsedConfig: Partial<BuiltShaderConfig>
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
