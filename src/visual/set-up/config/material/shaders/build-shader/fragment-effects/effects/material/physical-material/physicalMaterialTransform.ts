export const physicalMaterialTransform = (
  fragName: string,
  _previousFragName: string
) => {
  const transform = `
    
  	vec4 diffuseColor = vec4( uDiffuse, uOpacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = uEmissive;
    float roughnessFactor = uRoughness;
    float metalnessFactor = uMetalness;
    float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
	vec3 normal = normalize( vNormal );
    vec3 geometryNormal = normal;
    PhysicalMaterial material;
    material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
    vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );
    float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
    material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
    material.roughness = min( material.roughness, 1.0 );
	material.ior = uIor;
    float specularIntensityFactor = uSpecularIntensity;
    vec3 specularColorFactor = uSpecularColor;
    material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );

    GeometricContext geometry;
    geometry.position = - vEye;
    geometry.normal = normal;
    geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vEye );
    IncidentLight directLight;
	PointLight pointLight;
	
    // pointLight = pointLights[ 0 ];
    // getPointLightInfo( pointLight, geometry, directLight );
    // RE_Direct_Physical_1723231464811_0( directLight, geometry, material, reflectedLight );

    // pointLight = pointLights[ 1 ];
    // getPointLightInfo( pointLight, geometry, directLight );
    // RE_Direct_Physical_1723231464811_0( directLight, geometry, material, reflectedLight );

    // pointLight = pointLights[ 2 ];
    // getPointLightInfo( pointLight, geometry, directLight );
    // RE_Direct_Physical_1723231464811_0( directLight, geometry, material, reflectedLight );

	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = uAmbientLightColor;
	// irradiance += getLightProbeIrradiance( uLightProbe, geometry.normal , modelViewMatrix);
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
    diffuseColor.a = 1.0;
    vec4 ${fragName} = vec4( outgoingLight, diffuseColor.a );
    ${fragName}.rgb = toneMapping( ${fragName}.rgb );
    ${fragName} = linearToOutputTexel( ${fragName} );
    `;

  return { transform };
};
