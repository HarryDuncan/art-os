import {
  PROPERTY_TYPES,
  PROPERTY_VALUE_TYPES,
} from "../../buildShader.constants";
import { expect, test, describe } from "vitest";
import { createDeclarationString } from "../createDeclarationString";

describe("createDeclarationString", () => {
  test("returns correct declaration for uniform", () => {
    const result = createDeclarationString(
      PROPERTY_TYPES.UNIFORM,
      PROPERTY_VALUE_TYPES.FLOAT,
      "uTest"
    );
    const expected = "uniform float uTest;";
    expect(result).toStrictEqual(expected);
  });

  test("returns correct declaration for varying", () => {
    const result = createDeclarationString(
      PROPERTY_TYPES.VARYING,
      PROPERTY_VALUE_TYPES.FLOAT,
      "uTest"
    );
    const expected = "varying float uTest;";
    expect(result).toStrictEqual(expected);
  });

  test("returns correct declaration for attribute", () => {
    const result = createDeclarationString(
      PROPERTY_TYPES.ATTRIBUTE,
      PROPERTY_VALUE_TYPES.FLOAT,
      "uTest"
    );
    const expected = "attribute float uTest;";
    expect(result).toStrictEqual(expected);
  });
});
