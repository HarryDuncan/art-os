import { Vector2 } from "three";
import {
  InteractiveParam,
  InteractiveScenes,
} from "visual/components/interactive-material/types";
import { interactiveParticleFragment } from "visual/shaders/fragment-shaders";
import { interactiveParticlesVertex } from "visual/shaders/vertex-shaders";

export const materialParams: InteractiveParam = {
  sceneType: InteractiveScenes.INTERACTIVE_PARTICLES,
  uniforms: {
    uTime: { value: 0 },
    uRandom: { value: 1.0 },
    uDepth: { value: 2.0 },
    uSize: { value: 0.0 },
    uTextureSize: { value: new Vector2(0, 0) },
    uTexture: { value: null },
    uTouch: { value: null },
    uTouchRef: { value: null },
  },
  shaders: {
    fragmentShader: interactiveParticleFragment,
    vertexShader: interactiveParticlesVertex,
  },
};
