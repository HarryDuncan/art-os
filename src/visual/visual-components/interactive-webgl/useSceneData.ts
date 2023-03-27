import { useMemo } from "react";
import { Asset } from "visual/hooks/use-assets/types";
import { WebGLShaderMaterialParams } from "./types";
import { PlaneGeometry, RepeatWrapping } from "three";
import { defaultVertex } from "visual/shaders/vertex-shaders";
import { formatUniforms } from "visual/shaders/shader-functions/uniforms/formatUniforms";
import { formatFragmentShader } from "visual/shaders/shader-functions/formatFragmentShader";
import { SceneData } from "visual/components/interactive/scene/types";
import { MATERIAL_TYPES } from "visual/helpers/materials/materials.constants";
import { MaterialType } from "visual/helpers/materials/materials.types";
import { INTERACTIVE_SHADER_TYPES } from "visual/components/interactive/shaders/shaders.constants";
import { InteractiveShaderType } from "visual/components/interactive/shaders/shaders.types";

export const useSceneData = (
  initializedAssets: Asset[],
  areAssetsInitialized: boolean,
  materialParams: WebGLShaderMaterialParams
): SceneData =>
  useMemo(() => {
    if (!areAssetsInitialized) return { isSceneDataInitialized: false };
    return formatToWebGL(initializedAssets, materialParams);
  }, [areAssetsInitialized]);

const formatToWebGL = (
  initializedAssets: Asset[],
  materialParams: WebGLShaderMaterialParams
) => {
  const { shaderName, uniformDefinition } = materialParams;
  const { uniforms, uniformText } = formatUniforms(uniformDefinition || []);
  const fragmentShader = formatFragmentShader(shaderName, uniformText);
  const formattedUniforms = formatAssetWithUniforms(
    uniforms,
    initializedAssets
  );
  const geometry = new PlaneGeometry(2, 2);
  return {
    isSceneDataInitialized: true,
    meshConfigs: [
      {
        materialType: MATERIAL_TYPES.INTERACTIVE_SHADER as MaterialType,
        geometry,
        materialParameters: {
          shaderType: INTERACTIVE_SHADER_TYPES.SHADER as InteractiveShaderType,
          shaders: {
            vertexShader: defaultVertex,
            fragmentShader,
          },
          uniforms: formattedUniforms,
        },
      },
    ],
  };
};

const formatAssetWithUniforms = (uniforms, assets: Asset[]) => {
  const formattedUniforms = { ...uniforms };
  assets.forEach((asset) => {
    formattedUniforms[asset.name].value = asset.data;
    if (formattedUniforms.uChannel0.value) {
      formattedUniforms.uChannel0.value.wrapS = RepeatWrapping;
      formattedUniforms.uChannel0.value.wrapT = RepeatWrapping;
    }
  });
  return formattedUniforms;
};
