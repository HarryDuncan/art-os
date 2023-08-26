import { defaultVertex } from "../../default/defaultVertex";
import { defaultUniforms } from "../../interactive-particles/defaultUniforms";
import { fragmentShader } from "./fragmentShader";

export const plasma = {
  fragmentShader,
  vertexShader: defaultVertex,
  defaultUniforms,
};
