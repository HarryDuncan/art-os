import { getMeshByName } from "visual/helpers/scene/object-finding/getMeshByName";
import { EVENT_TYPES, KEY_CODES } from "visual/hooks/use-events/consts";
import { EventConfig } from "visual/hooks/use-events/events.types";

export const events = [
  {
    eventKey: EVENT_TYPES.KEYPRESS,
    sceneIdentifer: "geometry",
    eventFunction: (scene, event) => {
      const { charCode } = event;
      switch (charCode) {
        case KEY_CODES.space:
          const mesh = getMeshByName(scene, "nymph-geometry");
          if (mesh) {
            mesh.rotateY(70);
          }

          break;
        default:
          console.log(charCode);
      }
    },
  },
] as EventConfig[];
