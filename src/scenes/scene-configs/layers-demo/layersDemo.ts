import { defaultPosition } from "scenes/default-configs/interaction-events/defaultPosition";
import { getShaderParams } from "scenes/default-configs/interactiveWebGLMaterialParams";
import { Layers } from "./layers";

export const layersDemo = () => ({
  materialParams: getShaderParams("brownPlasma"),
  interactions: defaultPosition,
  layers: Layers,
});
