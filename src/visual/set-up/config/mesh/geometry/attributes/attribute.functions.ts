import { BufferGeometry } from "three";
export const getVerticiesCount = (geometry: BufferGeometry) =>
  geometry.getAttribute("position").count;

export const getPositionsLength = (geometry: BufferGeometry) =>
  geometry.getAttribute("position").array.length;

export const getVertices = (geometry: BufferGeometry) =>
  geometry.getAttribute("position").array;

export const getNormals = (geometry: BufferGeometry) =>
  geometry.getAttribute("normal");

export const getUVs = (geometry: BufferGeometry) => geometry.getAttribute("uv");

export const getGeometryAttributes = (geometry: BufferGeometry) => {
  const uvs = getUVs(geometry);
  const normals = getNormals(geometry);
  const verticies = getVertices(geometry);
  return { uvs, normals, verticies };
};
