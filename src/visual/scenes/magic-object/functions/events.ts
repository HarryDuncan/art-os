import { getWindowParams } from "visual/helpers/getWindowParams";
import { IController } from "visual/hooks/use-controller/types";

export const bindEvents = (controller: IController) => {
  window.addEventListener("resize", () => onDelayedResize());
  window.addEventListener(
    "wheel",
    (e) => {
      onScroll(e);
    },
    { passive: false }
  );
  window.addEventListener("scroll", (e) => {
    onScroll(e);
  });
  document.addEventListener("touchmove", (e) => onTouchMove(e), {
    passive: false,
  });
  window.addEventListener("click", (e) => onClick(controller));

  document.body.addEventListener("mousemove", (e) => onMove(e));
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
