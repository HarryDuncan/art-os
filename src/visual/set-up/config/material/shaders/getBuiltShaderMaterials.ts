import { Asset } from "visual/set-up/assets/asset.types";
import { SceneConfig } from "../../config.types";
import { MATERIAL_TYPES } from "visual/display/materials/materials.consts";
import { DoubleSide, ShaderMaterial } from "three";
import { buildShader } from "./build-shader/buildShader";
import { formatBuiltShaderConfig } from "./shader-formatting/formatBuiltShaderConfig";
import { formatBuiltShaderUniforms } from "./shader-formatting/formatBuiltShaderUniforms";
import { configureBlendingOptions } from "../blending-options/configureBlendingOptions";
import { getAttributeValuesFromAssets } from "../../mesh/attributes/getAttributeValuesFromAsset";

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
        const attributesFromAssets = getAttributeValuesFromAssets(
          attributeConfigs,
          assets
        );
        console.log(fragmentShader);
        console.log(vertexShader);
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
          side: DoubleSide,
        });
        shader.name = materialConfig.id;
        return { shader, attributeConfigs: attributesFromAssets };
      }
      return [];
    }
  );

  const builtShaders = builtShadersAndAttributes.map(({ shader }) => shader);
  const shaderAttributeConfigs = builtShadersAndAttributes.map(
    ({ shader, attributeConfigs }) => ({
      materialId: shader.name,
      attributeConfigs,
    })
  );
  return { attributeConfigs: shaderAttributeConfigs, builtShaders };
};
