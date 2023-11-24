import { Vector2, Vector3 } from "three";
import { buildUniforms } from "../buildUniforms";
import configs from "./uniformConfigs.json";
import { UniformConfig } from "../uniforms.types";
import { expect, test, describe } from "vitest";

describe("buildUniforms", () => {
  test("returns empty config with mandatory uniforms", () => {
    const result = buildUniforms(configs[0] as UniformConfig);
    const expected = {
      uniformDeclaration: "// UNIFORM DECLARATION \n uniform float uTime;",
      uniforms: { uTime: { value: 0 } },
    };
    expect(result).toStrictEqual(expected);
  });

  test("returns default uniforms", () => {
    const result = buildUniforms(configs[1] as UniformConfig);

    const expected = {
      uniformDeclaration:
        "// UNIFORM DECLARATION \n uniform float uTime; \n uniform vec3 uPosition; \n uniform vec2 uResolution;",
      uniforms: {
        uTime: { value: 0 },
        uPosition: { value: new Vector3(0, 0, 0) },
        uResolution: { value: new Vector2(1, 1) },
      },
    };
    expect(result).toStrictEqual(expected);
  });

  test("returns configured uniforms", () => {
    const result = buildUniforms(configs[2] as UniformConfig);
    const expected = {
      uniformDeclaration:
        "// UNIFORM DECLARATION \n uniform float uTime; \n uniform vec3 uPosition; \n uniform vec2 uResolution; \n uniform float uPower; \n uniform float uReduced;",
      uniforms: {
        uPosition: { value: new Vector3(0, 0, 0) },
        uPower: { value: 0 },
        uReduced: { value: 15.5 },
        uResolution: { value: new Vector2(1, 1) },
        uTime: { value: 0 },
      },
    };
    expect(result).toStrictEqual(expected);
  });
});
