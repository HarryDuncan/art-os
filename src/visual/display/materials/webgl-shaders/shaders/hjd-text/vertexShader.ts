export const vertexShader = `
precision highp float;
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
  // Common varyings
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec2 vUv;
  varying float vPointId;


  void main() {
   
    vec4 mv_position =  vec4(position,1.0);
    vPosition = position.xyz;
    // Vertex shader output
    gl_Position = projectionMatrix  *  modelViewMatrix * mv_position;
  }
`;
