export const blobs = `
#define PI 3.14159265359;
#define TWO_PI 6.28318530718;


#define size 0.0240525;
#define lineSize 0.24540144;
#define blur 0.227794;
#define grid 9.510933;
#define morph 5.2208757;
#define delayAmount 3.223359;
#define delay2 6.429779;
#define speed 0.39144516;

const float tau = 6.28318530717958647692;

// Gamma correction
#define GAMMA (2.2);

vec3 ToLinear( in vec3 col )
{
	// simulate a monitor, converting colour values into light values
	return pow( col, vec3(GAMMA) );
}

vec3 ToGamma( in vec3 col )
{
	// convert back into colour values, so the correct light will come out of the monitor
	return pow( col, vec3(1.0/GAMMA) );
}


vec2 Noise( in vec3 x )
{
//x.z = .0;    
    vec3 p = floor(x);
    vec3 f = x-p;
	f = f*f*(3.0-2.0*f);
//	vec3 f2 = f*f; f = f*f2*(10.0-15.0*f+6.0*f2);

    vec2 uv = (p.xy+vec2(37.0,17.0)*p.z);

#if (1)
    uv += f.xy;
	vec4 rg = textureLod( iChannel0, (uv+0.5)/256.0, 0.0 );
	rg.yw = texture( iChannel0, (uv-vec2(37.0,17.0)+0.5)/256.0, -100.0 ).xz;
#else
	// on some hardware interpolation lacks precision
	vec4 rg = mix( mix(
				texture( iChannel0, (uv+0.5)/256.0, -100.0 ),
				texture( iChannel0, (uv+vec2(1,0)+0.5)/256.0, -100.0 ),
				f.x ),
				  mix(
				texture( iChannel0, (uv+vec2(0,1)+0.5)/256.0, -100.0 ),
				texture( iChannel0, (uv+1.5)/256.0, -100.0 ),
				f.x ),
				f.y );
#endif			  

	return mix( rg.yw, rg.xz, f.z ); // this doesn't seem to match up well any more, but it's close...
}


void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec2 uv = (fragCoord.xy-.5*uResolution.xy) / uResolution.x;
	
	vec2 blob = Noise( vec3(uv.x,uv.y*sqrt(3.0)*.5,uv.y*.5)*4.0 + uTime*vec3(0,-.1,.1) );
	
	const vec3 ink1 = vec3(.9,.6,.1);
	const vec3 ink2 = vec3(.9,.5,.8);
	
	vec3 col1 = pow(ink1,vec3(4.0*sqrt(max(0.0,(blob.x-0.5 * sin(uTime))*1.0))));
	vec3 col2 = pow(ink2,vec3(4.0*sqrt(max(0.0,(blob.y-0.6 *cos(uTime))*1.0))));
	
	fragColor = vec4(ToGamma(col1*col2),1);
}`;
