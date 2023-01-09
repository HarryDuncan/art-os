export const smoothstepBetweenBounds = (
  value: number,
  lowerBound: number,
  upperBound: number
): number => {
  // Check that the bounds are valid
  if (lowerBound >= upperBound) {
    throw new Error(
      "Invalid bounds: the lower bound must be less than the upper bound"
    );
  }

  // Clamp the value to the range [lowerBound, upperBound]
  const clampedValue = Math.min(Math.max(value, lowerBound), upperBound);

  // Calculate the smoothstep value
  return (
    3 * Math.pow(clampedValue - lowerBound, 2) -
    2 * Math.pow(clampedValue - lowerBound, 3)
  );
};
