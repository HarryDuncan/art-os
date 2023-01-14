export const eldrich = {
  frag: `float sdf(vec3 point) {
        //float sphere = length(point-vec3(0.25, 1.25, 3.0))-0.5;
        float plane = length(point.y-0.5 + cos(point.xz/2.0+uTime));
        
        return plane;
    }
    
    float rayMarch(vec3 rayOrigin, vec3 rayDir) {
        float distMarched = 0.0;
        
        for (int i = 0; i < 100; i++) {
            float dist = sdf(rayOrigin);
            
            rayOrigin += rayDir * dist;
            distMarched += dist;
            
            if (distMarched < 0.01 || dist > 100.0) {
                break;
            }
        }
        
        return distMarched;
    }
    
    vec3 getNormal(vec3 point) {
        float dist = sdf(point);
        vec3 norm = dist - vec3(
            sdf(point - vec3(0.01, 0.0, 0.0)),
            sdf(point - vec3(0.0, 0.01, 0.0)),
            sdf(point - vec3(0.0, 0.0, 0.01))
        );
        return normalize(norm);
    }
    
    float getSpecular(vec3 point, vec3 lightPos, vec3 cameraPos) {
        vec3 viewDir = normalize(cameraPos-point);
        vec3 lightDir = normalize(lightPos-point);
        vec3 reflectDir = reflect(-lightDir, getNormal(point));
        return pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
    }
    
    float getLight(vec3 point, vec3 cameraPos) {
        vec3 normal = getNormal(point);
        vec3 lightPos = cameraPos;
        vec3 lightDir = normalize(lightPos-point);
        return dot(normal, lightDir) + getSpecular(point, lightPos, cameraPos);
    }
    
    void mainImage( out vec4 fragColor, in vec2 fragCoord )
    {
        vec2 uv = (fragCoord-0.5*uResolution.xy)/uResolution.x;
        
        vec3 cameraPos = vec3(0.0, 1.0, uTime);
        vec3 rayDir = vec3(uv.x, uv.y/8.0, 1.0);
    
        float dist = rayMarch(cameraPos, rayDir);
        vec3 point = rayDir * dist + cameraPos;
        
        vec3 col = vec3(getLight(point, cameraPos));
        col = mix(col, vec3(0.5, 0.0, 0.8), min(dist/500.0, 1.0));
    
        fragColor = vec4(col,1.0);
    }`,
};
