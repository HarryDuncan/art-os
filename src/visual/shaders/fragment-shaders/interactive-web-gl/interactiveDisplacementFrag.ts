export const interactiveDisplacementFrag = {
  frag: `
 
   #define PI 3.14159265359
    #define MAGENTA vec3(.24, .1, .35)
    #define WHITE vec3(1.)
    #define REPETITIONS 12
    #define DELTA PI/float(REPETITIONS)
    #define THICKNESS 0.05
    #define ES .15
    #define rMat(x) mat2(cos(x), -sin(x), sin(x), cos(x))
    
    float remap(float value, float min, float max) {
        return clamp((value - min) / (max - min), 0., 1.);
    }
    
    
    float makeSignWave(vec2 st, float waveCenter, float waveLength, float addWave){
        float xSign = sign(st.x);
        float s = sin(st.x * 6. + uTime * 1. * xSign + addWave) * (.15 + pow(remap(length(st), waveCenter - waveLength, waveCenter + waveLength), 1.5) * .2);
        float curWidth = pow(4. - remap(abs(waveCenter - abs(st.x)), 0., waveLength), 1.5) * THICKNESS* (0.5+ cos(uTime));
        return (1. - smoothstep(s, s + ES, st.y - curWidth)) * smoothstep(s - ES, s, st.y + curWidth)
            * smoothstep(waveCenter - waveLength - ES, waveCenter - waveLength, abs(st.x)) * (1. - smoothstep(waveCenter + waveLength, waveCenter + waveLength + ES, abs(st.x)));
    }
    
    
    float clr(vec2 st){
        float color = 0.;
        for(int i=0; i<REPETITIONS-1; i++)
            color += makeSignWave(st, 0.2+ 1.5*sin(uTime * 0.1) + .1 * float(i), 1.0, PI/12.*float(i));
        return min(color, 1.);
    }
    
    void mainImage( out vec4 fragColor, in vec2 fragCoord )
    {
        vec2 st = fragCoord.xy/uResolution.xy*2.-1.;
        st.x *= uResolution.x/uResolution.y;
        st *= 1.2+0.1*sin(uTime);
        float color = clr(st);
        for(int i=0; i<REPETITIONS-1; i++){
            st *= rMat(DELTA);
            color += clr(st);
        }
        
        vec3 displace = mix(MAGENTA, WHITE, color)*vec3(sin(uTime*0.1),cos(uTime*0.1),sin(uTime*0.1));
        
        displace.xy *= 1.2;	
        fragColor = texture(uChannel0,st+ displace.xy);
     
    }`,
};
