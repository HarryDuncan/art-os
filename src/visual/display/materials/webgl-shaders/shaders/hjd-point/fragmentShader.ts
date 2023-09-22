export const fragmentShader = `
varying vec3 vColor;
uniform float uTime;
uniform sampler2D uTextureOne;
uniform sampler2D uTextureZero;
uniform float uOpacity;
varying float vPointId;
varying float vRandom;
varying float vRandom2;
void main() {
    float opacity = uOpacity;
    vec4 pointColor =  vec4(1.0, 0.0, 0.0,  vRandom2);        
    if(vRandom == 0.0 ){
        gl_FragColor =  pointColor * texture2D(uTextureOne, gl_PointCoord);
    }else{
        gl_FragColor =  pointColor * texture2D(uTextureZero, gl_PointCoord);
    }
   
}`;
