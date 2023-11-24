import { fillPoints } from "../fillPoints";
import { expect, test, describe } from "vitest";

describe("fillPoints", () => {
  test("returns an array of x vertices all being the parsed coordinate", () => {
    const result = fillPoints(6, { x: 1, y: 2, z: 3 });
    expect(result).toEqual([1, 2, 3, 1, 2, 3]);
  }),
    test("returns an array of x vertices all being the origin if no 3dPosition has been passed", () => {
      const result = fillPoints(3);
      expect(result).toEqual([0, 0, 0]);
    });
});
