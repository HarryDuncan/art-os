import { expect, test, describe } from "vitest";
import { transformGeometry } from "../transformGeometries";

const MOCK_MESH_TRANSFORM = [];
const MOCK_GEOMETRIES = [];
describe("transformGeometries", () => {
  test("returns geometries with custom attributes", () => {
    transformGeometry();
  });
  test("returns geometries with mesh transform attributes", () => {});

  test("doesn't alter/add attributes to non selected meshes", () => {});
});
