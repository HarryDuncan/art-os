export const interactiveParticlesVertex = {
  vert: `
    float rand(vec2 n) { 
        return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
    }
    
    float noise(vec2 p){
        vec2 ip = floor(p);
        vec2 u = fract(p);
        u = u*u*(3.0-2.0*u);
        
        float res = mix(
            mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
            mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
        return res*res;
    }
    
    
    precision highp float;
    attribute float pindex;
    attribute vec3 position;
    attribute vec3 offset;
    attribute vec2 uv;
    attribute float angle;
    
    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    
    uniform float uTime;
    uniform float uRandom;
    uniform float uDepth;
    uniform float uSize;
    uniform vec2 uTextureSize;
    uniform sampler2D uTexture;
    uniform sampler2D uTouch;
    
    varying vec2 vPUv;
    varying vec2 vUv;
    
    
    float random(float n) {
        return fract(sin(n) * 43758.5453123);
    }
    
    void main() {
        vUv = uv;
    
        // particle uv
        vec2 puv = offset.xy / uTextureSize;
        vPUv = puv;
    
        // pixel color
        vec4 colA = texture2D(uTexture, puv);
        float grey = colA.r * 0.2 + colA.g * 0.71 + colA.b * 0.07;
    
        // displacement
        vec3 displaced = offset;
        // randomise
        displaced.xy += vec2(random(pindex) - 0.5, random(offset.x + pindex) - 0.5) * uRandom;
        float rndz = (random(pindex) + noise(vec2(pindex * 0.1, uTime * 0.1)));
        displaced.z += rndz * (random(pindex) * 2.0 * uDepth);
        // center
        displaced.xy -= uTextureSize * 0.5;
    
        // touch
        float t = texture2D(uTouch, puv).r;
        displaced.z += t * 20.0 * rndz;
        displaced.x += cos(angle) * t * 160.0 * rndz;
        displaced.y += sin(angle) * t * 160.0 * rndz;
    
        // particle size
        float psize = (noise(vec2(uTime, pindex) * 0.5) + 2.0);
        float siz = 0.0;
        if( grey < 0.8 )
        {
            siz = 0.4 ;
        };
        psize *= min(grey, siz);
        psize *= uSize;
    
        // final position
        vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
        mvPosition.xyz += position * psize;
        vec4 finalPosition = projectionMatrix * mvPosition;
    
        gl_Position = finalPosition;
    }`,
};
