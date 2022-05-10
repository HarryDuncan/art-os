import { AppContainer } from "App";
import { useMemo } from "react";
import { WebGLRenderer } from "three";
import { IRendererParams } from "./types";

export const useRenderer = (
  canvas: React.MutableRefObject<null | any>,
  rendererParams?: IRendererParams
) =>
  useMemo(() => {
    const newRenderer = new WebGLRenderer({
      powerPreference: "high-performance",
      antialias: true,
    });

    newRenderer.setPixelRatio(window.devicePixelRatio);
    newRenderer.setSize(window.innerWidth, window.innerHeight);

    if (canvas.current) {
      canvas.current.appendChild(newRenderer.domElement);
    }
    return newRenderer;
  }, [canvas]);
