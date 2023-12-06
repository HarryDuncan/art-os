export const vertexShader = `

  // Common uniforms

  uniform vec2 uResolution;
  uniform float uTime;
  uniform int uLoopCount;
  uniform float uProgress;
  uniform vec2 uPosition;
  attribute float pointIndex;
  attribute vec3 morphPosition_1;
  attribute vec3 morphNormal_1;
  attribute vec3 morphPosition_2;
  attribute vec3 morphNormal_2;
  attribute float randomBool;
  attribute float randomBool2;
  // Common varyings
  varying vec3 v_position;
  varying vec3 vNormal;
  varying vec2 vUv;
  varying float vPointId;
  varying float vRandom;
  varying float vRandom2;

  mat4 rotateY(float angle) {
    float cosA = cos(angle);
    float sinA = sin(angle);

    return mat4(
        cosA, 0.0, sinA, 0.0,
        0.0, 1.0, 0.0, 0.0,
        -sinA, 0.0, cosA, 0.0,
        0.0, 0.0, 0.0, 1.0
    );
}


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
  
    vec4 mv_position =  vec4(new_position,1.0);
    float angle = uTime * 0.5; // calculate the angle based on time
    float rotationAngle = uTime * 0.2;

    // Create a rotation matrix
    mat4 rotationMatrix = rotateY(rotationAngle);

    vec4 rotatedPosition = vec4(mv_position.xyz,1.0) * rotationMatrix; 
    // Save the varyings
    v_position = rotatedPosition.xyz;
    vNormal = normalize(normalMatrix * new_normal);
    vUv = vec2(rotatedPosition.x, -rotatedPosition.y); // or use a different mapping based on your needs
  

    gl_PointSize = max(10.0, min(18.0, 16.0 *  (9.0 / rotatedPosition.z)) );
  
    // Vertex shader output
    gl_Position = projectionMatrix  *  modelViewMatrix * rotatedPosition;
  }
`;
