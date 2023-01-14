import { CustomAnimation } from "./animationManager.types";

export class AnimationManager {
  animations: CustomAnimation[];

  constructor() {
    this.animations = [];
  }
  initializeAnimations(animations: CustomAnimation[]) {
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
  startAnimation(
    animationId: string,
    animationFunctionProps: Record<string, unknown>
  ) {
    const animation = this.animations.find(
      (animation) => animation.animationId === animationId
    );
    if (!animation) {
      console.warn(`animation: ${animationId} has not been initialized`);
      return;
    } else {
      if (!animation.isRunning) {
        console.log("tt");
        animation.isRunning = true;
        animation.animationFunction(animationFunctionProps);
      }
    }
  }
  stopAnimation() {}
}
