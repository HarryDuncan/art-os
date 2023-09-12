import { noise3D } from "../../shader-functions/noise/simplex/noise3D";

export const vertexShader = `

  // Common uniforms

  uniform vec2 uResolution;
  uniform float uTime;
  uniform int uLoopCount;
  uniform float uProgress;
  uniform vec2 uPosition;
  attribute float angle;
  attribute float randomBool;
  attribute float randomBool2;
  attribute float pointIndex;
  attribute vec3 morphPosition_1;
  attribute vec3 morphNormal_1;
  attribute vec3 morphPosition_2;
  attribute vec3 morphNormal_2;
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

    vec3 currentPosition = position;
    vec3 currentNormal = normal;
    vec3 effect_direction = morphPosition_1 - currentPosition;
    vec3 normal_effect_direction = morphNormal_1 - normal;
    if(uLoopCount == 1){
      currentPosition = morphPosition_1;
      currentNormal = morphNormal_1;
      effect_direction = morphPosition_2 - currentPosition;
      normal_effect_direction = morphNormal_2 - currentNormal;
    }
    if(uLoopCount == 2){
      currentPosition = morphPosition_2;
      currentNormal = morphNormal_2;
      effect_direction = position - currentPosition;
      normal_effect_direction = normal - currentNormal;
    }
  
    vec3 new_position = currentPosition + (effect_direction * (uProgress));
    vec3 new_normal = normal + (normal_effect_direction * (uProgress));
    float noise = noise3D(new_position);
    new_position.x += (noise * 0.8) * uProgress;
    new_position.y += (noise * 1.3) * uProgress;;
    vec4 mv_position =  vec4(new_position,1.0);
    // Save the varyings
    // v_position = mv_position.xyz;
    // vNormal = normalize(normalMatrix * new_normal);
    // vUv = vec2(new_position.x, -new_position.y); // or use a different mapping based on your needs
  
  
    
    
    gl_PointSize = 25.0;
  
    // Vertex shader output
    gl_Position = projectionMatrix  *  modelViewMatrix * mv_position;
  }
`;
