import * as FragmentShaders from "./shaders";

const main = `void main( void ){
    vec4 color = vec4(0.0,0.0,0.0,1.0);
    mainImage( color, vUv * iResolution.xy );
    color.w = 1.0;
    gl_FragColor = color;
  }`;
export const useFragmentShader = (
  shaderName: string,
  uniformText: string = ""
): string => {
  const shader = FragmentShaders[shaderName].frag as string;
  return `${uniformText} varying vec2 vUv; ${shader} ${main}`;
};
