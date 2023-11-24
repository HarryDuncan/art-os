import { chunkArray } from "../chunkArray";
import { expect, test, describe } from "vitest";

describe("chunkArray", () => {
  test("chunks array of 5 million to 5 arrays of 1 million items DEFAULT_CHUNK_SIZE", () => {
    const large = new Array(5000000);
    const chunks = chunkArray(large);
    expect(chunks.length).toEqual(5000);
    expect(chunks[0].length).toEqual(1000);
  }),
    test("chunks array of 100000 to 10 arrays of 10000 items parsed chunksize", () => {
      const large = new Array(100000);
      const chunks = chunkArray(large, 10000);
      expect(chunks.length).toEqual(10);
      expect(chunks[0].length).toEqual(10000);
    });
});
