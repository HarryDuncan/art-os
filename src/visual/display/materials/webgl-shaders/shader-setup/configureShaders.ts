import { Asset } from "visual/set-up/assets/use-assets/types";
import { AssetMap, ShaderConfig } from "../shaders.types";
import { importShader } from "./importShader";

export const configureShaders = (
  shaderConfig: ShaderConfig,
  uniforms,
  assets?: Asset[]
) => {
  const { shaderId, assetMapping } = shaderConfig;
  const { fragmentShader, vertexShader, defaultUniforms } = importShader(
    shaderId
  );

  const configuredUniforms = defaultUniforms(uniforms);
  mapAssets(configuredUniforms, assetMapping ?? [], assets ?? []);
  // TODO - return default shaders and log that the shader ids didn't work
  return { fragmentShader, vertexShader, configuredUniforms };
};

const mapAssets = (uniforms, assetMapping: AssetMap[], assets: Asset[]) => {
  if (assetMapping) {
    assetMapping.forEach((mapping) => {
      const mappedAsset = getMappedAsset(mapping, assets);
      if (mappedAsset) {
        uniforms[mapping.uniform] = { value: mappedAsset };
      }
    });
  }
  return uniforms;
};

const getMappedAsset = (assetMapping: AssetMap, assets: Asset[]) => {
  const mappedAsset = assets.find((asset) => asset.id === assetMapping.assetId);
  if (mappedAsset && mappedAsset.data) {
    const texture = mappedAsset.data;
    console.log(texture);
    return texture;
  }
  console.warn(`no mapped asset found for ${assetMapping.assetId}`);
};
