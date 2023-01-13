import { Bounds3D } from "visual/visual-components/react-fiber-scene/types";
import { getRandomCoordinates } from "./getRandomCoordinates";
import { xyzToArray } from "./xyzToArray";

export const getRandomRotation = (
  numberOfCoodinates: number,
  boundingBox: Bounds3D
) => {
  const rotations = getRandomCoordinates(numberOfCoodinates, boundingBox);

  return rotations.map((rotation) => xyzToArray(rotation));
};
