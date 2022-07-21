import { Camera } from "three";

export type PostProcessorCamera = Camera & {
  aspect: number;
};

export enum PostProcessorPasses {
  BLOOM = "bloom",
}
