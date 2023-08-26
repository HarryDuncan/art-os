import { Camera } from "three";
import { CustomAnimationConfig } from "../animation.types";
import { runAnimation } from "../run-animation/runAnimation";
import { setUpAnimationConfig } from "./setUpAnimationConfig";
import { GENERIC_TARGET_IDENTIFIERS } from "../animation.constants";
import { runCameraAnimation } from "../run-animation/runCameraAnimation";
import { InteractiveScene } from "visual/display/components/interactive-scene/InteractiveScene";

export class AnimationManager {
  sceneElementAnimations: CustomAnimationConfig[];

  cameraElementAnimations: CustomAnimationConfig[];

  constructor() {
    this.sceneElementAnimations = [];
    this.cameraElementAnimations = [];
  }

  initializeAnimations(animations: CustomAnimationConfig[]) {
    animations.forEach((animation) => {
      if (
        this.sceneElementAnimations.findIndex(
          (setAnimation) => setAnimation.animationId === animation.animationId
        ) !== -1
      ) {
        console.warn(
          `an animation with this animation id ${animation.animationId} already exists`
        );
      } else if (
        animation.targetIdentifier === GENERIC_TARGET_IDENTIFIERS.CAMERA
      ) {
        this.cameraElementAnimations.push({ ...animation, isRunning: false });
      } else {
        this.sceneElementAnimations.push({ ...animation, isRunning: false });
      }
    });
  }

  startAnimation(scene: InteractiveScene, animationId: string) {
    const animation = this.sceneElementAnimations.find(
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

  hasCameraAnimations() {
    return this.cameraElementAnimations.length > 0;
  }

  startCameraAnimation(camera: Camera) {
    // TODO - set up methods for multiple camera animations
    const animation = this.cameraElementAnimations[0];
    if (!animation) {
      console.warn(`no camera animations configured`);
    }
    if (animation.isRunning === false) {
      const { animationConfig, animationFunctionType } = animation;
      const initializedAnimationConfig = setUpAnimationConfig(animationConfig);
      animation.isRunning = true;
      runCameraAnimation(
        camera,
        animationFunctionType,
        initializedAnimationConfig
      );
    }
  }

  stopAnimation(animationId: string) {
    const animation = this.sceneElementAnimations.find(
      (configuredAnimation) => configuredAnimation.animationId === animationId
    );
    if (animation) {
      animation.isRunning = false;
    }
  }
}
