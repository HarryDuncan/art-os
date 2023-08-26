export const fragmentShader = `
varying vec3 vColor;
uniform float uTime;
uniform sampler2D uTextureOne;
uniform sampler2D uTextureZero;
varying float vPointId;
void main() {
    vec4 pointColor =  vec4(1.0, 0.0, 1.0, 1.0);
    gl_FragColor = pointColor * texture2D(uTextureOne, gl_PointCoord);
   
}`;
