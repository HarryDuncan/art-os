import { useMemo } from "react";
import { getRandomCoordinates } from "visual/helpers/getRandomCoordinates";
import { xyzToArray } from "visual/helpers/xyzToArray";

export type Bounds3D = {
  lowerBoundX: number;
  upperBoundX: number;
  lowerBoundY: number;
  upperBoundY: number;
  lowerBoundZ: number;
  upperBoundZ: number;
};

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
