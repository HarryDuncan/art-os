export const cosmic = {
  tags: [],
  frag: `
   
    #define TWO_PI 6.28318530718
    
    #define resolution uResolution.xy
    #define size 0.0240525
    #define lineSize 0.24540144
    #define blur 0.227794
    #define grid 9.510933
    #define morph 5.2208757
    #define delayAmount 3.223359
    #define delay2 6.429779
    #define speed 0.39144516
    
    float impulse( float k, float x )
    {
        float h = k*x;
        return h*exp(1.0-h);
    }
    
    float plot(float dis){
       float pct = smoothstep(dis,dis+blur,0.5)-smoothstep(lineSize+dis,lineSize+dis+blur,0.5);     
      return   pct ;
    }
    
    
    vec3 rgb2hsb( in vec3 c ){
        vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
        vec4 p = mix(vec4(c.bg, K.wz),
                     vec4(c.gb, K.xy),
                     step(c.b, c.g));
        vec4 q = mix(vec4(p.xyw, c.r),
                     vec4(c.r, p.yzx),
                     step(p.x, c.r));
        float d = q.x - min(q.w, q.y);
        float e = 1.0e-10;
        return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)),
                    d / (q.x + e),
                    q.x);
    }
    

    vec3 hsb2rgb( in vec3 c ){
        vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                                 6.0)-3.0)-1.0,
                         0.0,
                         1.0 );
        rgb = rgb*rgb*(3.0-2.0*rgb);
        return c.z * mix(vec3(1.0), rgb, c.y);
    }
    
    void mainImage( out vec4 fragColor, in vec2 fragCoord )
    {
         vec2 res = vec2(0);
        res.x = resolution.x*0.5625;
        res.y = resolution.y;
        
       vec2 st = gl_FragCoord.xy/res;
     st.x -= 0.35;
      float d = 0.0;
    
      // Remap the space to -1. to 1.
      st = st *2.-1.;
      
      // Number of sides of your shape
      int N = 9;
    
      // Angle and radius from the current pixel
      vec3 colorNew = vec3(0);
      
      for(int i=0;i<5;i++) {
          
          float m = (float(i)/5.);
          st.y += size*m*sin(uTime/3.);
          float a = atan(st.x,st.y)+PI+(morph*m) + (0.03*m * sin(uTime));
          float r = TWO_PI/float(N);
          
          d = cos(floor(.5+a/r)*r-a )*length(st);
          d = impulse(d,delayAmount);
          vec3 color = vec3(0.0);
          float check = delay2 * (1.-length(st));
          color.r = plot(fract(d*grid - check + uTime*speed));
          color.g = plot(fract(d*grid - check + uTime*speed*0.8));
          color.b = plot(fract(d*grid - check + uTime*speed*0.6));
          colorNew+= ( color*m );
        }
        
        
     
       vec3 hue = rgb2hsb(colorNew);
        hue.x = tan(uTime * 0.6);
        hue.y = 0.5;
        hue.y = 0.5;
        fragColor = vec4( hsb2rgb(hue)-colorNew*0.2 ,1.);
    
      
    }
    
    
    `,
};
