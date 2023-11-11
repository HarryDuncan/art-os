export const defaultThreeDVertex = `

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
  vec4 mv_position =  vec4(position,1.0);
  // Save the varyings
  vec3 v_position = mv_position.xyz;
  vec3 vNormal = normal;
  vUv = uv;
  // Vertex shader output
  gl_Position = projectionMatrix  *  modelViewMatrix * mv_position;
}`;
