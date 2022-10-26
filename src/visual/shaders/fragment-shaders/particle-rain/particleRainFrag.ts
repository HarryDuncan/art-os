export const particleRainFrag = {
  frag: `
    uniform float progress;

    uniform vec4 resolution;
    varying vec2 vUv;
    varying vec3 vPosition;
    varying float vRand;
    uniform vec3 palette;
    void main()	{
      
        float dist = length(gl_PointCoord.xy - vec2(0.5));
    
        float disc = smoothstep(0.4,.45,dist);
        if(disc>0.01) discard;
        vec3 color = palette;
       
        gl_FragColor = vec4(1.,1.,1.,vRand*0.1);
        gl_FragColor = vec4(color,0.1);
    }`,
};
