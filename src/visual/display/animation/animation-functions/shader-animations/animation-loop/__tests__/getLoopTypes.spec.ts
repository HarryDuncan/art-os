import { ExtendedMesh } from "visual/set-up/config/mesh/mesh.types";
import { ANIMATION_LOOP_TYPES } from "../animationLoop.consts";
import { setUpAnimationLoop } from "../setUpAnimationLoop";
import { getLoopType } from "../getLoopTypes";

const MOCK = [
  {
    uniform: "uProgress",
    loopType: ANIMATION_LOOP_TYPES.ZERO_TO_ONE,
  },
  {
    uniform: "uOpacity1",
    loopType: ANIMATION_LOOP_TYPES.ONE_TO_ONE,
    toMaterial: "material-1",
  },
  {
    uniform: "uOpacity2",
    loopType: ANIMATION_LOOP_TYPES.ZERO_TO_ZERO,
    toMaterial: "material-2",
  },
];
const mockObject = {
  material: {
    name: "",
    uniforms: {
      uTime: {
        value: 0,
      },
      uProgress: {
        value: 1.0,
      },
      uOpacity1: {
        value: 0.0,
      },
    },
  },
};
const MOCK_START = 0;
const MOCK_MID = 50;
const MOCK_END = 100;

describe("getLoopTypes", () => {
  test("returns a correct one to one function with parsed and default params", () => {
    const loopType = ANIMATION_LOOP_TYPES.ONE_TO_ONE;
    const duration = 100;
    const steepness = 2;
    const loopFunction = getLoopType(loopType, duration, steepness);
    const startUniformValue = loopFunction(MOCK_START);
    const midUniformValue = loopFunction(MOCK_MID);
    const endUniformValue = loopFunction(MOCK_END);
    expect(startUniformValue).toEqual(1);
    expect(midUniformValue).toEqual(0);
    expect(endUniformValue).toEqual(1);
  });
  test("returns a correct zero to one function with parsed and default params", () => {
    const loopType = ANIMATION_LOOP_TYPES.ZERO_TO_ONE;
    const duration = 100;
    const steepness = 1;
    const loopFunction = getLoopType(loopType, duration, steepness);
    const startUniformValue = loopFunction(MOCK_START);
    const midUniformValue = loopFunction(MOCK_MID);
    // Have to pass just below duration
    const endUniformValue = loopFunction(99);
    expect(startUniformValue).toEqual(0);
    expect(midUniformValue).toEqual(0.5);
    expect(endUniformValue).toEqual(0.99);
  });

  test("returns a correct zero to zero function with parsed and default params", () => {
    const loopType = ANIMATION_LOOP_TYPES.ZERO_TO_ZERO;
    const duration = 100;
    const steepness = 2;
    const loopFunction = getLoopType(loopType, duration, steepness);
    const startUniformValue = loopFunction(MOCK_START);
    const midUniformValue = loopFunction(MOCK_MID);
    const endUniformValue = loopFunction(MOCK_END);
    expect(startUniformValue).toEqual(0);
    expect(midUniformValue).toEqual(1);
    expect(endUniformValue).toEqual(0);
  });

  test("returns a count function with parsed and default params", () => {
    const loopType = ANIMATION_LOOP_TYPES.COUNT;
    const duration = 100;
    const steepness = 2;
    const defaultLoopFunction = getLoopType(loopType, duration, steepness);
    const defaultStartUniformValue = defaultLoopFunction(MOCK_START);
    const defaultMidUniformValue = defaultLoopFunction(MOCK_MID);
    const defaultEndUniformValue = defaultLoopFunction(MOCK_END);
    expect(defaultStartUniformValue).toEqual(0);
    expect(defaultMidUniformValue).toEqual(0);
    expect(defaultEndUniformValue).toEqual(0);
    const loopFunction = getLoopType(loopType, duration, steepness, 3);
    const startUniformValue = loopFunction(MOCK_START);
    const midUniformValue = loopFunction(MOCK_MID * 2);
    const endUniformValue = loopFunction(MOCK_END * 2);
    expect(startUniformValue).toEqual(0);
    expect(midUniformValue).toEqual(1);
    expect(endUniformValue).toEqual(2);
  });

  test("returns a correct linear function", () => {
    const loopType = ANIMATION_LOOP_TYPES.LINEAR;
    const duration = 100;
    const loopFunction = getLoopType(loopType, duration);
    const startUniformValue = loopFunction(MOCK_START);
    const midUniformValue = loopFunction(MOCK_MID);
    const endUniformValue = loopFunction(MOCK_END);
    expect(startUniformValue).toEqual(0);
    expect(midUniformValue).toEqual(50);
    expect(endUniformValue).toEqual(100);
  });
});
