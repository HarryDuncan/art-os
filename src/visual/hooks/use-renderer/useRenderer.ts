import { useMemo } from "react";
import { WebGLRenderer } from "three";

export const useRenderer = () => {
  return useMemo(() => {
    const newRenderer = new WebGLRenderer({
      powerPreference: "high-performance",
      antialias: true,
    });

    newRenderer.setPixelRatio(window.devicePixelRatio);
    newRenderer.setSize(window.innerWidth, window.innerHeight);

    return newRenderer;
  }, []);
};
