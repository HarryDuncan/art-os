import { InteractiveMaterialType } from "scenes/types";
import { EVENT_TYPES, KEY_CODES } from "visual/hooks/use-events/consts";

export const events = [
  {
    eventKey: EVENT_TYPES.KEYPRESS,
    eventFunction: (material: InteractiveMaterialType, event) => {
      const { charCode } = event;
      if (charCode === KEY_CODES.x) {
        material.uniforms.uSpace.value += 0.3;
      }
      if (charCode === KEY_CODES.z) {
        material.uniforms.uSpace.value -= 0.3;
      }
      if (charCode === KEY_CODES.one) {
        material.uniforms.uOverlayIndex.value -= 1;
        if (material.uniforms.uOverlayIndex.value < 0) {
          material.uniforms.uOverlayIndex.value = 0;
        }
      }
      if (charCode === KEY_CODES.two) {
        material.uniforms.uOverlayIndex.value += 1;
        if (
          material.uniforms.uOverlayIndex.value >
          material.uniforms.uOverlayTextures.value.length - 1
        ) {
          material.uniforms.uOverlayIndex.value = 0;
        }
      }
    },
  },
];
