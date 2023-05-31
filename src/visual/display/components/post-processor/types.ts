import { Camera } from "three";

export type PostProcessorCamera = Camera & {
  aspect: number;
};

export type Effects = {
  effectType: PostProcessorPasses;
  params: effectParam;
};
export enum PostProcessorPasses {
  BLOOM = "bloom",
}
export type effectParam = BloomPassParams;

export type BloomPassParams = {
  strength: number;
  radius: number;
  threshold: number;
};
