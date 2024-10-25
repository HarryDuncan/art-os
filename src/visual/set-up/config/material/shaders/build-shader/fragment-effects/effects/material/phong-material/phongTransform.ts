export const phongTransform = (fragName: string, _previousFragName: string) => {
  const transform = `
  vec3 N = normalize(vNormalInterpolation);
  vec3 L = normalize(uLightPosition - vPosition);

  // Lambert's cosine law
  float lambertian = max(dot(N, L), 0.0);
  float specular = 0.0;
  if(lambertian > 0.0) {
    vec3 R = reflect(-L, N);      // Reflected light vector
    vec3 V = normalize(-vPosition); // Vector to viewer
    // Compute the specular term
    float specAngle = max(dot(R, V), 0.0);
    specular = pow(specAngle, uShininess);
  }
  vec4 ${fragName} = vec4(uAmbientReflection * uAmbientColor +
                      uDiffuseReflection * lambertian * uDiffuseColor +
                      uSpecularReflection * specular * uSpecularColor, 1.0);

    `;
  return { transform };
};
