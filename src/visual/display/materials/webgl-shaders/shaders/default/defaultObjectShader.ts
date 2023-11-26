export const defaultVertex = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

`;
export const defaultObjectShader = {
  vertexShader: defaultVertex,
};
