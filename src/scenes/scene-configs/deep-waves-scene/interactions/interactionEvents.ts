import { InteractiveMaterialType } from "scenes/types";
import { INTERACTION_EVENTS } from "visual/helpers/interactions/const";
import { EventKey, InteractionKey } from "visual/helpers/interactions/types";

export const interactions = [
  {
    eventKey: EventKey.Position,
    interactionKey: INTERACTION_EVENTS.POSENET.LEFT_WRIST as InteractionKey,
    eventFunction: (_material: InteractiveMaterialType, _details) => {
      console.warn("not set");
    },
  },
];
