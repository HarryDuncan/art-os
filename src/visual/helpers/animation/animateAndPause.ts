import { degreesToEuler } from "../three-dimension-space/degreesToEuler";

const ANIMATION_DURATION = 2000;
const ANIMATION_PAUSE = 1000;
export const animateAndPause = ({ object }) => {
  let startTime: number;

  function easeOut(t: number) {
    const theta =
      t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    return theta;
  }

  function step(timestamp: number) {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    const rotation = degreesToEuler(
      easeOut(progress / ANIMATION_DURATION) * 360
    );
    const currentRotation = object.rotation.x;
    object.rotateX(rotation - currentRotation);
    if (progress < ANIMATION_DURATION) {
      requestAnimationFrame(step);
    } else {
      startTime = 0;
      setTimeout(() => {
        requestAnimationFrame(step);
      }, ANIMATION_PAUSE);
    }
  }

  requestAnimationFrame(step);
};
