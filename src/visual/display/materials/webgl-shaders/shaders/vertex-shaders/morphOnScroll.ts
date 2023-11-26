import { noise3D } from "../../shader-functions/noise/simplex/noise3D";

const vertexShader = `
precision highp float;
  // Common uniforms

  uniform vec2 uResolution;
  uniform float uTime;
  uniform float uScroll;
  attribute float angle;
  attribute float randomBool;
  attribute float randomBool2;
  attribute float pointIndex;
  // Common varyings
  varying vec3 v_position;
  varying vec3 vNormal;
  varying vec2 vUv;
  varying float vPointId;
  varying float vRandom;
  varying float vRandom2;
${noise3D}
  void main() {
    vPointId = pointIndex;
    vRandom = randomBool;
    vRandom2 = randomBool2;
    // Calculate the new vertex 

    vec3 new_position = position;
    vec3 new_normal = normal;
    float noise = noise3D(new_position);
    float random_direction = 1.0;
    if(randomBool2 < 1.0){
      random_direction = -1.0;
    }
    new_position.x += random_direction * ((noise * 0.8 * angle ) ) * (6.0 *cos(uTime * uScroll *0.05 * angle));
    new_position.y += random_direction * ((noise * 1.8 * angle) * cos(uScroll) );
    new_position.z += random_direction * ((noise * 1.8 * angle) * sin(uScroll * 0.04) ) * uScroll ;
    vec4 mv_position =  vec4(new_position,1.0);
    gl_PointSize =  min(18.0,  (uScroll - 0.1)* 1.5);
  
    // Vertex shader output
    gl_Position = projectionMatrix  *  modelViewMatrix * mv_position;
  }
`;

export const morphOnScroll = {
  vertexShader,
};
