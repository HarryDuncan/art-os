import { useMemo } from "react";
import { LinearEncoding, WebGLRenderer } from "three";
import { getRendererSize } from "../helpers/getRendererSize";
import { DEFAULT_RENDERER_PARAMS } from "../rendererConstants";
import { RendererParams } from "../types";

export const useWebGLRenderer = (
  rendererParams: RendererParams = DEFAULT_RENDERER_PARAMS
) =>
  useMemo(() => {
    const renderer = new WebGLRenderer({
      powerPreference: "high-performance",
      antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    const { width, height } = getRendererSize(rendererParams);
    renderer.setSize(width, height);
    renderer.setClearColor(0x112233, 0);
    renderer.physicallyCorrectLights = true;
    renderer.outputEncoding = rendererParams.outputEncoding ?? LinearEncoding;
    return renderer;
  }, [rendererParams]);
