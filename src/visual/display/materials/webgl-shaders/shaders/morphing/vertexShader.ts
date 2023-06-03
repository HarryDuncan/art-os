export const vertexShader = `  // Common uniforms
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;
uniform vec2 uPosition;

// Common varyings
varying vec3 v_position;
varying vec3 vNormal;

float noise(vec3 position) {
    return fract(sin(dot(position.xyz, vec3(12.9898, 78.233, 45.5432))) * 43758.5453);
}

void main() {
    // Define the attractor position using spherical coordinates
    float r = 15.0;
    float theta = 0.87 * uTime;
    float phi = 0.63 * uTime;
    vec3 attractor_position = r * vec3(uPosition.x, uPosition.y, 0.0);
    float frequency = 0.5;
    float amplitude = 0.2;
    // Calculate the new vertex position to simulate attraction effect
    vec3 effect_direction = attractor_position - position;
    float effect_intensity = min(30.0 * pow(length(effect_direction), -2.0), 1.0);
    vec3 new_position = position;

 
    // Calculate the displacement based on time and position
   
    float displacementStopper = smoothstep(0.0, 0.5, sin(uTime * 0.5));
    // Add some noise to the displacement for a more liquidy effect
     float displacement = sin(position.x * frequency + uTime) * sin(position.z * frequency + uTime) * amplitude;
    displacement += noise(position * frequency) * cos(uTime) * amplitude * 1.5;
    
    
    // Apply the displacement to the y-coordinate

    new_position.y -= displacement  * displacementStopper;
    new_position.z += displacement * 0.25 * displacementStopper;
    new_position.x += displacement * displacementStopper;
    
    
  
    

    // Calculate the modelview position
    vec4 mv_position = modelViewMatrix * vec4(new_position, 1.0);

    // Save the varyings
    v_position = mv_position.xyz;
    vNormal = normalize(normalMatrix * normal);

    // Vertex shader output
    gl_Position = projectionMatrix * mv_position;
}
`;
