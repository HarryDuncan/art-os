export const attractionMorphingVertex = {
  vert: `
    // Common uniforms
    uniform vec2 uResolution;
    uniform vec2 uMouse;
    uniform float uTime;
    uniform float uFrame;
    uniform vec2 uPosition;
    
    // Common varyings
    varying vec3 v_position;
    varying vec3 vNormal;


    void main() {
        // Define the attractor position using spherical coordinates
        float r = 15.0;
        float theta = 0.87 * uTime;
        float phi = 0.63 * uTime;
        vec3 attractor_position = r * vec3(uPosition.x, uPosition.y, 0.0);
    
        // Calculate the new vertex position to simulate attraction effect
        vec3 effect_direction = attractor_position - position;
        float effect_intensity = min(30.0 * pow(length(effect_direction), -2.0), 1.0);
        vec3 new_position = position + effect_intensity / 2.0 * effect_direction;
    
        // Calculate the modelview position
        vec4 mv_position = modelViewMatrix * vec4(new_position, 1.0);
    
        // Save the varyings
        v_position = mv_position.xyz;
        vNormal = normalize(normalMatrix * normal);
    
        // Vertex shader output
        gl_Position = projectionMatrix * mv_position;
    }`,
};
