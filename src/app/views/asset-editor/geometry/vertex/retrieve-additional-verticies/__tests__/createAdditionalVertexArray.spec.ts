import { createAdditionalVertexArray } from "../createAdditionalVertexArray";

const mockArray = [0.6, 0.5, 0.4, 0.3, 0.2, 0.1];
describe("createAdditionalVertexArray", () => {
  test("creates an array of verticies going in reverse order of the parsed position array", () => {
    const result = createAdditionalVertexArray(6, mockArray as Float32Array);
    expect(result).toEqual([0.3, 0.2, 0.1, 0.3, 0.2, 0.1]);
  });

  test("if the extra vertex count is greater than the number of positions the extra vertex array will reverse in the other direction when it has reached an end of the array", () => {
    const result = createAdditionalVertexArray(9, mockArray as Float32Array);
    expect(result).toEqual([0.3, 0.2, 0.1, 0.3, 0.2, 0.1, 0.3, 0.2, 0.1]);
  });
  test("if the extra vertex count is greater than the number of positions the extra vertex array will reverse in the other direction when it has reached an end of the array", () => {
    const result = createAdditionalVertexArray(24, mockArray as Float32Array);
    // console.log(result);
    expect(result).toEqual([
      0.3,
      0.2,
      0.1,
      0.3,
      0.2,
      0.1,
      0.3,
      0.2,
      0.1,
      0.6,
      0.5,
      0.4,
      0.6,
      0.5,
      0.4,
      0.6,
      0.5,
      0.4,
      0.3,
      0.2,
      0.1,
      0.3,
      0.2,
      0.1,
    ]);
  });
});
