export const physicalMaterialTransform = (
  fragName: string,
  _previousFragName: string
) => {
  const transform = `
  	vec4 diffuseColor = vec4( uDiffuse, uOpacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = uEmissive;
    float roughnessFactor = roughness;
    float metalnessFactor = metalness;
    float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
	vec3 normal = normalize( vNormal );
    vec3 geometryNormal = normal;
    PhysicalMaterial material;
    material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
    vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );
    float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
    material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
    material.roughness = min( material.roughness, 1.0 );
	material.ior = ior;
    float specularIntensityFactor = specularIntensity;
    vec3 specularColorFactor = specularColor;
    material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	material.specularColor = mix( min( pow2_1723231464811_0( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );

    GeometricContext geometry;
    geometry.position = - vViewPosition;
    geometry.normal = normal;
    geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
    IncidentLight directLight;
	PointLight pointLight;
	
    pointLight = pointLights[ 0 ];
    getPointLightInfo_1723231464811_0( pointLight, geometry, directLight );
    RE_Direct_Physical_1723231464811_0( directLight, geometry, material, reflectedLight );

    pointLight = pointLights[ 1 ];
    getPointLightInfo_1723231464811_0( pointLight, geometry, directLight );
    RE_Direct_Physical_1723231464811_0( directLight, geometry, material, reflectedLight );

    pointLight = pointLights[ 2 ];
    getPointLightInfo_1723231464811_0( pointLight, geometry, directLight );
    RE_Direct_Physical_1723231464811_0( directLight, geometry, material, reflectedLight );

	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance_1723231464811_0( ambientLightColor );
	irradiance += getLightProbeIrradiance_1723231464811_0( lightProbe, geometry.normal );
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
	iblIrradiance += getIBLIrradiance_1723231464811_0( geometry.normal );
	radiance += getIBLRadiance_1723231464811_0( geometry.viewDir, geometry.normal, material.roughness );
	RE_IndirectDiffuse_Physical_1723231464811_0( irradiance, geometry, material, reflectedLight );
	RE_IndirectSpecular_Physical_1723231464811_0( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
    diffuseColor.a = 1.0;
    vec4 ${fragName} = vec4( outgoingLight, diffuseColor.a );
    ${fragName}.rgb = toneMapping_1723231464811_0( ${fragName}.rgb );
    ${fragName} = linearToOutputTexel_1723231464811_0( ${fragName} );
    `;

  return { transform };
};
