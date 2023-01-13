import { useMemo } from "react";
import { getRandomCoordinates } from "visual/helpers/getRandomCoordinates";
import { xyzToArray } from "visual/helpers/xyzToArray";
import { Bounds3D } from "visual/visual-components/react-fiber-scene/types";

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
