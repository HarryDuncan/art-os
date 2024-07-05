import { EMPTY_UNIFORM_CONFIG } from "../shader-properties/uniforms/uniforms.consts";

export const fragmentEffectToEffectData = (effect) => {
  const {
    attributeConfig,
    fragName,
    requiredFunctions,
    transformation,
    uniformConfig,
    varyingConfig,
  } = effect;
  return {
    effectAttributes: attributeConfig ?? [],
    effectFragName: fragName,
    effectTransform: transformation,
    effectRequiredFunctions: requiredFunctions ?? [],
    effectUniforms: uniformConfig ?? EMPTY_UNIFORM_CONFIG,
    effectVaryings: varyingConfig ?? [],
  };
};
