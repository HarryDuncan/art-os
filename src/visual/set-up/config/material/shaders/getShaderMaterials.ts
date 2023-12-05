import { Asset } from "visual/set-up/assets/asset.types";
import { SceneConfig } from "../../config.types";
import {
  MATERIAL_TYPES,
  SHADER_MATERIALS,
} from "visual/display/materials/materials.consts";
import {
  MaterialConfig,
  ShaderMaterialProps,
} from "visual/set-up/config/material/materials.types";
import { configureShaders } from "visual/display/materials/webgl-shaders/shader-setup/configureShaders";
import { ShaderMaterial } from "three";
import { configureBlendingOptions } from "../blending-options/configureBlendingOptions";
import { buildShader } from "./build-shader/buildShader";
import { formatBuiltShaderConfig } from "./shader-formatting/formatBuiltShaderConfig";
import { formatBuiltShaderUniforms } from "./shader-formatting/formatBuiltShaderUniforms";

export const getShaderMaterials = (config: SceneConfig, assets: Asset[]) => {
  const { globalMaterialConfigs } = config;
  if (!globalMaterialConfigs) return [];
  return globalMaterialConfigs.flatMap((materialConfig) => {
    if (SHADER_MATERIALS.includes(materialConfig.materialType)) {
      const shaderMaterial = setUpShaderMaterial(materialConfig, assets);
      if (shaderMaterial) {
        shaderMaterial.name = materialConfig.id;
        return shaderMaterial;
      }
    }
    if (materialConfig.materialType === MATERIAL_TYPES.BUILT_SHADER) {
      const { builtShaderConfig, assetMapping } = materialConfig;
      if (!builtShaderConfig) return [];
      const shaderConfig = formatBuiltShaderConfig(builtShaderConfig);
      const { uniforms, vertexShader, fragmentShader } = buildShader(
        shaderConfig
      );
      const formattedUniforms = formatBuiltShaderUniforms(
        uniforms,
        assetMapping ?? [],
        assets
      );
      const shader = new ShaderMaterial({
        uniforms: formattedUniforms,
        vertexShader,
        fragmentShader,
      });
      shader.name = materialConfig.id;
      return shader;
    }
    return [];
  });
};

const setUpShaderMaterial = (
  materialConfig: MaterialConfig,
  assets: Asset[]
) => {
  const {
    shaderConfig,
    uniforms,
  } = materialConfig.materialProps as ShaderMaterialProps;
  const { vertexShader, fragmentShader, configuredUniforms } = configureShaders(
    shaderConfig,
    uniforms,
    assets
  );
  const blendingOptions = configureBlendingOptions(
    materialConfig.blendingConfig
  );
  switch (materialConfig.materialType) {
    case MATERIAL_TYPES.SHADER: {
      return new ShaderMaterial({
        uniforms: configuredUniforms,
        vertexShader,
        fragmentShader,
        ...blendingOptions,
      });
    }
    default:
      return null;
  }
};
