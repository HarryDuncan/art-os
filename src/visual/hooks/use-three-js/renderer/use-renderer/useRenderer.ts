import { useMemo } from "react";
import { WebGLRenderer } from "three";
import { RendererParams } from "./types";

export const useRenderer = (renderParams: RendererParams = {}) => {
  return useMemo(() => {
    const newRenderer = new WebGLRenderer({
      powerPreference: "high-performance",
      antialias: true,
      alpha: true,
    });
    newRenderer.setPixelRatio(window.devicePixelRatio);
    const { width, height } = getRendererSize(renderParams);
    newRenderer.setSize(width, height);
    newRenderer.setClearColor(0x000000, 0);
    return newRenderer;
  }, [renderParams]);
};

const getRendererSize = (renderParams) => {
  const { size } = renderParams;
  if (!size) return { width: window.innerWidth, height: window.innerHeight };
  return { width: size.width, height: size.height };
};
