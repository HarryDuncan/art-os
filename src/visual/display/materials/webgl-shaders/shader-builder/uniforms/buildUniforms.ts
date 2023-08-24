import { SHADER_VALUE_TYPES } from "../buildShader.constants";
import { getResolution } from "./helpers/getResolution";
import { DEFAULT_UNIFORMS, UNIFORM_DECLARATION } from "./uniforms.consts";
import { DefaultUniform, UniformConfig, UniformSchema } from "./uniforms.types";

export const buildUniforms = (uniformSchema: UniformSchema) => {
  const { defaultUniforms, defaultStrings } = setUpDefaultUniforms(
    uniformSchema.defaults
  );
  const { customUniforms, customStrings } = setUpCustom(uniformSchema.custom);
  const uniforms = { ...defaultUniforms, ...customUniforms };
  const uniformDeclaration = [
    UNIFORM_DECLARATION,
    ...defaultStrings,
    ...customStrings,
  ].join(" \n ");
  return { uniforms, uniformDeclaration };
};

const setUpDefaultUniforms = (uniformSchema: DefaultUniform[]) => {
  const defaultUniforms = { uTime: { value: 0.0 } };
  const defaultStrings = [`uniform float uTime;`];
  uniformSchema.forEach((uniformKey) => {
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

const setUpCustom = (schema: UniformConfig[] = []) => {
  const customUniforms = {};
  const customStrings: string[] = [];
  schema.forEach(({ value, name, type }) => {
    switch (type) {
      case SHADER_VALUE_TYPES.FLOAT:
        customUniforms[name] = { value: value ?? 0 };
        customStrings.push(addUniformString(name, type));
        break;
      default:
        console.warn(`uniform configuration not set for ${type}`);
    }
  });
  return { customUniforms, customStrings };
};

const addUniformString = (name, type) =>
  `uniform ${type.toLowerCase()} ${name};`;

const getDefaultUniformValue = (uniformKey) => {
  switch (uniformKey) {
    case "uResolution":
      return getResolution();
    default:
      return DEFAULT_UNIFORMS[uniformKey].defaultValue;
  }
};
