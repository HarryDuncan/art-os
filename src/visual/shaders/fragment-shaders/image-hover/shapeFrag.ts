import { addShaderFunction } from "visual/shaders/shader-functions/addShaderFunctions";
import { noise3D } from "visual/shaders/shader-functions/noise/simplex/noise3D";

export const shapeFrag = {
  frag: `
    uniform sampler2D uCoverImage;
    uniform sampler2D uRevealedImage;
    uniform sampler2D uShape;
    
    uniform float uTime;
    uniform float uAlpha;
    uniform sampler2D uOverlayTextures[11];
    uniform sampler2D uCoverVideo;
    uniform int uOverlayIndex;
    uniform vec2 uResolution;
    uniform vec2 uCoverImageRatio;
    uniform vec2 uRevealedImageRatio;
    uniform vec2 uPosition;
    uniform float uProgressHover;
    uniform float uProgressClick;
    uniform float uSpace;
    varying vec2 vUv;
    
    ${addShaderFunction([noise3D])}
    vec4 getTexture(int index, vec2 coords){
      
      if(index == 0){
        return texture2D(uOverlayTextures[0], coords);
      }
      if(index == 1){
        return texture2D(uOverlayTextures[1], coords);
      }
      if(index == 2){
        return texture2D(uOverlayTextures[2], coords);
      }
      if(index == 3){
        return texture2D(uOverlayTextures[3], coords);
      }
      if(index == 4){
        return texture2D(uOverlayTextures[4], coords);
      }
      if(index == 5){
        return texture2D(uOverlayTextures[5], coords);
      }
      if(index == 6){
        return texture2D(uOverlayTextures[6], coords);
      }
      if(index == 7){
        return texture2D(uOverlayTextures[7], coords);
      }
      if(index == 8){
        return texture2D(uOverlayTextures[8], coords);
      }
      if(index == 9){
        return texture2D(uOverlayTextures[9], coords);
      }
      if(index == 10){
        return texture2D(uOverlayTextures[10], coords);
      }
      return texture2D(uOverlayTextures[0], coords);
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
    
      uv -= vec2(0.5);
      uv *= 1. - uProgressHover * 0.03;
      uv *= uCoverImageRatio;
      uv += vec2(0.5);
    
      vec2 shapeUv = (st + mouse) * 4.;
      shapeUv *= 1.5 - (progressHover + progress) * 0.8;
      shapeUv /= progressHover;
      shapeUv += vec2(.5);
    
      vec4 shape = texture2D(uShape, shapeUv);
    
      float s = (shape.r) * 2. * (1. - progress);
      float offX = uv.x + (time * 0.03) ;
      float offY = uv.y * 3.5 + time * .8 + cos(time * 1.83) + 4.;
      float n = noise3D(vec3(offX, offY, time * 0.3) * 4.) + (2.4 + uSpace);
    
      uv_h -= vec2(0.5);
      uv_h *= 1. - progressHover * 0.05;
      uv_h *= uRevealedImageRatio;
      uv_h += vec2(0.5);
      int index = 1;
      vec2 coords = uv + mouse * 0.05 * progressHover * (1. - progress);
      vec4 image = texture2D(uRevealedImage, coords);
      vec4 hover = texture2D( uCoverVideo, uv_h + mouse * 0.5 * progressHover * (1. - progress));
    
      float pct = smoothstep(.99, 1., clamp(n - s, 0., 5.) + progress);
    
      vec4 finalImage = mix(image, hover, pct);
    
      gl_FragColor = vec4(finalImage.rgb, uAlpha) ;
     
    }
    `,
};
