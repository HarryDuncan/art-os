import { shaderSafeFloat } from "visual/utils/conversion/shaderConversions";
import { MaterialEffectProps } from "../../../../types";
import { getOpacity } from "./matcap-functions/getOpacity";

export const matcapTransform = (
  fragName: string,
  _previousFragName: string,
  matcapEffectProps: MaterialEffectProps
) => {
  // const {transform} = getEffectData()
  // vec3 newNormal = calculateNormal(vPosition);
  // vec3 x = normalize( vec3( vEye.z, 0.0, - vEye.x ) );
  // vec3 y = cross( vEye, x );
  // vec2 uv = vec2( dot( x, newNormal ), dot( y, newNormal ) ) * 0.495 + 0.5;
  // vec4 matcapColor = texture2D(uMaterial, uv);
  // vec4 ${fragName} = vec4( matcapColor.rgb, 0.0);`;
  const transform = `

    vec3 eyeDirection = normalize(vEye);
    vec3 normal = normalize(vNormal);
    vec3 reflection = reflect(eyeDirection, normal);
    float m = 2.8284271247461903 * sqrt(reflection.z + 1.0);
    vec2 matcapUV = reflection.xy / m + 0.5;
    vec4 matcapColor = texture2D(uMaterial, matcapUV);
      vec4 ${fragName} = vec4( matcapColor.rgb, 1.0);`;

  return { transform };
};
