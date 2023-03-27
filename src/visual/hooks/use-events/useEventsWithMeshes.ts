import { useEffect } from "react";
import { BufferGeometry, Mesh } from "three";
import {
  InteractiveRawShader,
  InteractiveShader,
} from "visual/components/interactive";

import { EventConfig } from "./events.types";

export const useEventsWithMesh = (
  interactiveMesh:
    | Mesh<BufferGeometry, InteractiveRawShader | InteractiveShader>
    | undefined,
  eventConfig: EventConfig[] = []
) => {
  useEffect(() => {
    if (interactiveMesh && interactiveMesh.material.addEvents) {
      interactiveMesh.material.addEvents(eventConfig);
    }
  }, [interactiveMesh, eventConfig]);
};

export const ev = (eventName, data?) => {
  const e = new CustomEvent(eventName, { detail: data });
  document.dispatchEvent(e);
};
