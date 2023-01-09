import { useMemo } from "react";
import { getRandomCoordinates } from "visual/helpers/getRandomCoordinates";
import { xyzToArray } from "visual/helpers/xyzToArray";

export const useRandomObjectProperties = (
  numberOfObjects: number,
  bounds: {
    lowerBoundX: number;
    upperBoundX: number;
    lowerBoundY: number;
    upperBoundY: number;
    lowerBoundZ: number;
    upperBoundZ: number;
  }
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
    const coords = getRandomCoordinates(
      numberOfObjects,
      lowerBoundX,
      upperBoundX,
      lowerBoundY,
      upperBoundY,
      lowerBoundZ,
      upperBoundZ
    );

    const rotation = getRandomCoordinates(
      numberOfObjects,
      lowerBoundX,
      upperBoundX,
      lowerBoundY,
      upperBoundY,
      lowerBoundZ,
      upperBoundZ
    );
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
