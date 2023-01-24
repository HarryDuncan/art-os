import { BoundingBox, ThreeDPosition } from "./position.types";

export const generateRandomlySpreadCoordinates = (
  numCoordinates: number,
  allowedBoundingBoxes: BoundingBox[],
  exclusionBoundingBoxes: BoundingBox[],
  minDistance: number
): ThreeDPosition[] => {
  // Create an empty list to store the generated points
  const points: ThreeDPosition[] = [];

  // While there are fewer points than desired
  while (points.length < numCoordinates) {
    // Select a random point within a certain distance of the existing points
    let found = false;
    while (!found) {
      // Select a random allowed bounding box
      const boundingBox =
        allowedBoundingBoxes[
          Math.floor(Math.random() * allowedBoundingBoxes.length)
        ];
      // Generate a random point within the bounding box
      const newPoint = {
        x:
          Math.random() * (boundingBox.max.x - boundingBox.min.x) +
          boundingBox.min.x,
        y:
          Math.random() * (boundingBox.max.y - boundingBox.min.y) +
          boundingBox.min.y,
        z:
          Math.random() * (boundingBox.max.z - boundingBox.min.z) +
          boundingBox.min.z,
      };

      // Check if it is at least the minimum distance away from all existing points
      let tooClose = false;
      points.forEach((point) => {
        if (distance(newPoint, point) < minDistance) {
          tooClose = true;
        }
      });

      // Check if it is in an exclusion bounding box
      let inExclusion = false;
      exclusionBoundingBoxes.forEach((boundingBox) => {
        if (
          newPoint.x >= boundingBox.min.x &&
          newPoint.x <= boundingBox.max.x &&
          newPoint.y >= boundingBox.min.y &&
          newPoint.y <= boundingBox.max.y &&
          newPoint.z >= boundingBox.min.z &&
          newPoint.z <= boundingBox.max.z
        ) {
          inExclusion = true;
        }
      });

      // If it is far enough away and not in an exclusion bounding box, add it to the list of points
      if (!tooClose && !inExclusion) {
        found = true;
        points.push(newPoint);
      }
    }
  }

  return points;
};

function distance(a: ThreeDPosition, b: ThreeDPosition): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dz = a.z - b.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}
