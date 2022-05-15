import { useEffect } from "react";
import { dummyEvent, EVENT_BIND_TYPES } from "./consts";
import { IUseEventProps } from "./types";

export const useEvents = (eventParams: IUseEventProps) =>
  useEffect(() => {
    eventParams.events.forEach(({ bindType, key, onEventFire, props }) => {
      switch (bindType) {
        case EVENT_BIND_TYPES.DOCUMENT:
          document.addEventListener(key, (e) =>
            onEventFire ? onEventFire({ e, props }) : dummyEvent
          );
        case EVENT_BIND_TYPES.WINDOW:
          window.addEventListener(key, (e) =>
            onEventFire ? onEventFire({ e, props }) : dummyEvent
          );
      }
    });
  }, []);

export const ev = (eventName, data?, once = false) => {
  const e = new CustomEvent(eventName, { detail: data });
  document.dispatchEvent(e);
};
