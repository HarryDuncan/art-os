export const brownPlasma = {
  frag: `
    #define SPECULAR
    
    void mainImage(out vec4 col, in vec2 pc)
    {
        float time = uTime;
        vec2 a = vec2(uResolution.x /uResolution.y, 1);
        vec2 c = pc.xy / uResolution.xy * a * 4. + time * .3;
    
        float k = .1 + cos(c.y + sin(.148 - time)) + 2.4 * time;
        float w = .9 + sin(c.x + cos(.628 + time)) - 0.7 * time;
        float d = length(c);
        float s = 7. * cos(d+w) * sin(k+w);
        
        col = vec4(.5 + .5 * cos(s + vec3(.2, .5, .9)), 1);
        
        #ifdef SPECULAR
        col *= vec4(1, .7, .4, 1) 
            *  pow(max(normalize(vec3(length(dFdx(col)), length(dFdy(col)), .5/uResolution.y)).z, 0.), 2.)
            + .75; 
        #endif
    }`,
};
