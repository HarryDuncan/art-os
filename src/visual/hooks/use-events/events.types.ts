import { EVENT_BIND_TYPES } from "./consts";

export interface EventConfig {
  eventKey: string;
  eventFunction: (scene, event) => void;
  sceneIdentifer?: string;
}

export interface UseEventProps {
  events: EventParam[];
  props;
}

export type BindType = typeof EVENT_BIND_TYPES;
export type BindTypeKey = keyof BindType;

export interface EventParam {
  bindType: BindTypeKey;
  key: string;
  onEventFire: (props) => void;
  props?;
}
