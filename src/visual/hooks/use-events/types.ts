import { EVENT_BIND_TYPES } from "./consts";

export interface IUseEventProps {
  events: EventParam[];
  props: any;
}

export type BindType = typeof EVENT_BIND_TYPES;
export type BindTypeKey = keyof BindType;
export interface EventParam {
  bindType: BindTypeKey;
  key: string;
  onEventFire: (props: any) => void;
  props?: any;
}
