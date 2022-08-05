import { addShaderFunction } from "visual/shaders/shader-functions/addShaderFunctions";
import { noise3D } from "visual/shaders/shader-functions/noise/simplex/noise3D";

export const trippyFrag = {
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
      vec2 dist = _st;
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
  
    vec2 cpos = st + mouse;
  
    float c = circle(cpos, .02 * progressHover + progress * 0.8, 2.);
  
    float offX = uv.x + sin(uv.y + time * 2.);
    float offY = uv.y - time * .2 - cos(time * 2.) * 0.1;
    float nc = (noise3D(vec3(offX, offY, time * .5) * 8.)) * progressHover;
    float nh = (noise3D(vec3(offX, offY, time * .5 ) * 2.)) * .03;
  
    uv_h -= vec2(0.5);
    uv_h *= 1. - uProgressHover * 0.1;
    uv_h += vec2(0.5);
  
    uv_h *= uRevealedImageRatio;
  
    uv -= vec2(0.5);
    uv *= 1. - uProgressHover * 0.2;
    uv *= uCoverImageRatio;
    uv += vec2(0.5);
  
    vec4 image = texture2D(uRevealedImage, uv_h);
    vec4 imageDistorted = texture2D(uCoverImage, uv + vec2(nh) * progressHover);
  
    float finalMask = smoothstep(.99, 1., pow(c, 2.) * 4. + nc * (1. - progress));
  
    vec4 finalImage = mix(imageDistorted, image, clamp(finalMask + progress, 0., 1.));
  
    gl_FragColor = vec4(finalImage.rgb, uAlpha);
  }
  `,
};
