import { deepWavesMaterialParams } from "scenes/default-configs/interactiveWebGLMaterialParams";
import { interactionEvents } from "./interactions/interactions";

export const layersDemo = () => ({
  materialParams: deepWavesMaterialParams,
  interactions: interactionEvents,
  layers: [],
});
