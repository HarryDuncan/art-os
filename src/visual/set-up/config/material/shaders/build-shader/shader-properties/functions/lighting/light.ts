export const pointLightInfo = `
    void getPointLightInfo( PointLight pointLight, GeometricContext geometry, IncidentLight light ) {
		vec3 lVector = pointLight.position - geometry.position;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
`;

export const directPhysicalLight = `
    void reflectDirectPhysical( IncidentLight directLight,  GeometricContext geometry, PhysicalMaterial material, ReflectedLight reflectedLight ) {
	float dotNL = clamp( dot( geometry.normal, directLight.direction ), 0.0, 1.0 );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.roughness );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
`;

export const getDistanceAttenuation = `
float getDistanceAttenuation(  float lightDistance,  float cutoffDistance, float decayExponent ) {
    if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
        return pow( clamp( - lightDistance / cutoffDistance + 1.0, 0.0, 1.0 ), decayExponent );
    }
    return 1.0;
}
`;
export const inverseTransformDirection = `vec3 inverseTransformDirection( vec3 dir, mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}`;

export const shGetIrradianceAt = `
vec3 shGetIrradianceAt(  vec3 normal,  vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}`;
export const getLightProbeIrradiance = `
vec3 getLightProbeIrradiance( vec3 lightProbe, vec3 normal , mat4 modelViewMatrix) {
	vec3 worldNormal = inverseTransformDirection( normal, modelViewMatrix  );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}`;

export const getIBLIrradiance = ``;
