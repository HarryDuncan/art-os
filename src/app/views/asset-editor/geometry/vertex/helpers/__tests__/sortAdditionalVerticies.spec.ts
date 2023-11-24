import { sortAdditionalVertices } from "../sortAdditionalVertices";
import { expect, test, describe } from "vitest";

const ADDITIONAL = [
  { vertices: [0.1, 0.1, 0.1], insertPosition: 20 },
  { vertices: [0.2, 0.2, 0.2], insertPosition: 2 },
  { vertices: [0.3, 0.3, 0.3], insertPosition: 6 },
];

describe("sortAdditionalVertices", () => {
  test("sorts additional vertices ascending on insert position", () => {
    const sorted = sortAdditionalVertices(ADDITIONAL);
    expect(sorted[0].insertPosition).toEqual(2);
    expect(sorted[1].insertPosition).toEqual(6);
    expect(sorted[2].insertPosition).toEqual(20);
  });
});
