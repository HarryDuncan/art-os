export const mod289Float = `// **- // mod289 a float
float mod289(float x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0; }
`;

export const mod289Vec3 = `// **- // Returns vector3 modulo 289 
    vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }`;

export const mod289Vec4 = `// **- // Returns vector4 modulo 289 
  vec4 mod289(vec4 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  `;

export const permuteFloat = `// **- // permutates a float
float permute(float x) {
    return mod289(((x*34.0)+1.0)*x);
}`;
export const permuteVec4 = `// **- // permutates a vec 4
  vec4 permute(vec4 x) {
    return mod289(((x*34.0)+1.0)*x);
}`;

export const taylorInvSqrtFloat = `// **- // taylor invers sqrt for float
float taylorInvSqrt(float r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}`;

export const taylorInvSqrtVec4 = `// **- // returns the taylor inverse sqrt
  vec4 taylorInvSqrt(vec4 r)
  {
    return 1.79284291400159 - 0.85373472095314 * r;
  }
  `;
