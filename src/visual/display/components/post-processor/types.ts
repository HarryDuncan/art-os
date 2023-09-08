import { Camera } from "three";

export type PostProcessorCamera = Camera & {
  aspect: number;
};

export enum PostProcessorPasses {
  BLOOM,
}

export type Effects = {
  effectType: PostProcessorPasses;
  params: effectParam;
};

export type effectParam = BloomPassParams;

export type BloomPassParams = {
  strength: number;
  radius: number;
  threshold: number;
};
