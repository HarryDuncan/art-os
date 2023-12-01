import { removeDuplicatesByKey } from "visual/utils/removeDuplicatesByKey";
import {
  ShaderPropertyConfig,
  UniformConfig,
} from "../../../buildShader.types";
import { EMPTY_UNIFORM_CONFIG } from "../uniforms.consts";

export const mergeUniformConfigs = (uniformConfigArray: UniformConfig[]) => {
  const mergedUniformConfig = { ...EMPTY_UNIFORM_CONFIG } as UniformConfig;
  uniformConfigArray.forEach(({ defaultUniforms, customUniforms }) => {
    const {
      defaultUniforms: currentDefaults,
      customUniforms: currentCustom,
    } = mergedUniformConfig;
    const updatedDefaults = [...currentDefaults, ...defaultUniforms].filter(
      (value, index, self) => self.indexOf(value) === index
    );
    mergedUniformConfig.defaultUniforms = updatedDefaults;
    mergedUniformConfig.customUniforms = mergeCustomUniforms(
      currentCustom,
      customUniforms
    );
  });
  return mergedUniformConfig;
};

const mergeCustomUniforms = (
  currentCustomUniforms: ShaderPropertyConfig[] = [],
  addedCustomUniforms: ShaderPropertyConfig[] = []
) => {
  const customUniforms = currentCustomUniforms || [];
  const uniformsToBeMerged = addedCustomUniforms || [];
  return removeDuplicatesByKey(
    [...customUniforms, ...uniformsToBeMerged],
    "id"
  ) as ShaderPropertyConfig[];
};
