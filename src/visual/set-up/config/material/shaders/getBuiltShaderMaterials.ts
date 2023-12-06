import { Asset } from "visual/set-up/assets/asset.types";
import { SceneConfig } from "../../config.types";
import { MATERIAL_TYPES } from "visual/display/materials/materials.consts";
import { ShaderMaterial } from "three";
import { buildShader } from "./build-shader/buildShader";
import { formatBuiltShaderConfig } from "./shader-formatting/formatBuiltShaderConfig";
import { formatBuiltShaderUniforms } from "./shader-formatting/formatBuiltShaderUniforms";
import { configureBlendingOptions } from "../blending-options/configureBlendingOptions";

export const getBuiltShaderMaterials = (
  config: SceneConfig,
  assets: Asset[]
) => {
  const { globalMaterialConfigs } = config;
  if (!globalMaterialConfigs)
    return {
      attributeConfigs: [],
      builtShaders: [],
    };
  const builtShadersAndAttributes = globalMaterialConfigs.flatMap(
    (materialConfig) => {
      if (materialConfig.materialType === MATERIAL_TYPES.BUILT_SHADER) {
        const { builtShaderConfig, assetMapping } = materialConfig;
        if (!builtShaderConfig) return [];
        const shaderConfig = formatBuiltShaderConfig(builtShaderConfig);
        const {
          uniforms,
          vertexShader,
          fragmentShader,
          attributeConfigs,
        } = buildShader(shaderConfig);
        const formattedUniforms = formatBuiltShaderUniforms(
          uniforms,
          assetMapping ?? [],
          assets
        );
        const blendingOptions = configureBlendingOptions(
          materialConfig.blendingConfig
        );
        const shader = new ShaderMaterial({
          uniforms: formattedUniforms,
          vertexShader,
          fragmentShader,
          ...blendingOptions,
        });
        shader.name = materialConfig.id;
        return { shader, attributeConfigs };
      }
      return [];
    }
  );

  const builtShaders = builtShadersAndAttributes.map(({ shader }) => shader);
  const attributeConfigs = builtShadersAndAttributes.map(
    ({ shader, attributeConfigs }) => ({
      materialId: shader.name,
      attributeConfigs,
    })
  );
  return { attributeConfigs, builtShaders };
};
