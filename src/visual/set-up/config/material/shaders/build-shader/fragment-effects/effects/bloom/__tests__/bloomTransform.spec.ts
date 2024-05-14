import { expect, test, describe, vi } from "vitest";
import { bloomTransform } from "../bloomTransform";
import { DEFAULT_BLOOM_EFFECT_PARAMS } from "../bloom.consts";
import { formatFragmentParameters } from "../../../../helpers/formatFragmentParameters";
import { OpacityEffectProps } from "../../../../types";

const MOCK_FRAG_COLOR_NAME = "mockColor";
const MOCK_POINT = "mockPoint";

describe("bloomTransformation", () => {
  test("returns default bloom transformation when default is passed - bloom set via uniform and instatation", () => {
    const formattedEffectParams = formatFragmentParameters(
      DEFAULT_BLOOM_EFFECT_PARAMS,
      DEFAULT_BLOOM_EFFECT_PARAMS
    );
    const { fragmentColorInstantiation, transformation } = bloomTransform(
      MOCK_FRAG_COLOR_NAME,
      MOCK_POINT,
      formattedEffectParams as OpacityEffectProps
    );
    expect(fragmentColorInstantiation).toContain(`vec4 mockColor = mockPoint;`);
    expect(transformation).toContain(`vec4 mockColor = mockPoint;`);
    expect(transformation).toContain(`float bloom = uOpacity;`);
  });
  test("returns bloom at 0.5 transformation when nothing passed in effectProps", () => {
    const formattedEffectParams = formatFragmentParameters(
      DEFAULT_BLOOM_EFFECT_PARAMS,
      DEFAULT_BLOOM_EFFECT_PARAMS
    );
    const effectParams = {
      ...formattedEffectParams,
      asUniform: false,
      bloom: 0.5,
    };
    const { fragmentColorInstantiation, transformation } = bloomTransform(
      MOCK_FRAG_COLOR_NAME,
      MOCK_POINT,
      effectParams as OpacityEffectProps
    );
    expect(fragmentColorInstantiation).toContain(`vec4 mockColor = mockPoint;`);
    expect(transformation).toContain(`float bloom = 0.5`);
  });
  test("returns seperate fragmentColorInstantiation that is not declared in the transform ", () => {
    const formattedEffectParams = formatFragmentParameters(
      DEFAULT_BLOOM_EFFECT_PARAMS,
      DEFAULT_BLOOM_EFFECT_PARAMS
    );
    const effectParams = {
      ...formattedEffectParams,
      declareInTransform: false,
    };
    const { fragmentColorInstantiation, transformation } = bloomTransform(
      MOCK_FRAG_COLOR_NAME,
      MOCK_POINT,
      effectParams as OpacityEffectProps
    );
    expect(fragmentColorInstantiation).toContain(`vec4 mockColor = mockPoint;`);
    expect(transformation).not.toContain(`vec4 mockColor = mockPoint;`);
    expect(transformation).toContain(`float bloom = uOpacity;`);
  });
});
