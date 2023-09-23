import { position3dToVector } from "../conversion";

describe("conversion", () => {
  test("converts full position to vector3", () => {
    const coordinate = { x: 1, y: 2, z: 3 };
    expect(position3dToVector(coordinate)).toEqual([1, 2, 3]);
  });
  test("converts partial position to vector3 missing values are 0", () => {
    const coordinate = { x: 1, y: 2, z: 3 };
    expect(position3dToVector(coordinate)).toEqual([1, 2, 3]);
  });
  test("converts vector3 into position", () => {
    const coordinate = { x: 1, y: 2, z: 3 };
    expect(position3dToVector(coordinate)).toEqual([1, 2, 3]);
  });
  test("converts position into array", () => {
    const coordinate = { x: 1, y: 2, z: 3 };
    expect(position3dToVector(coordinate)).toEqual([1, 2, 3]);
  });
  test("converts partial position config to full position", () => {
    const coordinate = { x: 1, y: 2, z: 3 };
    expect(position3dToVector(coordinate)).toEqual([1, 2, 3]);
  });
});
