import { degreesToEuler } from "visual/helpers/three-dimension-space/degreesToEuler";
import { getFrontPlane } from "./path/to/getFrontPlane";

describe("getFrontPlane", () => {
  test("should return correct plane", () => {
    const rotationZ = 0; // set the input value
    const rotationAsEueler = degreesToEuler(rotationZ);
    const plane = getFrontPlane(rotationAsEueler);
    // assert that the plane object has correct properties and values
    expect(plane.xMulti).toBe(1);
    expect(plane.zMulti).toBe(0);
    expect(plane.isXZ).toBe(false);
  });

  test("should return correct plane 90 deg", () => {
    const rotationZ = 90; // set the input value
    const rotationAsEueler = degreesToEuler(rotationZ);
    const plane = getFrontPlane(rotationAsEueler);
    // assert that the plane object has correct properties and values
    expect(plane.xMulti).toBe(0);
    expect(plane.zMulti).toBe(1);
    expect(plane.isXZ).toBe(true);
  });
  test("should return correct plane", () => {
    const rotationZ = 180; // set the input value
    const rotationAsEueler = degreesToEuler(rotationZ);
    const plane = getFrontPlane(rotationAsEueler);
    // assert that the plane object has correct properties and values
    expect(plane.xMulti).toBe(-1);
    expect(plane.zMulti).toBe(-1);
    expect(plane.isXZ).toBe(false);
  });
  test("should return correct plane 270 deg", () => {
    const rotationZ = 0; // set the input value
    const rotationAsEueler = degreesToEuler(rotationZ);
    const plane = getFrontPlane(rotationAsEueler);
    // assert that the plane object has correct properties and values
    expect(plane.xMulti).toBe(0);
    expect(plane.zMulti).toBe(-1);
    expect(plane.isXZ).toBe(true);
  });
});
