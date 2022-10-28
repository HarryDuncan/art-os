import { InteractiveMaterialType } from "scenes/types";
import { EVENT_TYPES, KEY_CODES } from "visual/hooks/use-events/consts";

export const events = [
  {
    eventKey: EVENT_TYPES.KEYPRESS,
    eventFunction: (material: InteractiveMaterialType, event) => {
      const { charCode } = event;
      if (charCode === KEY_CODES.space) {
        material.uniforms.uColor.value += 200;
      }
    },
  },
];
