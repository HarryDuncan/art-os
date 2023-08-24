import { setUpVertexEffects } from "../setUpVertexEffects";
import schemas from "./vertexEffectSchema.json";

describe("setUpVertexEffects", () => {
  test("returns empty config with mandatory uniforms", () => {
    const schema = schemas[0];
    const result = buildUniforms(schema);

    const expected = {
      uniformStrings: "uniform uTime float;",
      uniforms: { defaultUniforms: { uTime: { value: 0 } } },
    };
    expect(result).toStrictEqual(expected);
  });
});
