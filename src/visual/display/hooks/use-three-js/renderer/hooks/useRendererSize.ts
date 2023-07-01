import { useWindowState } from "visual/compat/window-state/windowStateProvider";
import { RendererParams } from "../types";

export const useRendererSize = (rendererParams: RendererParams) => {
  const {
    state: {
      windowSize: { width, height },
    },
  } = useWindowState();
  const { size } = rendererParams;
  if (size) return { width: size.width, height: size.height };
  return { width, height };
};
