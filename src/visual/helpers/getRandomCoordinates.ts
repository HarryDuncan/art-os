export const getRandomCoordinates = (
  numberOfCoodinates: number,
  lowerBoundX: number,
  upperBoundX: number,
  lowerBoundY: number,
  upperBoundY: number,
  lowerBoundZ: number,
  upperBoundZ: number
) => {
  // Check that the bounds are valid
  if (
    lowerBoundX >= upperBoundX ||
    lowerBoundY >= upperBoundY ||
    lowerBoundZ >= upperBoundZ
  ) {
    throw new Error(
      "Invalid bounds: the lower bound must be less than the upper bound for each dimension"
    );
  }

  // Generate the coordinates
  const coordinates: { x: number; y: number; z: number }[] = [];
  for (let i = 0; i < numberOfCoodinates; i++) {
    const x = Math.random() * (upperBoundX - lowerBoundX) + lowerBoundX;
    const y = Math.random() * (upperBoundY - lowerBoundY) + lowerBoundY;
    const z = Math.random() * (upperBoundZ - lowerBoundZ) + lowerBoundZ;
    coordinates.push({ x, y, z });
  }

  return coordinates;
};
