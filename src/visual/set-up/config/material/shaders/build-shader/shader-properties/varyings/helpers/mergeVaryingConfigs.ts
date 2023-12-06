import { removeDuplicatesByKey } from "visual/utils/removeDuplicatesByKey";
import { VaryingConfig } from "../../../buildShader.types";

export const mergeVaryingConfigs = (
  varyingConfigArray: VaryingConfig[][]
): VaryingConfig[] => {
  const mergedConfigs = varyingConfigArray.flatMap((config) => config);
  const uniqueConfigs = removeDuplicatesByKey(mergedConfigs, "id");
  return uniqueConfigs as VaryingConfig[];
};
