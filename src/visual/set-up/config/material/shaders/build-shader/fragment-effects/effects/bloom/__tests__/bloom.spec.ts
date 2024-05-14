import { expect, test, describe, vi } from "vitest";
import { bloom } from "../bloom";
import {
  BLOOM_ATTRIBUTES,
  BLOOM_FUNCTIONS,
  BLOOM_UNIFORMS,
  BLOOM_VARYINGS,
} from "../bloom.consts";
import { FRAGMENT_COLOR_NAMES } from "../../../fragmentEffects.consts";

vi.mock("../bloomTransform", () => ({
  bloomTransform: () => ({
    transformation: "explodeTransformationString;",
    fragmentColorInstantiation: "instantiate",
  }),
}));

const MOCK_POINT = "mockPoint";
describe("bloomTransformations", () => {
  test("returns default bloom transformation when nothing is passed", () => {
    const fragData = bloom(MOCK_POINT, {});
    const expectedResult = {
      requiredFunctions: BLOOM_FUNCTIONS,
      uniformConfig: BLOOM_UNIFORMS,
      transformation: "explodeTransformationString;",
      varyingConfig: BLOOM_VARYINGS,
      attributeConfig: BLOOM_ATTRIBUTES,
      fragName: FRAGMENT_COLOR_NAMES.BLOOM,
      fragmentColorInstantiation: "instantiate",
    };
    expect(fragData).toEqual(expectedResult);
  });
  test("returns frag name with point parent appended", () => {
    const fragData = bloom(MOCK_POINT, { pointParent: "TRIGGERED" });

    expect(fragData.fragName).toContain(
      `${FRAGMENT_COLOR_NAMES.BLOOM}_TRIGGERED`
    );
  });
});
