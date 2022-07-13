import { Color, Vector2, Vector3 } from "three";
import {
  InteractiveParam,
  InteractiveScenes,
  VanishingObjectUniforms,
} from "visual/components/interactive-shaders/types";
import { vanishingObjectFragment } from "visual/shaders/fragment-shaders";
import { vanishingObjectVertex } from "visual/shaders/vertex-shaders";

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

export const vanishingObjectMaterialParams: InteractiveParam = {
  sceneType: InteractiveScenes.VANISHING_OBJECT,
  uniforms: vanishingObjectUniforms,
  shaders: {
    fragmentShader: vanishingObjectFragment,
    vertexShader: vanishingObjectVertex,
  },
};
