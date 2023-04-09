export const fragmentShader = `

// Common uniforms
uniform vec2 uResolution;
uniform float uTime;
uniform sampler2D matcap;

// Common varyings
varying vec3 v_position;
varying vec3 vNormal;
varying vec3 vViewDirection;


/*
*  Calculates the normal vector at the given position
*
*  Uses this fix for some mobiles:
*  https://stackoverflow.com/questions/20272272/standard-derivatives-from-fragment-shader-dfdx-dfdy-dont-run-correctly-in-a
*/
vec3 calculateNormal(vec3 position) {
    vec3 fdx = vec3(dFdx(position.x), dFdx(position.y), dFdx(position.z));
    vec3 fdy = vec3(dFdy(position.x), dFdy(position.y), dFdy(position.z));
    vec3 normal = normalize(cross(fdx, fdy));

    if (!gl_FrontFacing) {
        normal = -normal;
    }

    return normal;
}

/*
*  Calculates the diffuse factor produced by the light illumination
*/
float diffuseFactor(vec3 normal, vec3 light_direction) {
    float df = dot(normalize(normal), normalize(light_direction));

    if (gl_FrontFacing) {
        df = -df;
    }

    return max(0.0, df);
}

/*
* The main program
*/
void main() {
    // Calculate the new normal vector
    vec3 new_normal = calculateNormal(v_position);
  
    vec3 viewDir = normalize(-v_position.xyz);
    vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
    vec3 y = cross( viewDir, x );

    vec2 uv = vec2( dot( x, new_normal ), dot( y, new_normal ) ) * 0.495 + 0.5; 
    vec4 matcapTex = texture2D(matcap, uv);


    // Use the mouse position to define the light direction
    float min_resolution = min(uResolution.x, uResolution.y);
    vec2 uMouse = vec2(1.0, 1.0);
    vec3 light_direction = -vec3((uMouse - 0.5 * uResolution) / min_resolution, 0.25);

    // Set the surface color
    vec3 surface_color = vec3(1.0, 0.5, 0.4);

    // Apply the light diffusion factor
    surface_color *= diffuseFactor(new_normal, light_direction);

    // Fragment shader output
    vec4 col = vec4(surface_color, 1.0);
    gl_FragColor =  col;
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
