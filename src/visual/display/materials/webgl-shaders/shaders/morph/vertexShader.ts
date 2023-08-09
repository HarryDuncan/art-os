export const vertexShader = `

  // Common uniforms
  uniform vec2 uResolution;
  uniform float uTime;
  uniform vec2 uPosition;
  attribute float pointIndex;
  attribute vec3 morphPosition;
  attribute vec3 morphNormal;
  // Common varyings
  varying vec3 v_position;
  varying vec3 vNormal;
  varying vec2 vUv;

  float noise(vec3 position) {
    return fract(sin(dot(position.xyz, vec3(12.9898, 78.233, 45.5432))) * 43758.5453);
  }

  void main() {
  
    // Calculate the new vertex 
    vec3 effect_direction = morphPosition - position;
    vec3 normal_effect_direction = morphNormal - normal;
    float effect_intensity = min(30.0 * pow(length(effect_direction), -2.0), 1.0);
    float animationDuration = 15.0;
    float t = mod(uTime, animationDuration) / animationDuration;
    // float easedValue = smoothstep(0.0, 1.0, t);
    float time = uTime * 0.25;
    float easedValue = (cos(time) + (cos(time) + 2.0))/ 4.0;
    float aniSegSpeed = 2.5;
    vec3 new_position = position + (effect_direction * (easedValue));
    vec3 new_normal = normal + (normal_effect_direction * (easedValue));
  

    vec4 rotatedPosition = vec4(new_position,1.0); // rotate position
    // Calculate the modelview position
    vec4 mv_position = modelViewMatrix *  rotatedPosition;

    // Save the varyings
    v_position = mv_position.xyz;
    vNormal = normalize(normalMatrix * new_normal);
    vUv = vec2(new_position.x, -new_position.y); // or use a different mapping based on your needs
  
  
    
    
  
  
    // Vertex shader output
    gl_Position = projectionMatrix * mv_position;
  }
`;
