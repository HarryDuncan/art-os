export const fragmentShader = `
uniform sampler2D uTexture;
varying vec2 vUv;

void main() {
  vec4 texelColor = texture2D(uTexture, vUv);
  vec3 colo = vec3(0.5,0.5,0.5);
  gl_FragColor = vec4(colo, 1.0);
}
`;
