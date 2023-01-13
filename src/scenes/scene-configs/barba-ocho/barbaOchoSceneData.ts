import { PlaneGeometry, Vector2, Texture } from "three";
import { SceneData } from "visual/components/interactive-scene/types";
import { InteractiveShaderTypes } from "visual/components/interactive-shaders/types";
import { formatAssetToUniform } from "visual/helpers/assets/formatAssetToUniform";
import { getTextureRatio } from "visual/helpers/assets/texture/getTextureRatio";
import { MATERIAL_TYPES } from "visual/helpers/geometry/three-geometry/types";
import { Asset } from "visual/hooks/use-assets/types";
import { shapeFrag } from "visual/shaders/fragment-shaders";
import { imageHoverVertex } from "visual/shaders/vertex-shaders";

const formatAssetsWithUniforms = (uniforms, assets: Asset[]) => {
  const updatedUniforms = formatAssetToUniform(assets, uniforms);
  updatedUniforms.uRevealedImageRatio.value = getTextureRatio(
    assets[1].data as Texture
  );
  updatedUniforms.uCoverImageRatio.value = getTextureRatio(
    assets[2].data as Texture
  );
  updatedUniforms.uOverlayTextures.value = assets.flatMap(({ data }, index) =>
    index > 1 ? data : []
  );
  return uniforms;
};

export const getBarbaOchoSceneData = (assets: Asset[]): SceneData => {
  const uniforms = {
    uAlpha: { value: 1 },
    uCoverImage: { type: "t", value: null },
    uCoverImageRatio: { value: 0 },
    uRevealedImage: { type: "t", value: null },
    uRevealedImageRatio: { value: 0 },
    uShape: { value: 0 },
    uProgressHover: { value: 1.0 },
    uProgressClick: { value: 0 },
    uOverlayIndex: { value: 0 },
    uOverlayTextures: { value: [] },
    uTime: { value: 0 },
    uSpace: { value: 0 },
    uVideo: { value: null },
    uPosition: { value: new Vector2(0, 0) },
    uResolution: {
      value: new Vector2(window.innerWidth, window.innerHeight),
    },
  };
  console.log(assets);
  const formattedUniforms = formatAssetsWithUniforms(uniforms, assets);
  const geometry = new PlaneGeometry(2, 2);
  return {
    isSceneDataInitialized: true,
    meshConfigs: [
      {
        materialType: MATERIAL_TYPES.interactive,
        geometry,
        materialParameters: {
          shaders: {
            vertexShader: imageHoverVertex,
            fragmentShader: shapeFrag,
          },
          shaderType: InteractiveShaderTypes.SHADER,
          uniforms: formattedUniforms,
        },
      },
    ],
  };
};
