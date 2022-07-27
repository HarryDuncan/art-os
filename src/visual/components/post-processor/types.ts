import { Camera } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";

export type PostProcessorCamera = Camera & {
  aspect: number;
};

export enum PostProcessorPasses {
  BLOOM = "bloom",
}

export type ExtendedEffectComposer = EffectComposer & {};
