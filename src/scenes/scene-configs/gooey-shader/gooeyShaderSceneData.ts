import { PlaneGeometry, Vector2, Texture } from "three";
import { SceneData } from "visual/components/interactive-scene/types";
import { InteractiveShaderTypes } from "visual/components/interactive-shaders/types";
import { getTextureRatio } from "visual/helpers/assets/texture/getTextureRatio";
import { FormattedGeometryType } from "visual/helpers/geometry/three-geometry/types";
import { Asset } from "visual/hooks/use-assets/types";
import { gooeyFragment } from "visual/shaders/fragment-shaders";
import { imageHoverVertex } from "visual/shaders/vertex-shaders";

const formatAssetsWithUniforms = (uniforms, assets: Asset[]) => {
  assets.forEach((asset) => {
    uniforms[asset.name].value = asset.data;
  });
  uniforms.uCoverImageRatio.value = getTextureRatio(assets[0].data as Texture);
  uniforms.uRevealedImageRatio.value = getTextureRatio(
    assets[1].data as Texture
  );
  return uniforms;
};

export const getGooeyShaderSceneData = (assets: Asset[]): SceneData => {
  const uniforms = {
    uAlpha: { value: 1 },
    uCoverImage: { type: "t", value: null },
    uCoverImageRatio: { value: 0 },
    uRevealedImage: { type: "t", value: null },
    uRevealedImageRatio: { value: 0 },
    uShape: { value: 0 },
    uProgressHover: { value: 1.0 },
    uProgressClick: { value: 0 },
    uTime: { value: 0 },
    uPosition: { value: new Vector2(0, 0) },
    uResolution: {
      value: new Vector2(window.innerWidth, window.innerHeight),
    },
  };
  const formattedUniforms = formatAssetsWithUniforms(uniforms, assets);
  const geometry = new PlaneGeometry(2, 2);
  return {
    isSceneDataInitialized: true,
    geometries: [
      {
        geometryType: FormattedGeometryType.interactive,
        geometry,
        materialParameters: {
          shaders: {
            vertexShader: imageHoverVertex,
            fragmentShader: gooeyFragment,
          },
          shaderType: InteractiveShaderTypes.SHADER,
          uniforms: formattedUniforms,
        },
      },
    ],
  };
};
