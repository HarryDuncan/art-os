import { clamp } from "utils";
import { degreesToEuler } from "visual/helpers/three-dimension-space/degreesToEuler";
import { AXIS } from "visual/helpers/three-dimension-space/position/position.types";
import { rotateText } from "../rotation/rotation";

const ANIMATION_DURATION = 1000;
const ANIMATION_PAUSE = 100;

export const chainAnimation = (objects) => {
  let startTime: number;
  let currentItemIndex = 0;
  function easeOut(t: number) {
    const theta =
      t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    return theta;
  }

  function step(timestamp: number) {
    const object = objects[currentItemIndex];
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    const rotation = degreesToEuler(
      easeOut(progress / ANIMATION_DURATION) * 360
    );
    const currentRotation = object.rotation.x;
    rotateText(object, AXIS.X, rotation - currentRotation);
    if (progress < ANIMATION_DURATION) {
      requestAnimationFrame(step);
    } else {
      startTime = 0;
      currentItemIndex = clamp(currentItemIndex + 1, 0, objects.length - 1);
      setTimeout(() => {
        requestAnimationFrame(step);
      }, ANIMATION_PAUSE);
    }
  }

  requestAnimationFrame(step);
};
