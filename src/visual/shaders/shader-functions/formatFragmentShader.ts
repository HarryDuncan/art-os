import * as FragmentShaders from "visual/shaders/fragment-shaders";
import { FragmentShader } from "visual/shaders/shaders.types";

const hidef = `#ifdef GL_ES
precision highp float;
#endif
`;
const main = `
  void main( void ){
    vec4 color = vec4(0.0,0.0,0.0,1.0);
    mainImage( color, vUv * uResolution.xy );
    color.w = 1.0;
    gl_FragColor = color;
  }`;
export const formatFragmentShader = (
  shaderName: string,
  uniformText = ""
): FragmentShader => {
  const shaderText = FragmentShaders[shaderName].frag;
  return {
    frag: `${hidef} ${uniformText} varying vec2 vUv; ${shaderText} ${main}`,
  };
};
