export const wind = {
  frag: `// Code by Flopine

    // Thanks to wsmind, leon, XT95, lsdlive, lamogui, 
    // Coyhot, Alkama,YX, NuSan and slerpy for teaching me
    
    // Thanks LJ for giving me the spark :3
    
    // Thanks to the Cookie Collective, which build a cozy and safe environment for me 
    // and other to sprout :)  https://twitter.com/CookieDemoparty
    
    // Shader made for Everyday ATI challenge
    
    #define TAU 6.2831853071
    #define dt mod(uTime,TAU)
    
    mat2 rot (float a)
    {return mat2(cos(a),sin(a),-sin(a),cos(a));}
    
    void moda(inout vec2 p, float rep)
    {
        float per = TAU/rep;
        float a = mod(atan(p.y,p.x), per)-per*0.5;
        p = vec2(cos(a),sin(a))*length(p);
    }
    
    void mo (inout vec2 p, vec2 d)
    {
        p = abs(p)-d;
        if (p.y>p.x) p = p.yx;
    }
    
    float cyl (vec3 p, float r, float h) 
    {
        return max(length(p.xy)-r,abs(p.z)-h);
    }
    
    float prim1 (vec3 p)
    {
        float width = 0.05;
        p.xz *= rot(p.y*8.); 
        mo(p.xz, vec2(0.1)); 
        moda(p.xz, 5.);
        p.x -= width*2.5;
        return cyl(p.xzy, width, 6.);
    }
    
    float SDF (vec3 p)
    {
        p.yz *= rot(TAU/4.);
        p.xz *= rot(sin(p.y*1.5+dt));    
        mo(p.xz, vec2(.7));
        moda(p.xz, 6.);
        p.x -= 0.1+(p.y+3.);
        return prim1(p);
    }
    
    void mainImage( out vec4 fragColor, in vec2 fragCoord )
    {
        vec2 uv = (2.*fragCoord-uResolution.xy)/uResolution.y;
    
        vec3 ro = vec3(uv*4.,-20.),
            rd = vec3(0.,0.,1.),
            p = ro,
            col = vec3(0.);
    
        float shad,d=0.;
        bool hit = false;
    
        for (float i=0.; i<64.;i++)
        {
            d = SDF(p);
            if (d<0.01)
            {
                hit = true;
                shad = i/64.;
                break;
            }
            p += d*rd*0.3;
        }
    
        if (hit)
        {
            col = vec3(smoothstep(0.7,0.8,1.-shad));
        }
        // Output to screen
        fragColor = vec4(sqrt(col),1.0);
    }`,
};
