import { addShaderFunction } from "visual/shaders/shader-functions/addShaderFunctions";
import { noise3D } from "visual/shaders/shader-functions/noise/simplex/noise3D";

export const gooeyFragment = {
  frag: `
  precision highp float;
 
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
    

    ${addShaderFunction([noise3D])}
    
    float circle(in vec2 _st, in float _radius, in float blurriness){
        vec2 dist = _st;
          return 1. - smoothstep(_radius-(_radius*blurriness), _radius+(_radius*blurriness), dot(dist,dist)*4.0);
    }
    
    
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
    
      float grd = 0.1 * progressHover;

      float sqr = 100. * ((smoothstep(0., grd, uv.x) - smoothstep(1. - grd, 1., uv.x)) * (smoothstep(0., grd, uv.y) - smoothstep(1. - grd, 1., uv.y))) - 10.;
    
      float c = circle(cpos, .04 * progressHover + progress * 0.8, 2.) * 101.;
      float c2 = circle(cpos, .01 * progressHover + progress * 0.5, 2.);
    
      float offX = uv.x + sin(uv.y + time * 0.1);
      float offY = uv.y - time * .2 - cos(time * 2.) ;
      float nc = (noise3D(vec3(offX, offY, time * .5) * 8.)) * progressHover;
      float nh = (noise3D(vec3(offX, offY, time * .5 ) * 1.)) * .1;
    
      c2 = smoothstep(.1, 0.8, c2 * 5. + nc * 3. - 1.);
    
      uv_h -= vec2(0.5);
      uv_h *= 1. - uProgressHover * 0.1;
      uv_h += vec2(0.5);
    
      uv_h *= uRevealedImageRatio;
     
      uv *= uCoverImageRatio;
      vec4 image = texture2D(uCoverImage, uv);

      uv -= vec2(0.5);
      uv *= 1. - uProgressHover * 0.2;
      uv += mouse * 0.1 * uProgressHover;
      
      uv += vec2(0.5);
    
      vec4 color = vec4(1.0, 1.0, 1.00, 1.);
    
      
      vec4 hover = texture2D(uRevealedImage, uv_h + vec2(nh) * progressHover * (1. - progress));
      hover = mix(hover, color * hover, .8 * (1. - progress));
    
      float finalMask = smoothstep(.0, .1, sqr - c);
    
      image = mix(image, hover, clamp(c2 + progress, 0., 1.));
    
      gl_FragColor = vec4(image.rgb, uAlpha * finalMask);
    }
    `,
};
