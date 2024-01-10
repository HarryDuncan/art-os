import { Vector3, BufferGeometry } from "three";
import { updateObjectUniformByKey } from "visual/display/animation/animation-functions/shader-animations/uniforms/updateObjectUniformByKey";
import { InteractiveScene } from "visual/display/components/interactive-scene/InteractiveScene";
import { getSceneElementByName } from "visual/utils/scene/getSceneElementByName";
import { getCentroid } from "visual/utils/three-dimension-space/getCentroid";
import { EXTERNAL_INTERACTION_EVENT_KEYS } from "../interactions.constants";

export type Position = {
  x: number;
  y: number;
};
const TARGET_IDENTIFIER = "geometry";
const UPDATE_THRESHOLD = 0.85;
const DURATION = 50;
const POSITION_DISTANCE = 0.2;

const sceneDimensions = { x: 0, y: 0, radiusX: 0, radiusY: 0 };
let isCalculated = false;
const positionUpdateFunction = (scene: InteractiveScene, eventDetails) => {
  const positions = eventDetails;

  const animatedObjects = getSceneElementByName(scene, TARGET_IDENTIFIER);
  if (!isCalculated) {
    calculateEffectParams(animatedObjects);
  }
  const random = Math.random();
  if (animatedObjects[0] && positions[0] && random < UPDATE_THRESHOLD) {
    const { x, y } = positions[0];
    const xPos = getValueFromPercentage(
      x,
      sceneDimensions.x - sceneDimensions.radiusX,
      sceneDimensions.radiusX + sceneDimensions.radiusX
    );
    const yPos = getValueFromPercentage(
      y,
      sceneDimensions.y - sceneDimensions.radiusY,
      sceneDimensions.y + sceneDimensions.radiusY
    );
    const pos = new Vector3(xPos, yPos, 0);
    slideTo(pos, animatedObjects[0]);
  }
};

const calculateEffectParams = (animatedObjects) => {
  const obj = animatedObjects[0];
  const { geometry }: { geometry: BufferGeometry } = obj;
  const max = geometry.boundingBox?.max ?? new Vector3(0, 0, 0);
  const min = geometry.boundingBox?.min ?? new Vector3(0, 0, 0);
  const center = getCentroid([max, min]);
  isCalculated = true;
  sceneDimensions.x = center.x;
  sceneDimensions.y = center.y;
  sceneDimensions.radiusX = Math.abs(max.x - center.x);
  sceneDimensions.radiusY = Math.abs(max.y - center.y);
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
