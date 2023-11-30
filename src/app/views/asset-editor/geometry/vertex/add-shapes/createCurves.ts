import * as THREE from "three";
import { generateEquidistantValues } from "visual/utils/maths/maths";

export const createCurves = (
  curveFunction: (t: number) => number,
  numPoints: number
): THREE.Vector3[] => {
  const points: THREE.Vector3[] = [];
  const xValues = generateEquidistantValues(-10, 10, numPoints);
  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    const x = xValues[i];
    const y = curveFunction(t) * 2;
    const z = 0;
    points.push(new THREE.Vector3(x, y, z));
  }

  return points;
};

export const generateSinCurvePoints = (numPoints: number): THREE.Vector3[] => {
  return createCurves((t) => Math.sin(t * Math.PI * 2), numPoints);
};

export const generateCosCurvePoints = (numPoints: number): THREE.Vector3[] => {
  return createCurves((t) => Math.cos(t * Math.PI * 2), numPoints);
};
