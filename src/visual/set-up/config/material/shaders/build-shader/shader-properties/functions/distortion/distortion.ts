export const twisterDistortion = `
vec4 twister( vec4 pos, float t ) {
	float st = sin(t);
	float ct = cos(t);
	vec4 new_pos = vec4( pos );
	
	new_pos.x = pos.x*ct - pos.z*st;
	new_pos.z = pos.x*st + pos.z*ct;
	
	new_pos.y = pos.y;
	new_pos.w = pos.w;

	return new_pos;
}`;

export const smoothMod = `float smoothMod(float axis, float amp, float rad){
    float top = cos(3.1415926535897932384626433832795 * (axis / amp)) * sin(3.1415926535897932384626433832795 * (axis / amp));
    float bottom = pow(sin(3.1415926535897932384626433832795 * (axis / amp)), 2.0) + pow(rad, 2.0);
    float at = atan(top / bottom);
    return amp * (1.0 / 2.0) - (1.0 / 3.1415926535897932384626433832795) * at;
}`;

export const fitPosition = `float fitPosition(float unscaled, float originalMin, float originalMax, float minAllowed, float maxAllowed) {
  return (maxAllowed - minAllowed) * (unscaled - originalMin) / (originalMax - originalMin) + minAllowed;
}`;

export const wavePattern = `float wavePattern(vec3 position) {
  return fitPosition(smoothMod(position.y * uDensity, 1.0, 1.5), 0.35, 0.73, 0.0, 1.0);
}`;
export const displaceByNoise = `float displaceByNoise(vec3 point) {
	vec3 coords = point;
	coords.xy += 1.0 * uTime;
	vec3 noisePattern = vec3(transitionalNoise(coords * 2.));
	float pattern = wavePattern(noisePattern);
	return pattern;
  }`;
export const frostedTips = `vec4 frostedTips(vec2 vUv) {
	float displaced = displaceByNoise(vPosition);
	float colorOut = clamp((displaced - 0.5) * 10.0, 0.0, 1.0);
	return vec4(uInColor * vec3(colorOut), 1.0);
  }`;
