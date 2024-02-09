import { IUniform, Vector2 } from "three";
import { mapAssetsToUniforms } from "visual/display/materials/webgl-shaders/shader-setup/mapAssetsToUniforms";
import { AssetMap } from "visual/display/materials/webgl-shaders/shaders.types";
import { Asset } from "visual/set-up/assets/asset.types";
import { UniformObject } from "../build-shader/buildShader.types";

export const formatBuiltShaderUniforms = (
  uniforms: UniformObject,
  assetMapping: AssetMap[],
  assets: Asset[]
): { [uniform: string]: IUniform<unknown> } => {
  const mappedUniforms = mapAssetsToUniforms(assetMapping, assets, uniforms);
  const formattedUniforms = formatDefaultShaderValues(mappedUniforms);
  return formattedUniforms;
};

const formatDefaultShaderValues = (uniforms: UniformObject) => {
  if (uniforms.uResolution) {
    uniforms.uResolution = {
      value: new Vector2(window.innerWidth, window.innerHeight).multiplyScalar(
        window.devicePixelRatio
      ),
    };
  }
  return uniforms;
};
