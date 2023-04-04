import { Scene } from "three";
import { CustomAnimationConfig } from "../animation.types";
import { runAnimation } from "../run-animation/runAnimation";
import { setUpAnimationConfig } from "./setUpAnimationConfig";

export class AnimationManager {
  animations: CustomAnimationConfig[];

  constructor() {
    this.animations = [];
  }

  initializeAnimations(animations: CustomAnimationConfig[]) {
    animations.forEach((animation) => {
      if (
        this.animations.findIndex(
          (setAnimation) => setAnimation.animationId === animation.animationId
        ) !== -1
      ) {
        console.warn(
          `an animation with this animation id ${animation.animationId} already exists`
        );
      } else {
        this.animations.push({ ...animation, isRunning: false });
      }
    });
  }

  startAnimation(scene: Scene, animationId: string) {
    const animation = this.animations.find(
      (configuredAnimation) => configuredAnimation.animationId === animationId
    );
    if (!animation) {
      console.warn(`animation: ${animationId} has not been initialized`);
    } else if (animation?.isRunning === false) {
      const {
        animationConfig,
        targetIdentifier,
        animationFunctionType,
      } = animation;
      const initializedAnimationConfig = setUpAnimationConfig(animationConfig);
      animation.isRunning = true;
      runAnimation(
        scene,
        animationFunctionType,
        targetIdentifier,
        initializedAnimationConfig,
        animationId
      );
    }
  }

  stopAnimation(animationId: string) {
    const animation = this.animations.find(
      (configuredAnimation) => configuredAnimation.animationId === animationId
    );
    if (animation) {
      animation.isRunning = false;
    }
  }
}
