export const vertexShader = `

  // Common uniforms

  uniform vec2 uResolution;
  uniform float uTime;
  attribute float pointIndex;
  // Common varyings
  varying vec3 v_position;
  varying vec3 vNormal;
  varying vec2 vUv;
  varying float vPointId;


  void main() {
    vPointId = pointIndex;
    // Calculate the new vertex 

    vec3 currentPosition = position;
    vec3 currentNormal = normal;
    vec3 effect_direction = morphPosition_1 - currentPosition;
    vec4 mv_position =  vec4(new_position,1.0);
    Save the varyings
     v_position = mv_position.xyz;
    vNormal = normalize(normalMatrix * new_normal);
     vUv = vec2(new_position.x, -new_position.y);
  
    // Vertex shader output
    gl_Position = projectionMatrix  *  modelViewMatrix * mv_position;
  }
`;
