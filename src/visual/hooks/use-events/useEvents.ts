import { useEffect } from "react";
import { EVENT_BIND_TYPES } from "./consts";
import { UseEventProps } from "./types";

export const useEvents = (eventParams: UseEventProps) =>
  useEffect(() => {
    eventParams.events.forEach(({ bindType, key, onEventFire, props }) => {
      switch (bindType) {
        case EVENT_BIND_TYPES.DOCUMENT:
          document.addEventListener(key, (e) => onEventFire({ e, props }));
          break;
        case EVENT_BIND_TYPES.WINDOW:
          window.addEventListener(key, (e) => onEventFire({ e, props }));
          break;
        default:
          return null;
      }
    });
  }, [eventParams]);

export const ev = (eventName, data?) => {
  const e = new CustomEvent(eventName, { detail: data });
  document.dispatchEvent(e);
};
