import {
  InstancedBufferGeometry,
  LinearFilter,
  RGBFormat,
  Texture,
} from "three";
import { Asset } from "visual/hooks/use-assets/types";

export const interactiveParticlesFormatting = (
  assets: Asset[],
  uniforms
): { geometry; uniforms } => {
  const geometry = new InstancedBufferGeometry();
  assets.forEach((asset) => {
    if (asset.data) {
      getTextureFeatures(asset.data as Texture);
    }
  });
  return { geometry, uniforms };
};

const getTextureFeatures = (loadedTexture: Texture) => {
  loadedTexture.minFilter = LinearFilter;
  loadedTexture.magFilter = LinearFilter;
  loadedTexture.format = RGBFormat;
};
