import { Scene } from "three";
import { AnimationConfig } from "visual/helpers/animation/animation.types";

export type CustomAnimation = {
  animationId: string;
  animationFunction: any;
  isRunning?: boolean;
};

export interface AnimationFunctionProps {
  scene: Scene;
  targetIdentifier: string;
  animationConfig: AnimationConfig;
}
