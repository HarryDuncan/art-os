import { particleRainFrag } from "visual/shaders/fragment-shaders";
import { particleRainVertex } from "visual/shaders/vertex-shaders";

export const materialParams = {
  shaders: {
    vertexShader: particleRainVertex,
    fragmentShader: particleRainFrag,
  },
};
