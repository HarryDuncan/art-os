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
const positionUpdateFunction = (scene: InteractiveScene, eventDetails) => {
  const positions = eventDetails;
  const animatedObjects = getSceneElementByName(scene, TARGET_IDENTIFIER);
  const random = Math.random();
  if (animatedObjects[0] && positions[0] && random < 0.3) {
    const { x, y } = positions[0];
    const xPos = getValueFromPercentage(x, xC - rad, xC + rad);
    const yPos = getValueFromPercentage(y, yC - rad, yC + rad);
    updateObjectUniformByKey(
      animatedObjects[0],
      "uPosition",
      new Vector3(xPos, yPos, 0)
    );
  }
};

export const positionUpdateInteraction = {
  eventKey: EXTERNAL_INTERACTION_EVENT_KEYS.POSITION_UPDATE,
  onEvent: positionUpdateFunction,
};
const xC = -0.0060863494873046875;
const yC = 1.2412681579589844;
const rad = 34.856733081855715;
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
