import { useEffect } from "react";
import { BufferGeometry, Mesh } from "three";
import { InteractiveRawShader } from "visual/components/interactive-shaders/interactive-raw-shader";
import { InteractiveShader } from "visual/components/interactive-shaders/interactive-shader";
import { EventConfig } from "./types";

export const useEventsWithShader = (
  interactiveMesh:
    | Mesh<BufferGeometry, InteractiveRawShader | InteractiveShader>
    | undefined,
  eventConfig: EventConfig[] = []
) => {
  useEffect(() => {
    if (interactiveMesh) {
      interactiveMesh.material.addEvents(eventConfig);
    }
  }, [interactiveMesh]);
};

export const ev = (eventName, data?) => {
  const e = new CustomEvent(eventName, { detail: data });
  document.dispatchEvent(e);
};
