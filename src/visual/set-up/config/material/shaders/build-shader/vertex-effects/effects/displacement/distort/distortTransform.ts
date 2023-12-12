export const distortTransform = (transformName: string, pointName: string) => `
    float howFarUp = ${transformName}.y;
    vec3 cXaxis = vec3(1.0, 0.0, 0.0);
    vec3 cYaxis = vec3(0.0, 1.0, 0.0);
    vec3 cZaxis = vec3(0.0, 0.0, 1.0);
    vec3 directionVec = normalize(vec3(${transformName}.xyz));
    
	float xangle = dot(cXaxis, directionVec) * 5.0;
	float yangle = dot(cYaxis, directionVec) * 6.0;
	float zangle = dot(cZaxis, directionVec) * 4.5;
	float mTime = uTime * 1.05;
	
	float cosx = cos(mTime + xangle);
	float sinx = sin(mTime + xangle);
	float cosy = cos(mTime + yangle);
	float siny = sin(mTime + yangle);
	float cosz = cos(mTime + zangle);
	float sinz = sin(mTime + zangle);

    vec3 timeVec = position;
	timeVec.x += directionVec.x * cosx * siny * cosz * uStrength;
	timeVec.y += directionVec.y * sinx * cosy * sinz * uStrength;
	timeVec.z += directionVec.z * sinx * cosy * cosz * uStrength;

    
    float twistAngle = uAngle * howFarUp;
    vec4 ${pointName} = twister( vec4( position, 1.0 ), twistAngle );
    vec4 twistedNormal = twister( vec4( normal, 1.0 ), twistAngle);
`;
