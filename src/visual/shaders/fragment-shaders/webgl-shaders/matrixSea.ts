import { FragmentShader } from "visual/shaders/shaders.types";

export const matrixSea: FragmentShader = {
  tags: [],
  frag: `float hash(float n) {
        return fract(sin(n)*43578.5453);
      }
      
      vec2 hash(vec2 n) {
        float m = hash(dot(n, vec2(12.23, 30.343)));
        return vec2(hash(m + 2.34), hash(m + 93.34));
      }
      
      float noise(vec2 g) {
        vec2 p = floor(g);
        vec2 f = fract(g);
        
        f = f*f*(3.0 - 2.0*f);
        float n = p.x + 57.0*p.y;
        
        float x = mix(hash(n), hash(n + 1.0), f.x);
        float y = mix(hash(n + 57.0), hash(n + 58.0), f.x);
        return mix(x, y, f.y);
      }
      
      float noise(float g) {
        float p = floor(g);
        float f = fract(g);
        
        f = f*f*(3.0 - 2.0*f);
        return mix(hash(p), hash(p + 1.0), f);
      }
      
      float voronoi(vec2 x) {
        vec2 p = floor(x);
        vec2 f = fract(x);
      
        vec2 res = vec2(8.0);
      
        for(int i = -1; i <= 1; i++)
        for(int j = -1; j <= 1; j++) {
          vec2 g = vec2(float(i), float(j));
          vec2 o = hash(p + g);
          if(i == 0)
            o = 0.5 + 0.5*sin(6.28138*o + 0.2*uTime);
          
          vec2 r = g + o - f;
      
          float d = max(abs(r.x), abs(r.y));
      
          if(d < res.x) {
            res.y = res.x;
            res.x = d;
          } else if(d < res.y) {
            res.y = d;
          }
        }
      
        return res.y - res.x;
      }
      
      vec3 formula(vec2 p) {
        p *= mat2(cos(uTime*0.1), sin(uTime*0.1), -sin(uTime*0.1), cos(uTime*0.1));
        p += vec2(uTime*0.5, sin(uTime*0.7));
        
        float v = 0.0;
        float a = 0.7, f = 1.0;
      
        for(int i = 0; i < 4; i++) {
          float v1 = voronoi(p*f + 5.0);
          float v2 = 0.0;
          
          v1 = 1.0 - smoothstep(0.0, 0.4, v1);
          v2 =  a*noise(v1*5.5 + 0.3);
      
          v += v2;
      
          f *= 1.6;
          a *= 0.55;
        }
      
        return vec3(pow(v, 6.0), pow(v, 4.0), pow(v, 2.0));
      }
      
      vec3 grey = vec3(0.9, 0.72, 0.07);
      
      vec3 cube(vec3 p, vec3 n) {
        vec3 m = pow(abs(n), vec3(10.0));
        
        vec3 x = formula(p.yz);
        vec3 y = formula(p.xz);
        vec3 z = formula(p.xy);
        
        return (m.x*x + m.y*y + m.z*z)/(m.x + m.y + m.z);
      }
      
      vec3 bump(vec2 p, float e) {
        vec2 h = vec2(e, 0.0);
        
        vec3 g = grey*mat3(
          formula(p + h) - formula(p - h),
          formula(p + h.yx) - formula(p - h.yx),
          -0.1/grey);
        
        return normalize(g);
      }
        
      void mainImage(out vec4 fragColor, in vec2 fragCoord ) {
        vec2 p = (-uResolution.xy + 4.0*fragCoord)/uResolution.y;
        
        vec3 rd = normalize(vec3(p, 1.97));
        vec3 sn = normalize(bump(p, 0.8));
        vec3 re = reflect(rd, sn);
        
        vec3 col = vec3(0);
        
        vec3 mat = formula(p);
        
        col += pow(clamp(dot(-rd, re), 0.0, 1.0), 8.0);
        col *= vec3(0.2, 0.5, 1.4)*mat.b;
        
        col += vec3(cos(uTime *0.9), sin(uTime *0.5), 0.5)*smoothstep(0.0, 2.0, sin(mat.r*mat.b));
      
        col = pow(col, vec3(1.0/2.2));
        fragColor = vec4(col, 1);
      }`,
};
