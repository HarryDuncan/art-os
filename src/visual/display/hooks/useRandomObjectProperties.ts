import { useMemo } from "react";
import { getRandomCoordinates } from "visual/utils/randomize/getRandomCoordinates";
import { Bounds3D } from "visual/utils/three-dimension-space/position/position.types";
import { xyzToArray } from "../helpers/xyzToArray";

export const useRandomObjectProperties = (
  numberOfObjects: number,
  bounds: Bounds3D
) => {
  return useMemo(() => {
    const coords = getRandomCoordinates(numberOfObjects, bounds);
    const rotation = getRandomCoordinates(numberOfObjects, bounds);
    const randomObjects: { position: number[]; rotation: number[] }[] = [];
    for (let i = 0; i < numberOfObjects; i += 1) {
      randomObjects.push({
        position: xyzToArray(coords[i]),
        rotation: xyzToArray(rotation[i]),
      });
    }
    return randomObjects;
  }, [numberOfObjects, bounds]);
};
