import { InteractiveScene } from "./InteractiveScene";

export type InteractiveSceneFunctions = {
  onTimeUpdate: (material: InteractiveScene) => void;
};
