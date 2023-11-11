export const fragmentShader = `

// Common uniforms
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;

uniform sampler2D uMaterial;

// Common varyings
varying vec3 v_position;
varying vec3 vNormal;
varying vec3 vViewDirection;


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
    vec4 uMaterialTex = texture2D(uMaterial, uv);


    // Use the mouse position to define the light direction
    float min_resolution = min(uResolution.x, uResolution.y);
    vec3 light_direction = -vec3((uMouse - 0.5 * uResolution) / min_resolution, 0.25);

    // Set the surface color
    vec3 surface_color = vec3(1.0, 0.5, 0.4);

    // Apply the light diffusion factor
    

    // Fragment shader output
    // Calculate curvature based on the angle between the normal and the view direction
    float curvature = 5.0 - abs(dot(normalize(vNormal), normalize(vec3(0.0, 0.0, 1.0))));
    
    // Blend the edge color with the object color based on curvature
    vec3 finalColor = mix(surface_color, vec3(1.0), curvature);

    vec4 col = mix(uMaterialTex,vec4( finalColor, 1.0), 0.0);
    gl_FragColor =  mix(uMaterialTex,col,1.0 );
    gl_FragColor = vec4(gl_FragColor.rgb, gl_FragColor.a);
    


    
}
`;
