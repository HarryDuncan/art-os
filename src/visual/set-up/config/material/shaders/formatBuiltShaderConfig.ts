import { Asset } from "visual/set-up/assets/asset.types";
import { MaterialConfigProps } from "../materials.types";
import { BuiltShaderConfig } from "./build-shader/buildShader.types";

export const formatBuiltShaderConfig = (
  materialProperties: MaterialConfigProps,
  parsedConfig: Partial<BuiltShaderConfig>,
  assets: Asset[]
) => {
  console.warn(materialProperties, parsedConfig, assets);
};
