export const vertexShader = ` 
uniform float uTime;
uniform vec2 uPosition;
varying vec3 vColor;
void main() {
  // Transform the position of the point using the modelViewMatrix and projectionMatrix
  vec3 warpVector = vec3(uPosition.xy, 0) - position;
  float warpDistance = length(warpVector);
  vec3 warpDirection = warpVector / warpDistance;

  float warpAmount = 0.5; // Example scaling factor
  vec3 warpOffset = warpDirection * warpAmount;
  vec3 warpedPosition = position + warpOffset;

  gl_PointSize = 1.0;
  vec4 transformed = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  gl_Position = transformed;
}
`;

// `;

// // float rand(vec2 n) {
// //     return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
// // }

// // float noise(vec2 p){
// //     vec2 ip = floor(p);
// //     vec2 u = fract(p);
// //     u = u*u*(3.0-2.0*u);

// //     float res = mix(
// //         mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
// //         mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
// //     return res*res;
// // }

// // uniform mat4 modelViewMatrix;
// // uniform mat4 projectionMatrix;

// // uniform sampler2D uTexture;
// // uniform sampler2D uTouch;

// // varying vec2 vPUv;
// // varying vec2 vUv;

// // float random(float n) {
// //     return fract(sin(n) * 43758.5453123);
// // }

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
// //     displaced.xy += vec2(random(pindex) - 0.5, random(offset.x + pindex) - 0.5) * uRandom;
// //     float rndz = (random(pindex) + noise(vec2(pindex * 0.1, uTime * 0.1)));
// //     displaced.z += rndz * (random(pindex) * 2.0 * uDepth);
// //     // center
// //     displaced.xy -= uTextureSize * 0.5;

// //     // touch
// //     float t = texture2D(uTouch, puv).r;
// //     displaced.z += t * 20.0 * rndz;
// //     displaced.x += cos(angle) * t * 160.0 * rndz;
// //     displaced.y += sin(angle) * t * 160.0 * rndz;

// //     // particle size
// //     float psize = (noise(vec2(uTime, pindex) * 0.5) + 2.0);
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
// // }`;
