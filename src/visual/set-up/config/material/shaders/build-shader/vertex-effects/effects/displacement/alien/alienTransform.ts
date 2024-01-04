export const alienTransform = (transformName: string, pointName: string) => `
	float shift = 2.0
			* cnoise(vec2(3.0 * cos(atan(${transformName}.z, ${transformName}.x)), 2.0 * uTime + 3.0 * acos(${transformName}.y / uRadius)));
	vec4 ${pointName} = ${transformName} + normal * shift;
`;
