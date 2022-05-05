import * as THREE from "three";
import { UniformParams } from "../useWebGLShader";

export const useUniforms = (uniformParams: UniformParams = {}) => {
  let uniforms = {
    iTime: { value: 0.0, uniformType: "float" },
    iResolution: {
      type: "v3",
      value: new THREE.Vector3(),
      uniformType: "vec3",
    },
    ...uniformParams,
  };

  // choose a resolution to pass to the shader
  uniforms.iResolution.value.x = window.innerWidth;
  uniforms.iResolution.value.y = window.innerHeight;

  const uniformText = getUniformText(uniforms);
  return { uniforms, uniformText };
};

const getUniformText = (uniforms) => {
  const keys = Object.keys(uniforms);
  let uniformString = "";
  keys.forEach((key) => {
    uniformString += `uniform ${uniforms[key].uniformType} ${key};`;
  });

  return uniformString;
};
