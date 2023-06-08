export const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  float radius = 1.0;
  float phi = 2.0 * 3.14159265359 * vUv.x;
  float theta = 3.14159265359 * vUv.y - 3.14159265359 * 0.5;

  float x = radius * cos(theta) * cos(phi);
  float y = radius * sin(theta);
  float z = radius * cos(theta) * sin(phi);
  

  vec3 transformed = vec3(x, y, z);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
}

`;
