/* eslint import/namespace: ['error', { allowComputed: true }] */
import * as Shaders from "../shaders";

export const importShader = (
  shaderId: string,
  vertexShaderId: string | undefined,
  fragmentShaderId: string | undefined
) => {
  try {
    // @ts-ignore - not ideal but will replace with build shader
    const {
      fragmentShader: defaultFragmentShader,
      vertexShader,
      defaultUniforms,
    } = Shaders[shaderId];
    if (vertexShaderId) {
      // todo -import vertex shader
    }
    const fragmentShader = getFragmentShader(
      defaultFragmentShader,
      fragmentShaderId
    );

    return { fragmentShader, vertexShader, defaultUniforms };
  } catch {
    console.error(`${shaderId} not a valid shader`);
    return { fragmentShader: "", vertexShader: "", defaultUniforms: {} };
  }
};

const getFragmentShader = (defaultFragmentShader, fragmentShaderId) => {
  if (fragmentShaderId) {
    const { fragmentShader } = Shaders[fragmentShaderId];
    return fragmentShader;
  }
  return defaultFragmentShader;
};
