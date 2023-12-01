import { removeDuplicatesByKey } from "visual/utils/removeDuplicatesByKey";
import { VaryingConfig } from "../varyings.types";

export const mergeVaryingConfigs = (varyingConfigArray: VaryingConfig[]) => {
  const mergedConfigs = varyingConfigArray.flatMap((config) => config);
  const uniqueConfigs = removeDuplicatesByKey(mergedConfigs, "id");
  return uniqueConfigs;
};
