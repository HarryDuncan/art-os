import { Vector3 } from "three";
import { vectorToArray } from "visual/utils/conversion/conversion";

export const vectorArrayToPositions = (positionVectorArray: Vector3[]) =>
  positionVectorArray.flatMap((positionVector) =>
    vectorToArray(positionVector)
  );
