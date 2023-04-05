import { getMeshesByIdentifier } from "visual/helpers/scene/object-finding/getMeshesByIdentifier";
import { EVENT_TYPES, KEY_CODES } from "visual/hooks/use-events/consts";
import { EventConfig } from "visual/hooks/use-events/events.types";
import computeConfig from "./config.json";
import { SceneDataConfig } from "scenes/config-helpers/config.types";
import { getMaterialsFromConfig } from "scenes/config-helpers/material/getMaterialsFromConfig";
import { CONFIG_INDEX } from "../constants";
import { getMeshByName } from "visual/helpers/scene/object-finding/getMeshByName";

export const events = [
  {
    eventKey: EVENT_TYPES.KEYPRESS,
    sceneIdentifer: "geometry",
    eventFunction: (scene, event) => {
      const { charCode } = event;
      switch (charCode) {
        case KEY_CODES.space:
          const curves = getMeshesByIdentifier(scene, "curve");
          swapColors(curves);
          const mesh = getMeshByName(scene, "nymph-geometry");
          if (mesh) {
            swapColors([mesh]);
            mesh.rotateY(70);
          }
          break;
        default:
          console.log(charCode);
      }
    },
  },
] as EventConfig[];

const swapColors = (meshes) => {
  const config = computeConfig[CONFIG_INDEX] as SceneDataConfig;
  const materials = getMaterialsFromConfig(config).flatMap((material) =>
    material.name.indexOf("color") !== -1 ? material : []
  );
  meshes.forEach((mesh) => {
    if (mesh.material.name === "phong-color-two") {
      mesh.material = materials[0];
    } else {
      mesh.material = materials[1];
    }
  });
};
