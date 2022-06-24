import { useMemo } from "react";
import { Color, Vector2, Vector3 } from "three";
import * as fragmentShaders from "visual/shaders/fragment-shaders";
import * as vertexShaders from "visual/shaders/vertex-shaders";
import {
  InteractiveParam,
  InteractiveScenes,
  InteractiveShaders,
  VanishingObjectUniforms,
} from "../../components/interactive-material/types";

export const useInteractiveMaterialParams = (sceneType: InteractiveScenes) =>
  useMemo(() => {
    const params: InteractiveParam = {
      sceneType: sceneType,
      uniforms: null,
      shaders: null,
    };
    switch (sceneType) {
      case InteractiveScenes.VANISHING_OBJECT:
        params.uniforms = vanishingObjectUniforms;
        params.shaders = getShaders(sceneType);
        break;
      case InteractiveScenes.INTERACTIVE_PARTICLES:
        params.uniforms = particleUniforms;
        params.shaders = getShaders(sceneType);
    }
    return params;
  }, [sceneType]);

const getShaders = (sceneType: InteractiveScenes): InteractiveShaders => {
  switch (sceneType) {
    case InteractiveScenes.VANISHING_OBJECT:
      return {
        fragmentShader: fragmentShaders.vanishingObjectFragment,
        vertexShader: vertexShaders.vanishingObjectVertex,
      };
    case InteractiveScenes.INTERACTIVE_PARTICLES:
      return {
        fragmentShader: fragmentShaders.interactiveParticleFragment,
        vertexShader: vertexShaders.interactiveParticlesVert,
      };
  }
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

const particleUniforms = {
  uTime: { value: 0 },
  uRandom: { value: 1.0 },
  uDepth: { value: 2.0 },
  uSize: { value: 0.0 },
  uTextureSize: { value: new Vector2(0, 0) },
  uTexture: { value: null },
  uTouch: { value: null },
};
