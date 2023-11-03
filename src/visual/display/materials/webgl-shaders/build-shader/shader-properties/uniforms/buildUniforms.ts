import { PROPERTY_TYPES } from "../../buildShader.constants";
import { PropertyType } from "../../buildShader.types";
import { setUpCustomPropertyValues } from "../../helpers/getShaderPropertyValues";
import { getResolution } from "./helpers/getResolution";
import { DEFAULT_UNIFORMS, UNIFORM_DECLARATION } from "./uniforms.consts";
import {
  DefaultUniform,
  UniformConfig,
  UniformValueConfig,
} from "./uniforms.types";

export const buildUniforms = (uniformConfig: UniformConfig) => {
  const { defaultUniforms, defaultStrings } = setUpDefaultUniforms(
    uniformConfig.defaultUniforms
  );
  const { customUniforms, customStrings } = setUpCustom(
    uniformConfig?.customUniforms
  );
  const uniforms = { ...defaultUniforms, ...customUniforms };
  const uniformDeclaration = [
    UNIFORM_DECLARATION,
    ...defaultStrings,
    ...customStrings,
  ].join(" \n ");
  return { uniforms, uniformDeclaration };
};

const setUpDefaultUniforms = (uniformConfig: DefaultUniform[]) => {
  const defaultUniforms = { uTime: { value: 0.0 } };
  const defaultStrings = [`uniform float uTime;`];
  uniformConfig.forEach((uniformKey) => {
    const defaultUniform = DEFAULT_UNIFORMS[uniformKey];
    if (!defaultUniform) {
      console.warn(`uniform configuration not set for ${uniformKey}`);
    } else {
      const uniformString = `uniform ${defaultUniform.valueType} ${uniformKey};`;
      const uniformValue = getDefaultUniformValue(uniformKey);
      defaultUniforms[uniformKey] = { value: uniformValue };
      defaultStrings.push(uniformString);
    }
  });
  return { defaultUniforms, defaultStrings };
};

const setUpCustom = (config: UniformValueConfig[] = []) => {
  const { customProperties, customStrings } = setUpCustomPropertyValues(
    config,
    PROPERTY_TYPES.UNIFORM as PropertyType
  );
  return { customUniforms: customProperties, customStrings };
};

const getDefaultUniformValue = (uniformKey) => {
  switch (uniformKey) {
    case "uResolution":
      return getResolution();
    default:
      return DEFAULT_UNIFORMS[uniformKey].defaultValue;
  }
};
