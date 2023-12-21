import { EMPTY_UNIFORM_CONFIG } from "../../../shader-properties/uniforms/uniforms.consts";
import { FRAGMENT_COLOR_NAMES } from "../../fragmentEffects.consts";

export const getInteractiveEffects = (effectProps, transformName) => {
  const fragmentColorName = FRAGMENT_COLOR_NAMES.INTERACTIVE;
  const transformation = `
        vec4 ${fragmentColorName} = ${transformName};
        if(vAffected == 1.0){
            ${fragmentColorName} = mix(${fragmentColorName}, vec4(0.0,1.0,1.0,opacity), 0.5);
        }
    `;
  return {
    requiredFunctions: [],
    uniformConfig: EMPTY_UNIFORM_CONFIG,
    transformation,
    varyingConfig: [],
    attributeConfig: [],
    fragmentColorName,
  };
};
