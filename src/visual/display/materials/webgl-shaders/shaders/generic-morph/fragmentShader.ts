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
    if(vRandom2 == 0.0 ){
        opacity = 0.0;
    }
    vec4 pointColor =  vec4(0.1294, 0.6157, 0.7176, opacity);        
    if(vRandom == 0.0 ){
        gl_FragColor =  pointColor * texture2D(uTextureOne, gl_PointCoord);
    }else{
        gl_FragColor =  pointColor * texture2D(uTextureZero, gl_PointCoord);
    }
   
}`;
