import { addShaderFunction } from "visual/shaders/shader-functions/addShaderFunctions";
import { noise3D } from "visual/shaders/shader-functions/noise/simplex/noise3D";

export const waveFrag = {
  frag: `
  
uniform sampler2D uCoverImage;
uniform sampler2D uRevealedImage;

uniform float uAlpha;
uniform float uTime;
uniform float uProgressHover;
uniform float uProgressClick;

uniform vec2 uResolution;
uniform vec2 uPosition;
uniform vec2 uCoverImageRatio;
uniform vec2 uRevealedImageRatio;

varying vec2 vUv;

float circle(in vec2 _st, in float _radius, in float blurriness){
    vec2 dist = _st - vec2(0.5);
	  return 1. - smoothstep(_radius-(_radius*blurriness), _radius+(_radius*blurriness), dot(dist,dist)*4.0);
}

${addShaderFunction([noise3D])}
void main() {
  vec2 resolution = uResolution * PR;
  float time = uTime * 0.05;
  float progress = uProgressClick;
  float progressHover = uProgressHover;
  vec2 uv = vUv;
  vec2 uv_h = vUv;


  vec2 st = gl_FragCoord.xy / resolution.xy - vec2(.5);
  st.y *= resolution.y / resolution.x;

  vec2 mouse = vec2((uPosition.x / uResolution.x) * 2. - 1.,-(uPosition.y / uResolution.y) * 2. + 1.) * -.5;
  mouse.y *= resolution.y / resolution.x;


  float offX = uv.x * .3 - time * 0.3;
  float offY = uv.y + sin(uv.x * 5.) * .1 - sin(time * 0.5) + noise3D(vec3(uv.x, uv.y, time) * 0.5);
  offX += noise3D(vec3(offX, offY, time) * 5.) * .3;
  offY += noise3D(vec3(offX, offX, time * 0.3)) * .1;
  float nc = (noise3D(vec3(offX, offY, time * .5) * 8.)) * progressHover;
  float nh = (noise3D(vec3(offX, offY, time * .5 ) * 2.)) * .03;

  nh *= smoothstep(nh, 0.5, 0.6);

  uv_h -= vec2(0.5);
  uv_h *= uRevealedImageRatio;
  uv_h += vec2(0.5);

  uv -= vec2(0.5);
  uv *= uCoverImageRatio;
  uv += vec2(0.5);

  vec4 image = texture2D(uCoverImage, uv_h + vec2(nc + nh) * progressHover);
  vec4 hover = texture2D(uRevealedImage, uv + vec2(nc + nh) * progressHover * (1. - progress));

  vec4 finalImage = mix(image, hover, clamp(nh * (1. - progress) + progressHover, 0., 1.));

  gl_FragColor = vec4(finalImage.rgb, uAlpha);
}

  `,
};
