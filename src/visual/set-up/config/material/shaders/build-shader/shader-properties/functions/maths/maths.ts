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

export const calculateNormal = `
vec3 calculateNormal(vec3 objectPosition) {
  vec3 fdx = vec3(dFdx(objectPosition.x), dFdx(objectPosition.y), dFdx(objectPosition.z));
  vec3 fdy = vec3(dFdy(objectPosition.x), dFdy(objectPosition.y), dFdy(objectPosition.z));
  vec3 normal = normalize(cross(fdx, fdy));

  if (!gl_FrontFacing) {
      normal = -normal;
  }

  return normal;
}
`;

export const hash33 = `
vec3 hash33(vec3 p3) {
	p3 = fract(p3 * vec3(.1031,.11369,.13787));
    p3 += dot(p3, p3.yxz+19.19);
    return -1.0 + 2.0 * fract(vec3((p3.x + p3.y)*p3.z, (p3.x+p3.z)*p3.y, (p3.y+p3.z)*p3.x));
}
`;

export const rand = `
float rand(vec2 n) { 
  return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}
`;

export const random = `float random(float n) {
	return fract(sin(n) * 43758.5453123);
}`;

export const interpolate = `float interpolate(float x, float min_x, float max_x) {
	return x * max_x + (1.0 - x) * min_x;
}
`;

export const normSin = `float normsin(float x) {
	return (sin(x) + 1.0) / 2.0;
}`;
