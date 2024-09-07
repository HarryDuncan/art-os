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

export const redirectPhysicalLight = `
    void redirectPhysicalLight( IncidentLight directLight,  GeometricContext geometry, PhysicalMaterial material, ReflectedLight reflectedLight ) {
	float dotNL = clamp( dot( geometry.normal, directLight.direction ), 0.0, 1.0 );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directSpecular += irradiance * brdfGgx( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.roughness );
	reflectedLight.directDiffuse += irradiance * brdfLambert( material.diffuseColor );
}
`;

export const brdfLambert = ` vec3 brdfLambert(vec3 diffuseColor ) {
	return 0.3183098861837907 * diffuseColor;
}`;

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
vec3 getLightProbeIrradiance( vec3 lightProbe[9], vec3 normal , mat4 viewMatrix) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix  );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}`;

export const getIBLIrradiance = ``;

export const linearToneMapping = `
    vec3 linearToneMapping(vec3 color, float toneMappingExposure){
        return toneMappingExposure * color;
    }
`;

export const linearTosRGB = `vec4 linearTosRGB( vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`;

export const fSchlickVector = `vec3 fSchlickVector(vec3 f0, float f90, float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * (( 1.0 - fresnel ) + ( f90 * fresnel ));
}`;
export const fSchlickFloat = `float fSchlickFloat( float f0, float f90, float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}`;

export const vGGXSmithCorrelated = `float vGGXSmithCorrelated( float alpha, float dotNL, float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, 1e-6 );
}`;

export const brdfGgx = `vec3 brdfGgx( vec3 lightDir,vec3 viewDir, vec3 normal, vec3 f0, float f90, float roughness ) {
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = clamp( dot( normal, lightDir ), 0.0, 1.0 );
	float dotNV = clamp( dot( normal, viewDir ), 0.0, 1.0 );
	float dotNH = clamp( dot( normal, halfDir ), 0.0, 1.0 );
	float dotVH = clamp( dot( viewDir, halfDir ), 0.0, 1.0 );
	vec3 F = fSchlickVector( f0, f90, dotVH );
	float V = vGGXSmithCorrelated( alpha, dotNL, dotNV );
	float D = dGGX( alpha, dotNH );
	return F * ( V * D );
}`;

export const dGGX = `float dGGX( float alpha, float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return 0.3183098861837907 * a2 / pow2( denom );
}`;
