import { useCallback } from "react";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min.js";

const duration = 2000;

export const useTransform = (container, update) => {
  return useCallback(
    (targets: any[], objects: any[]) => {
      TWEEN.removeAll();
      objects.forEach((object: any, index: number) => {
        const target = targets[index];
        new TWEEN.Tween(object.position)
          .to(
            {
              x: target.position.x,
              y: target.position.y,
              z: target.position.z,
            },
            Math.random() * duration + duration
          )
          .easing(TWEEN.Easing.Exponential.InOut)
          .start();

        new TWEEN.Tween(object.rotation)
          .to(
            {
              x: target.rotation.x,
              y: target.rotation.y,
              z: target.rotation.z,
            },
            Math.random() * duration + duration
          )
          .easing(TWEEN.Easing.Exponential.InOut)
          .start();
      });

      new TWEEN.Tween(container.current)
        .to({}, duration * 2)
        .onUpdate(update)
        .start();
    },
    [container, update]
  );
};
