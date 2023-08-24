import { buildVaryings } from "../buildVaryings";
import schemas from "./testVaryingSchema.json";

describe("buildVaryings", () => {
  test("returns empty config with mandatory varyings", () => {
    const schema = schemas[0];
    const result = buildVaryings(schema);

    const expected = {
      declaration: "",
      instantiation: "",
    };
    expect(result).toStrictEqual(expected);
  });

  test("returns default varyings", () => {
    const schema = schemas[1];
    const result = buildVaryings(schema);

    const expected = {
      declaration: "// VARYING DECLARATION \n varying vec2 vUv;",
      instantiation: "// DEFAULT VARYING INSTANTIATION \n vUv = uv;",
    };
    expect(result).toStrictEqual(expected);
  });

  test("returns custom varyings", () => {
    const schema = schemas[2];
    const result = buildVaryings(schema);

    const expected = {
      declaration: "// VARYING DECLARATION \n varying vec3 vColor;",
      instantiation: "// CUSTOM VARYING \n vColor = vec3(0.0, 0.0, 0.0);",
    };
    expect(result).toStrictEqual(expected);
  });

  test("returns attribute varyings", () => {
    const schema = schemas[3];
    const result = buildVaryings(schema);

    const expected = {
      declaration: "// VARYING DECLARATION \n varying float vPointId;",
      instantiation: "",
    };
    expect(result).toStrictEqual(expected);
  });
});
