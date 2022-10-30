import { interactions } from "./interactions/interactionEvents";
import { events } from "./events/events";
import { deepWavesMaterialParams } from "scenes/default-configs/interactiveWebGLMaterialParams";

export const deepWaveScene = () => ({
  materialParams: deepWavesMaterialParams,
  interactions,
  events,
});
