import { Vector3 } from "three";

export const calculateCurve = (
  start: Vector3,
  end: Vector3,
  curveSize: number
): Vector3[] => {
  // Calculate control points
  const controlPoint1 = {
    x: start.x + curveSize * (end.x - start.x),
    y: start.y + curveSize * (end.y - start.y),
    z: start.z + curveSize * (end.z - start.z),
  };
  const controlPoint2 = {
    x: end.x - curveSize * (end.x - start.x),
    y: end.y - curveSize * (end.y - start.y),
    z: end.z - curveSize * (end.z - start.z),
  };

  // Calculate points on Bezier curve
  const points: Vector3[] = [];
  for (let t = 0; t <= 1; t += 0.0001) {
    const x =
      (1 - t) ** 3 * start.x +
      3 * (1 - t) ** 2 * t * controlPoint1.x +
      3 * (1 - t) * t ** 2 * controlPoint2.x +
      t ** 3 * end.x;
    const y =
      (1 - t) ** 3 * start.y +
      3 * (1 - t) ** 2 * t * controlPoint1.y +
      3 * (1 - t) * t ** 2 * controlPoint2.y +
      t ** 3 * end.y;
    const z =
      (1 - t) ** 3 * start.z +
      3 * (1 - t) ** 2 * t * controlPoint1.z +
      3 * (1 - t) * t ** 2 * controlPoint2.z +
      t ** 3 * end.z;
    points.push(new Vector3(x, y, z));
  }

  return points;
};
