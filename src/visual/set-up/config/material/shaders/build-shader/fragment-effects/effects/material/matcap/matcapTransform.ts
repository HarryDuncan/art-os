import { MaterialEffectProps } from "../../../../types";

export const matcapTransform = (
  fragName: string,
  _previousFragName: string,
  matcapEffectProps: MaterialEffectProps
) => {
  const { opacity } = matcapEffectProps;
  const transform = `
        vec3 newNormal = calculateNormal(vPosition);
        vec3 x = normalize( vec3( vEye.z, 0.0, - vEye.x ) );
        vec3 y = cross( vEye, x );
        vec2 uv = vec2( dot( x, newNormal ), dot( y, newNormal ) ) * 0.495 + 0.5; 
        vec4 matcapColor = texture2D(uMaterial, uv);
        vec4 ${fragName} = vec4( matcapColor.rgb, ${getOpacity(!!opacity)});`;

  return { transform };
};
