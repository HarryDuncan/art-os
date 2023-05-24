export const vertexShader = `
attribute float size;
attribute vec3 color;
attribute float pointIndex;
attribute float angle;

uniform float uTime;
uniform vec3 uPosition;
uniform vec2  uTextureSize;
uniform sampler2D uTouch;
uniform vec3 uRotation;
uniform vec3 uModelDimensions;
uniform vec4 uEffectTranslation;
uniform float uPower;
varying vec3 vColor;
varying float vPointId;

varying vec2 vPUv;
varying vec2 vUv;
varying float vReduced;
varying float vAffected;

float random(float n) {
    return fract(sin(n) * 43758.5453123);
}

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


  vec3 inverseRotate(vec3 position){
    mat4 inverseRotationMatrix = mat4(
      vec4(cos(angle), 0, -sin(angle), 0),
      vec4(0, 1, 0, 0),
      vec4(sin(angle), 0, cos(angle), 0),
      vec4(0, 0, 0, 1)
    );
    
    vec4 inverse = vec4(position, 1.0) * inverseRotationMatrix;
    return inverse.xyz;
  }

void main() {
  vUv = uv;
  vReduced = 5.0;
  vec2 puv = position.xy / uTextureSize;
  vPUv = puv;
  
  vColor = vec3(1.0,1.0,0.5);
  vPointId = pointIndex;
  vAffected = 0.0;
 


  // displacement
  vec3 displaced = position;

 

  // uPosition will be set to 2000 is there is no detections made
  if(uPosition.x > -2000.0){

    vec3 displacedPosition =position;
    vec3 effect = uPosition;
    vec3 effectDistanceVector =  effect - displacedPosition;
    float effectDistanceLength = length(effectDistanceVector);
    float effectStrength =  1.5 * uPower;
    if(effectDistanceLength <= 1.25 * uPower){
      float rand = random(uTime);
      displaced.x += cos(angle) * effectStrength;
      displaced.y += sin(angle) * effectStrength;
      vAffected = 1.0;
    }
  }

  if(mod(pointIndex, vReduced) == 0.0){
    vec3 translated =  inverseRotate(position);
    gl_PointSize = max(8.0, min(18.0, 18.0 *  (9.0 / translated.z)) );
  }else{
    gl_PointSize = 0.0;
  }
  if(vAffected == 1.0){
    gl_PointSize = 64.0;
  }
  
  float angle = uTime * 0.1; // calculate the angle based on time

  mat4 rotationMatrix = mat4(
    vec4(cos(angle), 0, sin(angle), 0),
    vec4(0, 1, 0, 0),
    vec4(-sin(angle), 0, cos(angle), 0),
    vec4(0, 0, 0, 1)
  ); // create a rotation matrix around y-axis

  
  vec4 rotatedPosition = vec4(displaced,1.0) * rotationMatrix; // rotate position



  vec4 transformed = projectionMatrix * modelViewMatrix *  rotatedPosition ;
  gl_Position = transformed;
}
`;

// `;

// // uniform mat4 modelViewMatrix;
// // uniform mat4 projectionMatrix;

// // uniform sampler2D uTexture;
// // uniform sampler2D uTouch;

// // varying vec2 vPUv;
// // varying vec2 vUv;

// // void main() {
// //     vUv = uv;

// //     // particle uv
// //     vec2 puv = offset.xy / uTextureSize;
// //     vPUv = puv;

// //     // pixel color
// //     vec4 colA = texture2D(uTexture, puv);
// //     float grey = colA.r * 0.2 + colA.g * 0.71 + colA.b * 0.07;

// //     // displacement
// //
// //     // randomise
// //     displaced.xy += vec2(random(pointIndex) - 0.5, random(offset.x + pointIndex) - 0.5) * uRandom;
// //     float rndz = (random(pointIndex) + noise(vec2(pointIndex * 0.1, uTime * 0.1)));
// //     displaced.z += rndz * (random(pointIndex) * 2.0 * uDepth);
// //     // center
// //     displaced.xy -= uTextureSize * 0.5;

// //     // touch
// //     float t = texture2D(uTouch, puv).r;
// //     displaced.z += t * 20.0 * rndz;
// //     displaced.x += cos(angle) * t * 160.0 * rndz;
// //     displaced.y += sin(angle) * t * 160.0 * rndz;

// //     // particle size
// //     float psize = (noise(vec2(uTime, pointIndex) * 0.5) + 2.0);
// //     float siz = 0.0;
// //     if( grey < 0.8 )
// //     {
// //         siz = 0.4 ;
// //     };
// //     psize *= min(grey, siz);
// //     psize *= uSize;

// //     // final position
// //     vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
// //     mvPosition.xyz += position * psize;
// //     vec4 finalPosition = projectionMatrix * mvPosition;

// //     gl_Position = finalPosition;
// // // }`;

//    // touch
//      float t = texture2D(uTouch, puv).r;
//    displaced.z += t * 20.0 * rndz;
//     displaced.x += cos(angle) * t * 160.0 * rndz;
//     displaced.y += sin(angle) * t * 160.0 * rndz;

export const interactiveParticleFragment = {
  frag: `precision highp float;
  #define C(c) U.x-=.5; O+= char(U,64+c)

    uniform sampler2D uTexture;

    varying vec2 vPUv;
    varying vec2 vUv;
    uniform float uTime;

 

    void main() {
      
        vec4 color = vec4(0.0);
        vec2 uv = vUv;
        vec2 puv = vPUv;

        // pixel color
        vec4 colA = texture2D(uTexture, puv);

        // greyscale
        float grey = colA.r * 0.21 + colA.g * 0.71 + colA.b * 0.07;
        vec4 colB = vec4(0.9,  colA.g,  cos(uTime * 0.2) + colA.b, 1.0);

        // circle
        float border = 0.3;
        float radius = 0.5;
        float dist = radius - distance(uv, vec2(0.5));
        float t = smoothstep(0.0, border, dist);

        // final color
        color = colB;
        color.a = t * 2.1;

        gl_FragColor = color;
    }`,
};

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
    attribute float pointIndex;
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
        displaced.xy += vec2(random(pointIndex) - 0.5, random(offset.x + pointIndex) - 0.5) * uRandom;
        float rndz = (random(pointIndex) + noise(vec2(pointIndex * 0.1, uTime * 0.1)));
        displaced.z += rndz * (random(pointIndex) * 2.0 * uDepth);
        // center
        displaced.xy -= uTextureSize * 0.5;
    
        // touch
        float t = texture2D(uTouch, puv).r;
        displaced.z += t * 20.0 * rndz;
        displaced.x += cos(angle) * t * 160.0 * rndz;
        displaced.y += sin(angle) * t * 160.0 * rndz;
    
        // particle size
        float psize = (noise(vec2(uTime, pointIndex) * 0.5) + 2.0);
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
