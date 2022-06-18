import { Color, Vector2, Vector3 } from "three";
import { vanishingObjectFragment } from "visual/shaders/fragment-shaders/vanishingObjectFrag";
import { vanishingObjectVertex } from "visual/shaders/vertex-shaders";
import {
  InteractiveParam,
  InteractiveScenes,
  InteractiveShaders,
  VanishingObjectUniforms,
} from "./types";

export const useInteractiveMaterialParams = (sceneType: InteractiveScenes) => {
  const params: InteractiveParam = {
    sceneType: sceneType,
    uniforms: null,
    shaders: null,
  };
  switch (sceneType) {
    case InteractiveScenes.VANISHING_OBJECT:
      params.uniforms = vanishingObjectUniforms;
      params.shaders = getShaders(sceneType);
  }
  return params;
};

const getShaders = (sceneType: InteractiveScenes): InteractiveShaders => {
  return {
    fragmentShader: vanishingObjectFragment,
    vertexShader: vanishingObjectVertex,
  };
};

const vanishingObjectUniforms: VanishingObjectUniforms = {
  matcap: { value: null },
  progress: { value: 0.5 },
  color: { value: new Color(0xffcf79) },
  particleDiffusion: { value: 1 },
  baseNoiseIteration: { value: 5 },
  noiseDiffusion: { value: 0.76 },
  noisePrecision: { value: 2.61 },
  lightningDiffusion: { value: 0.01 },
  lightningThickness: { value: 0.79 },
  lightningPower: { value: 0.07 },
  vanishDirection: { value: new Vector2(-1, 0) },
  time: { value: 0 },
  size: { value: new Vector3() },
  delta: { value: 0.01 },
};

// const PARAMS =

// useBloom: true,

// bloom: {
//   strength: 2,
//   radius: 0.16,
//   threshold: 0.7,
// },
