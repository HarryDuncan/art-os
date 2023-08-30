export const fragmentShader = `
varying vec3 vColor;
uniform float uTime;
uniform sampler2D uTextureOne;
uniform sampler2D uTextureZero;
uniform float uOpacity;
varying float vPointId;
varying float vRandom;
void main() {
    vec4 pointColor =  vec4(1.0, 0.0, 0.0, uOpacity);        
    if(mod(vRandom, 2.0) == 0.0 ){
        gl_FragColor =  pointColor * texture2D(uTextureOne, gl_PointCoord);
    }else{
        gl_FragColor =  pointColor * texture2D(uTextureZero, gl_PointCoord);
    }
   
}`;
