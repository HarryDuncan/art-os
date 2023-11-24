import { combineVertices } from "../combineVertices";
import { expect, test, describe } from "vitest";

const MOCK_CURRENT = [1, 1, 1, 2, 2, 2, 3, 3, 3];
const ADDITIONAL = [
  { vertices: [0.1, 0.1, 0.1], insertPosition: 0 },
  { vertices: [0.2, 0.2, 0.2], insertPosition: 3 },
  { vertices: [0.3, 0.3, 0.3], insertPosition: 6 },
];

describe("combineVertices", () => {
  test("combines current and additional vertices", () => {
    const combinedVertices = combineVertices(MOCK_CURRENT, ADDITIONAL, 18);
    expect(combinedVertices[0]).toEqual(0.1);
    expect(combinedVertices[3]).toEqual(1);
    expect(combinedVertices[6]).toEqual(0.2);
    expect(combinedVertices[9]).toEqual(2);
    expect(combinedVertices[12]).toEqual(0.3);
    expect(combinedVertices[15]).toEqual(3);
  }),
    test("additional vertices insert position that is out of bounds gets inserted at the end", () => {
      const mockAdditional = [
        ...ADDITIONAL,
        { vertices: [0.5, 0.5, 0.5], insertPosition: 25 },
      ];
      const combinedVertices = combineVertices(
        MOCK_CURRENT,
        mockAdditional,
        21
      );
      expect(combinedVertices[0]).toEqual(0.1);
      expect(combinedVertices[3]).toEqual(1);
    });
  test("vertices inserted at position relative to the precombined array", () => {
    const mockAdditional = [
      ...ADDITIONAL,
      { vertices: [0.5, 0.5, 0.5], insertPosition: 9 },
      { vertices: [0.5, 0.5, 0.5], insertPosition: 9 },
    ];
    const combinedVertices = combineVertices(MOCK_CURRENT, mockAdditional, 18);
    expect(combinedVertices[0]).toEqual(0.1);
    expect(combinedVertices[3]).toEqual(1);
  });
  test("combines current and additional vertices to the specified length does not add  extra", () => {
    const combinedVertices = combineVertices(MOCK_CURRENT, ADDITIONAL, 15);
    expect(combinedVertices.length).toEqual(15);
    expect(combinedVertices[14]).toEqual(0.3);
  });
  test("returns combined vertex array to the specified length even if additional vertices are less", () => {
    const combinedVertices = combineVertices(MOCK_CURRENT, ADDITIONAL, 21);
    expect(combinedVertices.length).toEqual(21);
    expect(combinedVertices[20]).toEqual(0);
  });
  test("works for really large arrays 5 million verticies", () => {
    const mockLarge = new Array(5000000).fill(2);
    const combinedVertices = combineVertices(mockLarge, ADDITIONAL, 5000021);
    expect(combinedVertices.length).toEqual(5000021);
    expect(combinedVertices[20]).toEqual(2);
  });
});
