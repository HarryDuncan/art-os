import { InteractiveScene } from "./InteractiveScene";
import { InteractiveSceneFunctions } from "./types";

export const defaultInteractiveSceneFunctions: InteractiveSceneFunctions = {
  onTimeUpdate: (scene: InteractiveScene) => {
    console.warn("you havent set an onTimeUpdateFunction");
  },
};
