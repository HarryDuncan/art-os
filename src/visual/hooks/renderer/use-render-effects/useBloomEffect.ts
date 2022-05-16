import { LinearFilter, RGBFormat, Vector2, WebGLRenderTarget } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";

export const useBloomEffect = (renderer) => {
  const parameters = {
    minFilter: LinearFilter,
    magFilter: LinearFilter,
    format: RGBFormat,
    stencilBuffer: true,
  };
  const renderTarget = new WebGLRenderTarget(
    window.innerHeight,
    window.outerHeight,
    parameters
  );

  const composer = new EffectComposer(renderer, renderTarget);

  const bloomStrength = 0.25;
  const bloomThreshold = 0;
  const bloomRadius = 0;

  const bloomPass = new UnrealBloomPass(
    new Vector2(window.innerWidth, window.innerHeight),
    1.0,
    0.4,
    0.85
  );
  bloomPass.threshold = bloomThreshold;
  bloomPass.strength = bloomStrength;
  bloomPass.radius = bloomRadius;
  composer.addPass(bloomPass);

  return composer;
};
