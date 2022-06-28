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
    newRenderer.setSize(window.innerWidth, window.innerHeight);
    newRenderer.setClearColor(0x000000, 0);
    return newRenderer;
  }, []);
};
