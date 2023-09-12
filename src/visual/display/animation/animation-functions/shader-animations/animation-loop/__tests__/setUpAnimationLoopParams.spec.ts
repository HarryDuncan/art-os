import { ExtendedMesh } from "visual/set-up/config/mesh/mesh.types";
import { ANIMATION_LOOP_TYPES } from "../animationLoop.consts";
import { setUpAnimationLoop } from "../setUpAnimationLoop";

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

describe("setUpAnimationLoop", () => {
  test("returns a correctly configured animationFunction", () => {
    const animationLoop = setUpAnimationLoop(MOCK);
    const testShaderObject = { ...mockObject };
    const [shaderMesh] = animationLoop(testShaderObject, 20);
    expect(shaderMesh.material.uniforms.uProgress.value).toEqual(0);
    expect(shaderMesh.material.uniforms.uOpacity1.value).toEqual(0.0);
  });
  test("animationFunction animates different materials appropriately", () => {
    const animationLoop = setUpAnimationLoop(MOCK);
    const testShaderObject = { ...mockObject };
    testShaderObject.material.name = "material-1";
    const [shaderMesh] = animationLoop(testShaderObject as ExtendedMesh, 20);
    expect(shaderMesh.material.uniforms.uOpacity1.value).toEqual(1);
  });

  test("returns a correctly configured animationFunction with the parsed duration", () => {
    const animationLoop = setUpAnimationLoop(MOCK, 40);
    const testShaderObject = { ...mockObject };
    const [shaderMesh] = animationLoop(testShaderObject, 20);
    expect(shaderMesh.material.uniforms.uProgress.value).toEqual(0.5);
  });

  test("returns a correctly configured animationFunction with multiple durations for each uniform", () => {
    const updatedMock = [...MOCK];
    updatedMock[0].duration = 1;
    updatedMock[1].duration = 100;
    const animationLoop = setUpAnimationLoop(updatedMock, 40);
    const testShaderObject = { ...mockObject };
    testShaderObject.material.name = "material-1";
    const [shaderMesh] = animationLoop(testShaderObject, 20);
    expect(shaderMesh.material.uniforms.uProgress.value).toEqual(0);
    expect(shaderMesh.material.uniforms.uOpacity1.value).toEqual(
      0.6545084971874737
    );
  });

  test("automatically updates uTime", () => {
    const animationLoop = setUpAnimationLoop(MOCK, 40);
    const testShaderObject = { ...mockObject };
    const [shaderMesh] = animationLoop(testShaderObject, 20);
    expect(shaderMesh.material.uniforms.uTime.value).toEqual(20);
  });
});
