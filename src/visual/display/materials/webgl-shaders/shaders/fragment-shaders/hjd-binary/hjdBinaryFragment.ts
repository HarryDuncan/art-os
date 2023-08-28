export const fragmentShader = `
varying vec3 vColor;
uniform float uTime;
uniform sampler2D uTextureOne;
uniform sampler2D uTextureZero;
uniform float uOpacity;
varying float vPointId;
void main() {
    vec4 pointColor =  vec4(1.0, 0.0, 0.0, uOpacity);        
    if(mod(vPointId, 5.0) == 0.0 ){
        gl_FragColor =  pointColor * texture2D(uTextureOne, gl_PointCoord);
    }else{
        gl_FragColor =  pointColor * texture2D(uTextureZero, gl_PointCoord);
    }
   
}`;
