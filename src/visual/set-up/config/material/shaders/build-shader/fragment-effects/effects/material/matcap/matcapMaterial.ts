import {
  calculateNormal,
  diffuseFactor,
} from "visual/display/materials/webgl-shaders/shader-functions";
import { ShaderPropertyValueTypes } from "../../../../buildShader.constants";
import {
  DefaultUniform,
  FragmentEffectData,
  MaterialEffectProps,
  ShaderFunction,
  VaryingConfig,
} from "../../../../buildShader.types";
import { FRAGMENT_COLOR_NAMES } from "../../../fragmentEffects.consts";
import { VARYING_TYPES } from "../../../../shader-properties/varyings/varyings.consts";

const getCustomUniforms = () => [
  {
    id: "uLightDir",
    valueType: ShaderPropertyValueTypes.VEC2,
  },
];

const getRequiredFunctions = () =>
  [
    { id: "diffuseFactor", functionDefinition: diffuseFactor },
    { id: "calculateNormal", functionDefinition: calculateNormal },
  ] as ShaderFunction[];

const getVaryings = () =>
  [
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
  ] as VaryingConfig[];

const getOpacity = (opacity?: boolean | undefined) => {
  if (opacity) {
    return `finalFrag.a * opacity`;
  }
  return `finalFrag.a`;
};
export const matcapMaterial = (
  _transformColorName: string,
  fragmentEffects: Partial<MaterialEffectProps> | undefined
): FragmentEffectData => {
  const fragmentColorName = FRAGMENT_COLOR_NAMES.MATERIAL;
  const uniformConfig = {
    defaultUniforms: ["uMaterial", "uResolution"] as DefaultUniform[],
    customUniforms: getCustomUniforms(),
  };
  const varyingConfig = getVaryings();
  const transformation = `
  vec3 newNormal = calculateNormal(vPosition);
  vec3 viewDir = normalize(-vPosition.xyz);
  vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
  vec3 y = cross( viewDir, x );
  vec2 uv = vec2( dot( x, newNormal ), dot( y, newNormal ) ) * 0.495 + 0.5; 
  vec4 uMaterialTex = texture2D(uMaterial, uv);
  float minResolution = min(uResolution.x, uResolution.y);
  vec3 lightDirection = -vec3((uLightDir - 0.5 * uResolution) / minResolution, 0.25);
  vec3 surfaceColor = vec3(1.0, 0.5, 0.4);
  float curvature = 5.0 - abs(dot(normalize(vNormal), normalize(vec3(0.0, 0.0, 1.0))));
  vec3 finalColor = mix(surfaceColor, vec3(1.0), curvature);
  vec4 finalFrag = mix(uMaterialTex,vec4( finalColor, 1.0), 0.0);
  vec4 ${fragmentColorName} = vec4(finalFrag.rgb, ${getOpacity(
    fragmentEffects?.opacity
  )});`;
  const requiredFunctions = getRequiredFunctions();
  return {
    requiredFunctions,
    uniformConfig,
    transformation,
    varyingConfig,
    attributeConfig: [],
    fragmentColorName,
  };
};
