import { Vector3 } from "three";
import { vector3DegreesToEuler } from "./three-dimension-space/degreesToEuler";
import { ThreeDPosition } from "./three-dimension-space/position/position.types";

type AxisOptions = { x?: boolean; y?: boolean; z?: boolean };
const DEFAULT_AXIS_OPTIONS = { x: false, y: false, z: false };

export const getRandomRotation = (
  n: number,
  nonRandomizedAxes?: Partial<AxisOptions>
): ThreeDPosition[] => {
  const axisOptions = { ...DEFAULT_AXIS_OPTIONS, ...nonRandomizedAxes };
  const axes = ["x", "y", "z"].filter(
    (axis) => !axisOptions[axis as keyof AxisOptions]
  );
  const results: ThreeDPosition[] = new Array(n).fill(null).map(() => {
    const rotation = { x: 0, y: 0, z: 0 };
    axes.forEach((axis) => {
      rotation[axis as keyof AxisOptions] = Math.random() * 360;
    });
    const eulerRotation = vector3DegreesToEuler(rotation as Vector3);
    return eulerRotation;
  });
  return results;
};

export const getRandomRotationAsDegrees = (
  nonRandomizedAxes?: Partial<AxisOptions>
) => {
  const axisOptions = { ...DEFAULT_AXIS_OPTIONS, ...nonRandomizedAxes };
  const axes = ["x", "y", "z"].filter(
    (axis) => !axisOptions[axis as keyof AxisOptions]
  );

  const rotation = { x: 0, y: 0, z: 0 };
  axes.forEach((axis) => {
    rotation[axis as keyof AxisOptions] = Math.random() * 360;
  });
  return rotation;
};
