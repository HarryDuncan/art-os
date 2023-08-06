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
    
    float animationDuration = 25.0;
    float t = mod(uTime, animationDuration) / animationDuration;
    float easedValue = smoothstep(0.0, 1.0, t);

    float aniSegSpeed = 2.222;
    vec3 new_position = position + (effect_direction * (easedValue * 2.222));
    vec3 new_normal = normal + (normal_effect_direction * (easedValue * 2.0));
    if(easedValue > 0.45 && easedValue < 0.55) {
      new_position = position + (effect_direction);
      new_normal = normal + (normal_effect_direction);
    }else if (easedValue > 0.55) {
        float animationMultiplier = (1.0 - (easedValue - 0.55) * 2.222);
        new_position = position + (effect_direction * animationMultiplier);
        new_normal = normal + (normal_effect_direction *  animationMultiplier);
    }
  

    // Calculate the modelview position
    vec4 mv_position = modelViewMatrix * vec4(new_position, 1.0);

    // Save the varyings
    v_position = mv_position.xyz;
    vNormal = normalize(normalMatrix * new_normal);
    vUv = vec2(new_position.x, -new_position.y); // or use a different mapping based on your needs

    // Vertex shader output
    gl_Position = projectionMatrix * mv_position;
  }
`;
