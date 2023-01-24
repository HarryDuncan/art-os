import { Vector2 } from "three";
import { InteractiveShaderTypes } from "visual/components/interactive-shaders/types";
import { MATERIAL_TYPES } from "visual/helpers/assets/geometry/types";
import { attractionMorphingFrag } from "visual/shaders/fragment-shaders";
import { attractionMorphingVertex } from "visual/shaders/vertex-shaders";

// Here we get the geometry, material type and hook it up to our shader uniforms
export const getMeshConfigs = (geometry, matcapTexture) => {
  const SHADER_UNIFORMS = {
    uTime: {
      type: "f",
      value: 0.0,
    },
    uFrame: {
      type: "f",
      value: 0.0,
    },
    uResolution: {
      type: "v2",
      value: new Vector2(window.innerWidth, window.innerHeight).multiplyScalar(
        window.devicePixelRatio
      ),
    },
    matcap: { value: matcapTexture.data },
    uPosition: {
      type: "v2",
      value: new Vector2(50, 50),
    },
    uMouse: {
      type: "v2",
      value: new Vector2(
        0.7 * window.innerWidth,
        window.innerHeight
      ).multiplyScalar(window.devicePixelRatio),
    },
  };

  const meshConfigs = [
    {
      materialType: MATERIAL_TYPES.interactive,
      ...geometry[0],
      materialParameters: {
        shaderType: InteractiveShaderTypes.SHADER,
        shaders: {
          vertexShader: attractionMorphingVertex,
          fragmentShader: attractionMorphingFrag,
        },
        uniforms: SHADER_UNIFORMS,
      },
    },
  ];
  return meshConfigs;
};
