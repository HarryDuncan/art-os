import { Asset } from "visual/set-up/assets/asset.types";
import { AssetMap, ShaderConfig } from "../shaders.types";
import { importShader } from "./importShader";

export const configureShaders = (
  shaderConfig: ShaderConfig,
  uniforms: Record<string, unknown>,
  assets?: Asset[]
) => {
  const { shaderId, fragmentShaderId, vertexShaderId, assetMapping } =
    shaderConfig;
  const { fragmentShader, vertexShader, defaultUniforms } = importShader(
    shaderId,
    vertexShaderId,
    fragmentShaderId
  );

  const configuredUniforms = defaultUniforms(uniforms);
  mapAssets(configuredUniforms, assetMapping ?? [], assets ?? []);
  // TODO - return default shaders and log that the shader ids didn't work
  return { fragmentShader, vertexShader, configuredUniforms };
};

const mapAssets = (
  uniforms: Record<string, unknown>,
  assetMapping: AssetMap[],
  assets: Asset[]
) => {
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
    return texture;
  }
  console.warn(`no mapped asset found for ${assetMapping.assetId}`);
};
