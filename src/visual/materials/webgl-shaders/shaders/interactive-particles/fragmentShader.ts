export const fragmentShader = `
varying vec3 vColor;
varying float vReduced;
uniform float uTime;
uniform sampler2D uTextureOne;
uniform sampler2D uTextureZero;
varying float vAffected;
varying float vPointId;
void main() {
    
    
        if(mod(vPointId, vReduced) == 0.0 ){
            vec4 pointColor =  vec4(1.0, 0.0, 0.0, 1.0);
            if(vAffected == 1.0){
                pointColor =  vec4(0.0, 0.3, 0.5, 1.0);
            }
            
            if(mod(vPointId, 2.0) == 0.0 ){
                gl_FragColor =  pointColor * texture2D(uTextureOne, gl_PointCoord);
            }else{
                gl_FragColor =  pointColor * texture2D(uTextureZero, gl_PointCoord);
            }
        }else{
            discard;
        }
       

   
}`;

// precision highp float;
//   #define C(c) U.x-=.5; O+= char(U,64+c)

//     uniform sampler2D uTexture;

//     varying vec2 vPUv;
//     varying vec2 vUv;
//     uniform float uTime;

//     void main() {

//         vec4 color = vec4(0.0);
//         vec2 uv = vUv;
//         vec2 puv = vPUv;

//         // pixel color
//         vec4 colA = texture2D(uTexture, puv);

//         // greyscale
//         float grey = colA.r * 0.21 + colA.g * 0.71 + colA.b * 0.07;
//         vec4 colB = vec4(0.9,  colA.g,  cos(uTime * 0.2) + colA.b, 1.0);

//         // circle
//         float border = 0.3;
//         float radius = 0.5;
//         float dist = radius - distance(uv, vec2(0.5));
//         float t = smoothstep(0.0, border, dist);

//         // final color
//         color = colB;
//         color.a = t * 2.1;

//         gl_FragColor = color;
//     }`;
