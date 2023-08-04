import { Scene } from "three";
import { EVENT_BINDING_TYPE, EVENT_BIND_TYPES } from "./interactions.consts";

export type InteractionEventBinding = keyof typeof EVENT_BINDING_TYPE;

export type InteractionConfig = {
  eventKey: string;
  bindingType?: InteractionEventBinding;
};

export type InteractionEvent = Event & {
  detail: unknown;
};

export interface EventConfig {
  eventKey: string;
  eventFunction: (scene: Scene, event: Event) => void;
  sceneIdentifer?: string;
}

export type BindType = typeof EVENT_BIND_TYPES;
export type BindTypeKey = keyof BindType;
