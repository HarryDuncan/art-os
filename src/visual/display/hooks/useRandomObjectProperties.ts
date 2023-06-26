import { useMemo } from "react";
import { getRandomCoordinates } from "../helpers/getRandomCoordinates";
import { xyzToArray } from "../helpers/xyzToArray";
import { Bounds3D } from "../helpers/three-dimension-space/position/position.types";

export const useRandomObjectProperties = (
  numberOfObjects: number,
  bounds: Bounds3D
) => {
  const {
    lowerBoundX,
    upperBoundX,
    lowerBoundY,
    upperBoundY,
    lowerBoundZ,
    upperBoundZ,
  } = bounds;
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
  }, [
    numberOfObjects,
    lowerBoundX,
    upperBoundX,
    lowerBoundY,
    upperBoundY,
    lowerBoundZ,
    upperBoundZ,
  ]);
};
