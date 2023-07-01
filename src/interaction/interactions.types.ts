import { InteractiveScene } from "visual/display/components/interactive-scene";
import InteractiveShaderMaterial from "visual/display/materials/interactive/InteractiveShaderMaterial";
import { EVENT_BINDING_TYPE } from "./interactions.consts";

export type Interactive = InteractiveScene | InteractiveShaderMaterial;
export type InteractionEventBinding = keyof typeof EVENT_BINDING_TYPE;

export type InteractionConfig = {
  eventKey: string;
  bindingType?: InteractionEventBinding;
};

export type FormattedInteractionConfig = InteractionConfig & {
  onEvent: (interactive: Interactive, details: unknown) => void;
};

export type InteractionEvent = Event & {
  detail: unknown;
};
