import { calculateNormal } from "visual/display/materials/webgl-shaders/shader-functions";
import { ShaderPropertyValueTypes } from "../../../../buildShader.consts";
import {
  DefaultUniform,
  FragmentEffectData,
  MaterialEffectProps,
  VaryingConfig,
} from "../../../../buildShader.types";
import { FRAGMENT_COLOR_NAMES } from "../../../fragmentEffects.consts";
import { VARYING_TYPES } from "../../../../shader-properties/varyings/varyings.consts";
import { matcapFunction } from "visual/display/materials/webgl-shaders/shader-functions/matcap";

const getCustomUniforms = () => [
  {
    id: "uLightDir",
    valueType: ShaderPropertyValueTypes.VEC2,
  },
];

const getVaryings = () =>
  [
    {
      id: "vEye",
      varyingType: VARYING_TYPES.DEFAULT,
      valueType: ShaderPropertyValueTypes.VEC3,
    },
    {
      id: "vPosition",
      varyingType: VARYING_TYPES.DEFAULT,
      valueType: ShaderPropertyValueTypes.VEC3,
    },
    {
      id: "vNormal",
      varyingType: VARYING_TYPES.DEFAULT,
      valueType: ShaderPropertyValueTypes.VEC3,
    },
    {
      id: "vUv",
      varyingType: VARYING_TYPES.DEFAULT,
      valueType: ShaderPropertyValueTypes.VEC2,
    },
  ] as VaryingConfig[];

const getOpacity = (opacity?: boolean | undefined) => {
  if (opacity) {
    return `matcapColor.a * opacity`;
  }
  return `matcapColor.a`;
};
export const simpleMatcap = (
  _previousFragName: string,
  fragmentEffects: Partial<MaterialEffectProps> | undefined
): FragmentEffectData => {
  const fragName = FRAGMENT_COLOR_NAMES.MATERIAL;
  const uniformConfig = {
    defaultUniforms: ["uMaterial", "uResolution"] as DefaultUniform[],
    customUniforms: getCustomUniforms(),
  };
  const varyingConfig = getVaryings();
  const transformation = `
    vec3 newNormal = calculateNormal(vPosition);
    vec3 x = normalize( vec3( vEye.z, 0.0, - vEye.x ) );
    vec3 y = cross( vEye, x );
    vec2 uv = vec2( dot( x, newNormal ), dot( y, newNormal ) ) * 0.495 + 0.5; 
    vec4 matcapColor = texture2D(uMaterial, uv);
    vec4 ${fragName} = vec4( matcapColor.rgb, ${getOpacity(
    !!fragmentEffects?.opacity
  )});`;

  return {
    requiredFunctions: [
      { id: "calculateNormal", functionDefinition: calculateNormal },
      { id: "matcap", functionDefinition: matcapFunction },
    ],
    uniformConfig,
    transformation,
    varyingConfig,
    attributeConfig: [],
    fragName,
  };
};
