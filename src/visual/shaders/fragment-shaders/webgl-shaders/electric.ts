export const electric = {
  frag: `
    // Simple but robust hash function
    // From https://stackoverflow.com/a/12996028
    uint hash(uint x)
    {
        x = ((x >> 16u) ^ x) * 0x45d9f3bu;
        x = ((x >> 16u) ^ x) * 0x45d9f3bu;
        x = (x >> 16u) ^ x;
        return x;
    }
    
    // Combine hash values
    // Based on Boost's hash_combine
    // Note: While this is decent for general hashing, it has visual artifacts in many graphical uses, but works well in this case
    uint combine(uint v, uint seed)
    {
        return seed ^ (v + 0x9e3779b9u + (seed << 6) + (seed >> 2));
    }
    
    // Construct an uniform float in 0.0-1.0 range from bits given
    // Based on method described in https://stackoverflow.com/a/17479300
    float uniformFloat(uint h)
    {
        return uintBitsToFloat(h & 0x007FFFFFu | 0x3F800000u) - 1.0;
    }
    
    // Construct "random" normal based on position and seed
    vec3 normal(vec3 p, uint seed)
    {
        uvec3 u = floatBitsToUint(p);
        seed = combine(hash(u.x), seed);
        seed = combine(hash(u.y), seed);
        seed = combine(hash(u.z), seed);
        float a = uniformFloat(seed);
        seed = combine(0x6d04955du, seed);
        float z = uniformFloat(seed) * 2.0 - 1.0;
        float s = sqrt(1.0 - z * z);
        return vec3(s * cos(a * 6.2831853 + vec2(0.0, -1.570796)), z);
    }
    
    // Regular smoothstep
    vec3 ss(vec3 x)
    {
        return x * x * (3.0 - 2.0 * x);
    }
    
    // Gradient noise from position and seed
    float gnoise(vec3 p, uint seed)
    {
        vec3 i = floor(p);
        vec3 f = fract(p);
        vec3 a = ss(f);
        float n000 = dot(normal(i, seed), f);
        float n100 = dot(normal(i + vec3(1.0, 0.0, 0.0), seed), f - vec3(1.0, 0.0, 0.0));
        float n010 = dot(normal(i + vec3(0.0, 1.0, 0.0), seed), f - vec3(0.0, 1.0, 0.0));
        float n110 = dot(normal(i + vec3(1.0, 1.0, 0.0), seed), f - vec3(1.0, 1.0, 0.0));
        float n001 = dot(normal(i + vec3(0.0, 0.0, 1.0), seed), f - vec3(0.0, 0.0, 1.0));
        float n101 = dot(normal(i + vec3(1.0, 0.0, 1.0), seed), f - vec3(1.0, 0.0, 1.0));
        float n011 = dot(normal(i + vec3(0.0, 1.0, 1.0), seed), f - vec3(0.0, 1.0, 1.0));
        float n111 = dot(normal(i + vec3(1.0, 1.0, 1.0), seed), f - vec3(1.0, 1.0, 1.0));
        return mix(
            mix(mix(n000, n100, a.x), mix(n010, n110, a.x), a.y),
            mix(mix(n001, n101, a.x), mix(n011, n111, a.x), a.y), a.z);
    }
    
    // 3 element (separate) gradient noise values from position and seeds
    vec3 gnoise3(vec3 p, uvec3 seed)
    {
        return vec3(gnoise(p, seed.x), gnoise(p, seed.y), gnoise(p, seed.z));
    }
    
    // Modified noise value used
    // Peaks at 1.0 for 0.0 noise values and go down linearly by distance from it
    vec3 n(vec3 p, uvec3 seed)
    { 
        return max(1.0 - abs(gnoise3(p, seed) * 1.5), vec3(0.0));
    }
    
    // Non-linear transforms used below
    vec3 q(vec3 v)
    {
        return pow(v, vec3(1.0, 1.0, 3.5));
    }
    
    vec3 r(vec3 n)
    {
        return pow(n, vec3(6.0, 9.0, 9.0));
    }
    
    // Typical complex noise, but non-linear, using values and transforms above,
    // as well as masking octaves by previous ones, and using different factors
    vec3 cnoise(vec3 p)
    {
        vec3 n0 = n(p * 1.0, uvec3(0xa7886e74u, 0x4433f369u, 0x5842edddu));
        vec3 n1 = n(p * 2.0, uvec3(0x41a2b27au, 0x14dede03u, 0x509a02aau));
        vec3 n2 = n(p * 4.0, uvec3(0xd5bf21b3u, 0x1d6adb70u, 0xc47ed64cu));
        vec3 n3 = n(p * 8.0, uvec3(0x7279fef1u, 0x120a704eu, 0x845b7178u));
        vec3 n4 = n(p * 16.0, uvec3(0xace62131u, 0x7e861b25u, 0x9f51d60cu));
        return (
            n1 * r(n0) * 0.25 +
            q(n0) * r(n1) * vec3(0.25, 0.25, 0.5) +
            q(n0 * n1) * r(n2) * vec3(0.125, 0.125, 0.5) +
            q(n0 * n1 * n2) * r(n3) * vec3(0.0625, 0.0625, 0.5) +
            q(n0 * n1 * n2 * n3) * r(n4) * vec3(0.03125, 0.03125, 0.5)
        ) * 1.06667;
    }
    
    void mainImage(out vec4 fragColor, in vec2 fragCoord)
    {
        vec2 uv = 2.25 * fragCoord / iResolution.y;
        float t = 0.25 * iTime + 80.0;
        vec3 n = cnoise(vec3(uv, t));
    
        // Add the 3 complex noise values together with different colors
        fragColor = vec4(
            vec3(0.3, 0.0, 0.0) +
            vec3(0.7, 0.2, 0.2) * n.x + 
            vec3(0.1, 0.2, 0.1) * n.y +
            vec3(0.9, 0.9, 2.7) * n.z, 1.0);
    }
    `,
};
