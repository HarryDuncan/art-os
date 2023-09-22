export const vertexShader = `


  // Common uniforms

  uniform vec2 uResolution;
  uniform float uTime;
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
  void main() {
    vPointId = pointIndex;
    vRandom = randomBool;
    vRandom2 = randomBool2;
    // Calculate the new vertex 

    vec3 currentPosition = position;
    vec4 mv_position =  vec4(currentPosition,1.0);
    // Save the varyings
    // v_position = mv_position.xyz;
    // vNormal = normalize(normalMatrix * new_normal);
    // vUv = vec2(new_position.x, -new_position.y); // or use a different mapping based on your needs
  
  
    
    
    gl_PointSize = 20.0;
  
    // Vertex shader output
    gl_Position = projectionMatrix  *  modelViewMatrix * mv_position;
  }
`;
