export const checkerBlobs = {
  tags: ['noUniforms'],
  frag: `void mainImage( out vec4 fragColor, in vec2 fragCoord )
    {
        float time = uTime * 1.;									// adjust time
        vec2 uv = (2. * fragCoord - uResolution.xy) / uResolution.y;	// center coordinates
        float timeOsc = sin(time) * 0.05;								// oscillation helper
        float dist = 0.;												// start distance count from 0
        for(float i=10.; i < 60.; i++) {								// create x control points
            float rads = timeOsc + i;									// get rads for control point
            vec2 ctrlPoint = vec2(sin(rads), cos(rads));				// control points in a circle 
            ctrlPoint *= abs(cos(rads)) * 5.;							// oscillate control point radius - the magic happens w/abs()
            dist += sin(i + 35. * distance(uv, ctrlPoint));				// sum up oscillated distance between control points
        }
        fragColor = vec4(vec3(dist),1.0);
    }
    `,
};
