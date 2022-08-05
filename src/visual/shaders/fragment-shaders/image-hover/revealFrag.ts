import { addShaderFunction } from "visual/shaders/shader-functions/addShaderFunctions";
import { noise3D } from "visual/shaders/shader-functions/noise/simplex/noise3D";

export const revealFrag = {
  frag: `
  uniform sampler2D uCoverImage;
  uniform sampler2D uRevealedImage;
  
  uniform float uTime;
  uniform float uAlpha;
  
  
  uniform vec2 uResolution;
  uniform vec2 uCoverImageRatio;
  uniform vec2 uRevealedImageRatio;
  uniform vec2 uPosition;
  uniform float uProgressHover;
  uniform float uProgressClick;
  
  varying vec2 vUv;
  ${addShaderFunction([noise3D])}
  float circle(in vec2 _st, in float _radius, in float blurriness){
      vec2 dist = _st;
      return 1. - smoothstep(_radius-(_radius*blurriness), _radius+(_radius*blurriness), dot(dist,dist)*4.0);
  }
  
  void main() {
    vec2 resolution = uResolution * PR;
    vec2 uv = vUv;
    vec2 uv_h = vUv;
    float time = uTime * 0.05;
    float progress = uProgressClick;
    float progressHover = uProgressHover;
  
    vec2 st = gl_FragCoord.xy / resolution.xy - vec2(.5);
    st.y *= resolution.y / resolution.x;
  
    vec2 mouse = vec2((uPosition.x / uResolution.x) * 2. - 1.,-(uPosition.y / uResolution.y) * 2. + 1.) * -.5;
    mouse.y *= resolution.y / resolution.x;
  
    float shape = (uv.x + uv.y - 2. + progressHover * 2.7 + progress * 2.7) * 2.;
    float offX = uv.x + uv.y;
    float offY = uv.y - uv.x;
    float n = noise3D(vec3(offX, offY, time) * 8.) * .5;
  
    float grd = 0.1 * progressHover;
  
    float sqr = 100. * ((smoothstep(0., grd, uv.x) - smoothstep(1. - grd, 1., uv.x)) * (smoothstep(0., grd, uv.y) - smoothstep(1. - grd, 1., uv.y))) - 10.;
  
    uv_h -= vec2(0.5);
    uv_h *= 1. - progressHover * 0.1;
    uv_h += vec2(0.5);
  
    uv_h *= uRevealedImageRatio;
  
    uv -= vec2(0.5);
    uv *= 1. - progressHover * 0.2;
    uv *= uCoverImageRatio;
    uv += vec2(0.5);
  
    vec2 cpos = st + mouse;
  
    float c = circle(cpos, .04 * progressHover + progress * 0.8, 2.) * 50.;
  
    vec4 image = texture2D(uCoverImage, uv);
    vec4 hover = texture2D(uRevealedImage, uv_h + mouse * 0.1 * progressHover);
  
    float pct = smoothstep(.99, 1., n + shape);
  
    float finalMask = smoothstep(.0, .1, sqr - c);
  
    vec4 finalImage = mix(image, hover, pct);
  
    gl_FragColor = vec4(finalImage.rgb, uAlpha * finalMask) ;
  }
  `,
};
