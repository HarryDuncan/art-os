import { useCallback } from "react";
import { Color, Mesh, Vector3 } from "three";

import { InteractionEventObject } from "../use-interactions/types";
import InteractiveMaterial from "./InteractiveMaterial";

export const useInteractiveMaterial = (materialParams: any) => {
  return useCallback(
    (
      interactionEventObjects: InteractionEventObject[],
      geometry: any,
      params: any
    ) => {
      const {
        progress,
        baseNoiseIteration,
        noiseDiffusion,
        mainColor,
        noisePrecision,
        lightningThickness,
        lightningPower,
        lightningDiffusion,
        vanishDirection,
      } = materialParams;

      const size = new Vector3();
      geometry.boundingBox.getSize(size);

      const interactiveMaterial = new InteractiveMaterial(
        params.vertex,
        params.fragment,
        {
          matcap: { value: params.texture },
          progress,
          baseNoiseIteration,
          noisePrecision,
          size: { value: size },
          color: { value: new Color(mainColor) },
          noiseDiffusion,
          lightningThickness,
          lightningPower,
          lightningDiffusion,
          vanishDirection,
          time: { value: 0 },
          delta: { value: 0.01 },
        },
        interactionEventObjects
      );

      const interactiveMesh = new Mesh(geometry, interactiveMaterial);
      return interactiveMesh;
    },
    []
  );
};
