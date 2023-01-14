import { addShaderFunction } from "visual/shaders/shader-functions/addShaderFunctions";
import { noise3D } from "visual/shaders/shader-functions/noise/simplex/noise3D";

export const singleShapeFrag = {
  frag: `
    uniform sampler2D uCoverImage;
    uniform sampler2D uRevealedImage;
    uniform sampler2D uShape;
    
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
    
      uv -= vec2(0.5);
      uv *= 1. - uProgressHover * 0.03;
      uv *= uCoverImageRatio;
      uv += vec2(0.5);
    
      vec2 shapeUv = (st + mouse) * 4.;
      shapeUv *= 1.5 - (progressHover + progress) * 0.8;
      shapeUv /= progressHover;
      shapeUv += vec2(.5);
    
      vec4 shape = texture2D(uShape, shapeUv);
    
      float s = (shape.r) * 3. * (1. - progress);
      float offX = uv.x + time;
      float offY = uv.y + time * .2 + cos(time * 2.);
      float n = noise3D(vec3(offX, offY, time) * 5.) + 2.;
    
      uv_h -= vec2(0.5);
      uv_h *= 1. - progressHover * 0.05;
      uv_h *= uRevealedImageRatio;
      uv_h += vec2(0.5);
    
    
      vec4 image = texture2D(uCoverImage, uv + mouse * 0.05 * progressHover * (1. - progress));
      vec4 hover = texture2D(uRevealedImage, uv_h + mouse * 0.5 * progressHover * (1. - progress));
    
      float pct = smoothstep(.99, 1., clamp(n - s, 0., 1.) + progress);
    
      vec4 finalImage = mix(image, hover, pct);
    
      gl_FragColor = vec4(finalImage.rgb, uAlpha) ;
     
    }
    `,
};
