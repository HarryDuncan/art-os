import { InteractiveMaterialType } from "scenes/types";
import { Vector2 } from "three";
import { smoothStepTo } from "visual/helpers/animation/smooth-step/smoothStep";
import { INTERACTION_EVENTS } from "visual/helpers/interactions/const";
import { EventKey, InteractionKey } from "visual/helpers/interactions/types";

export const interactions = [
  {
    eventKey: EventKey.Position,
    interactionKey: INTERACTION_EVENTS.POSENET.LEFT_WRIST as InteractionKey,
    eventFunction: (material: InteractiveMaterialType, details) => {},
  },
];
