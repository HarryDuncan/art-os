import { useEffect } from "react";
import { WebGLRenderer } from "three";
import { ContainerNode } from "visual/interfaces";

export const useInitializeNode = (
  containerRef: ContainerNode,
  renderer: WebGLRenderer
) =>
  useEffect(() => {
    if (containerRef?.current) {
      const container = containerRef.current as HTMLElement;
      container.appendChild(renderer.domElement);
    }
  }, [containerRef, renderer]);
