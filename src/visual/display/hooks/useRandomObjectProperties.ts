import { useMemo } from "react";
import { getRandomCoordinates } from "visual/utils/randomize/getRandomCoordinates";
import { Bounds3D } from "visual/utils/three-dimension-space/position/position.types";

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
function xyzToArray(arg0: { x: number; y: number; z: number }): number[] {
  throw new Error("Function not implemented.");
}
