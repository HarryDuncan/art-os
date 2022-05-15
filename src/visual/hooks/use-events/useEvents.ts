import { useCallback, useEffect } from "react";
import { getWindowParams } from "visual/helpers/getWindowParams";
import { EVENT_BIND_TYPES } from "./consts";
import { IUseEventProps } from "./types";

export const useEvents = (eventParams: IUseEventProps) =>
  useEffect(() => {
    console.log("test");
    eventParams.events.forEach(({ bindType, key, onEventFire, props }) => {
      switch (bindType) {
        case EVENT_BIND_TYPES.DOCUMENT:
          document.addEventListener(key, (e) => onEventFire({ e, props }));
      }
    });
  }, [eventParams]);

export const ev = (eventName, data?, once = false) => {
  const e = new CustomEvent(eventName, { detail: data });
  document.dispatchEvent(e);
};

const onClick = (controller) => {
  console.log(controller);
  if (!controller.runThread) {
    controller.runThread = true;
  }
};

const onResize = () => {
  // this.isMobile  = window.matchMedia('(max-width: 767px)').matches
  // this.W = window.innerWidth
  // this.H = window.innerHeight
  // this.PR = Math.min(window.devicePixelRatio, 1.5 || 1)
  // this.isResizing = false
  // ev('layout:change')
};

const onDelayedResize = () => {
  // this.isResizing = true
  // if (this.resizeTimer) clearTimeout(this.resizeTimer)
  // this.resizeTimer = setTimeout(() => this.onResize(), 200)
};

const onTouchMove = (e) => {
  e.preventDefault();
};

const onScroll = (e) => {
  e.preventDefault();
};

const onMove = (e) => {
  const { x, y } = { x: 100, y: 100 };
  const { width, height } = getWindowParams();
  const nx = (x / width) * 2 - 1;
  const ny = -(y / height) * 2 + 1;
  // ev("layout:pointerMove", { x, y, nx, ny });
};
