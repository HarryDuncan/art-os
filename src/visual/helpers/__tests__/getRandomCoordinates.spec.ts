import { getRandomCoordinates } from "../getRandomCoordinates";

describe("getRandomXYZCoordinates", () => {
  it("should generate the specified number of random XYZ coordinates within the given bounds", () => {
    const lowerBoundX = 0;
    const upperBoundX = 10;
    const lowerBoundY = 0;
    const upperBoundY = 10;
    const lowerBoundZ = 0;
    const upperBoundZ = 10;
    const coordinates = getRandomCoordinates(
      10,
      lowerBoundX,
      upperBoundX,
      lowerBoundY,
      upperBoundY,
      lowerBoundZ,
      upperBoundZ
    );

    // Check that the correct number of coordinates was generated
    expect(coordinates.length).toBe(10);

    // Check that all the generated coordinates are within the specified bounds
    coordinates.forEach((coordinate) => {
      expect(coordinate.x).toBeGreaterThanOrEqual(lowerBoundX);
      expect(coordinate.x).toBeLessThanOrEqual(upperBoundX);
      expect(coordinate.y).toBeGreaterThanOrEqual(lowerBoundY);
      expect(coordinate.y).toBeLessThanOrEqual(upperBoundY);
      expect(coordinate.z).toBeGreaterThanOrEqual(lowerBoundZ);
      expect(coordinate.z).toBeLessThanOrEqual(upperBoundZ);
    });
  });

  it("should throw an error if the lower bounds are greater than or equal to the upper bounds for any dimension", () => {
    expect(() => {
      getRandomCoordinates(10, 10, 0, 0, 10, 0, 10);
    }).toThrowError(
      "Invalid bounds: the lower bound must be less than the upper bound for each dimension"
    );
  });
});
