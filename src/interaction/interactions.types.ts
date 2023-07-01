import { EVENT_BINDING_TYPE } from "./interactions.consts";

export type InteractionEventBinding = keyof typeof EVENT_BINDING_TYPE;

export type InteractionConfig = {
  eventKey: string;
  bindingType?: InteractionEventBinding;
};

export type InteractionEvent = Event & {
  detail: unknown;
};
