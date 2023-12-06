import { removeDuplicatesByKey } from "visual/utils/removeDuplicatesByKey";
import { AttributeConfig } from "../../../buildShader.types";

export const mergeAttributeConfigs = (
  attributeConfig: AttributeConfig[][]
): AttributeConfig[] => {
  const mergedConfigs = attributeConfig.flatMap((config) => config);
  const uniqueConfigs = removeDuplicatesByKey(mergedConfigs, "id");
  return uniqueConfigs as AttributeConfig[];
};
