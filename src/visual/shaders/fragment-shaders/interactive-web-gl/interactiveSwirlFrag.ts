export const interactiveSwirlFrag = {
  frag: `


    #define TAU (2.0*3.1415926535)
  

    // Kaufmann vortex
    // https://en.wikipedia.org/wiki/Kaufmann_(Scully)_vortex
    void mainImage( out vec4 fragColor, in vec2 fragCoord )
    {
        vec2 uv = (2.0*fragCoord - uResolution.xy) / uResolution.y;
        vec3 col;
        
        // Velocity profile in the vortex is assumed to be:
        //           v_theta = r / (r0^2 + r^2)
        
        // Compute the initial position of the particle currently at (x,y)
        // by integrating back to initial time.
        float r0 = tan(uTime * 0.2);
        float r = length(uv);
        float th = atan(uv.y, uv.x);
        
        float r_i = r;
        float th_i = th - uTime/(r0*r0 + r*r);
        vec2 uv_i = r_i * cos(th_i + vec2(0,TAU/4.));
        
        // Also compute a Lipschitz bound on the deformation,
        // for antialiasing
        float dr = 1.0;
        float dth = 1.0/r;
        float dr_i = dr;
        float dth_i = dth + 2.*uTime*r/pow(r0*r0+r*r, 2.0);
        float duv_i = r_i*dth_i + dr_i;
        
        col = texture2D(uChannel0, uv_i).rgb;
        // Draw the deformation of lines
        
        // {
        //     float scale = 0.2;
        //     float y0 = scale * (floor(uv_i.y/scale) + 0.5);
        //     float f = abs(uv_i.y - y0);
        //     col = mix(col, 0.5+0.5*sin(0.5*TAU*(y0+vec3(0.,0.4,0.5))),
        //               smoothstep(duv_i*length(fwidth(uv)), 0.0, f));   
        // }
        // {
        //     float scale = 0.2;
        //     float x0 = scale * (floor(uv_i.x/scale) + 0.5);
        //     float f = abs(uv_i.x - x0);
        //     col = mix(col, 0.5+0.5*sin(0.5*TAU*(x0+vec3(0.4,0.4,0.8))),
        //               smoothstep(duv_i*length(fwidth(uv)), 0.0, f));   
        // }
        
       // col = vec3(col, 0);
        
        fragColor = vec4(col,1.0);
    }`,
};
