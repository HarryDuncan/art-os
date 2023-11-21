import { noise3D } from "../../shader-functions/noise/simplex/noise3D";

export const vertexShader = `
precision highp float;
  // Common uniforms

  uniform vec2 uResolution;
  uniform float uTime;
  uniform float uProgress;
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
    float dissolveProgress = uProgress * 10000.0;
    new_position.x += (random_direction * dissolveProgress) * ((noise * 0.8 * angle ) ) * (6.0 *cos(uTime * dissolveProgress *0.05 * angle)) * dissolveProgress;
    new_position.y += (random_direction * dissolveProgress) * ((noise * 1.8 * angle) * cos(dissolveProgress) );
    new_position.z += (random_direction * dissolveProgress) * ((noise * 1.8 * angle) * sin(dissolveProgress * 0.04) ) * dissolveProgress ;
    vec4 mv_position =  vec4(new_position,1.0);

    // Vertex shader output
    v_position = mv_position.xyz;
    vNormal = normalize(normalMatrix * new_normal);
    vUv = vec2(new_position.x, -new_position.y); // or use a different mapping based on your needs
  
  
    gl_Position = projectionMatrix  *  modelViewMatrix * mv_position;
  }
`;
