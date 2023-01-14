export const textureDistortionFrag = {
  frag: `

    uniform float uTime;
    uniform float progress;
    uniform sampler2D uDataTexture;
    uniform sampler2D uTexture;
    
    
    uniform vec4 uResolution;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main()	{
        vec2 newUV = (vUv - vec2(0.5))*uResolution.zw + vec2(0.5);
        vec4 color = texture2D(uTexture,newUV);
        vec4 offset = texture2D(uDataTexture,vUv);
        gl_FragColor = vec4(vUv,0.0,1.);
        gl_FragColor = vec4(offset.r,0.,0.,1.);
        gl_FragColor = color;
        gl_FragColor = texture2D(uTexture,newUV - 0.02*offset.rg);
        // gl_FragColor = offset;
    
    }`,
};
