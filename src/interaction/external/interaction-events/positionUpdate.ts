import { InteractiveScene } from "visual/display/components/interactive-scene/InteractiveScene";
import { EXTERNAL_INTERACTION_EVENT_KEYS } from "../interactions.constants";
import { getSceneElementByName } from "visual/utils/scene/getSceneElementByName";
import { updateObjectUniformByKey } from "visual/display/animation/animation-functions/shader-animations/uniforms/updateObjectUniformByKey";
import { Vector3 } from "three";

export type Position = {
  x: number;
  y: number;
};
const TARGET_IDENTIFIER = "geometry";
const UPDATE_THRESHOLD = 0.85;
const DURATION = 50;
const POSITION_DISTANCE = 0.5;
const xC = -0.0060863494873046875;
const yC = 1.2412681579589844;
const rad = 34.856733081855715;

const positionUpdateFunction = (scene: InteractiveScene, eventDetails) => {
  const positions = eventDetails;
  const animatedObjects = getSceneElementByName(scene, TARGET_IDENTIFIER);
  const random = Math.random();
  if (animatedObjects[0] && positions[0] && random < UPDATE_THRESHOLD) {
    const { x, y } = positions[0];
    const xPos = getValueFromPercentage(x, xC - rad, xC + rad);
    const yPos = getValueFromPercentage(y, yC - rad, yC + rad);
    const pos = new Vector3(xPos, yPos, 0);
    slideTo(pos, animatedObjects[0]);
  }
};

export const positionUpdateInteraction = {
  eventKey: EXTERNAL_INTERACTION_EVENT_KEYS.POSITION_UPDATE,
  onEvent: positionUpdateFunction,
};

const getValueFromPercentage = (
  percentage: number,
  startValue: number,
  endValue: number
): number => {
  if (!percentage) {
    return 0;
  }
  const difference = endValue - startValue;
  const value = startValue + difference * percentage;
  return Number(value.toFixed(2));
};

const slideTo = (targetPosition: Vector3, mesh) => {
  const currentPos = mesh.material.uniforms.uPosition.value;
  let distance = 0;
  if (targetPosition) {
    distance = currentPos.distanceTo(targetPosition);
  }

  const animateMovement = () => {
    let startTime: number;
    const duration = DURATION;
    const stepValue = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const t = progress / duration;
      const x = currentPos.x + (targetPosition.x - currentPos.x) * t;
      const y = currentPos.y + (targetPosition.y - currentPos.y) * t;
      const z = 0;
      const newPos = new Vector3(x, y, z);
      updateObjectUniformByKey(mesh, "uPosition", newPos);
      if (progress < duration) {
        requestAnimationFrame(stepValue);
      }
    };
    requestAnimationFrame(stepValue);
  };
  if (distance > POSITION_DISTANCE) {
    animateMovement();
  }
};
