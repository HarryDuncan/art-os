import { defaultThreeDVertex } from "../../default/defaultThreeDVertex";
import { defaultUniforms } from "../../interactive-particles/defaultUniforms";
import { fragmentShader } from "./fragmentShader";

export const plasma = {
  fragmentShader,
  vertexShader: defaultThreeDVertex,
  defaultUniforms,
};
