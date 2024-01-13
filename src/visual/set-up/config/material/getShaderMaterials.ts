import { Asset } from "visual/set-up/assets/asset.types";
import { SceneConfig } from "../config.types";
import {
  MATERIAL_TYPES,
  SHADER_MATERIALS,
} from "visual/display/materials/materials.consts";
import {
  MaterialConfig,
  ShaderMaterialProps,
} from "visual/set-up/config/material/materials.types";
import { configureShaders } from "visual/display/materials/webgl-shaders/shader-setup/configureShaders";
import { DoubleSide, ShaderMaterial } from "three";
import { configureBlendingOptions } from "./blending-options/configureBlendingOptions";

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
        side: DoubleSide,
        ...blendingOptions,
      });
    }
    default:
      return null;
  }
};
