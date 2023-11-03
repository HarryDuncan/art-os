import {
  BufferGeometry,
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
} from "three";

export const getEdgesGeometry = (geometry: BufferGeometry) => {
  const edges = new EdgesGeometry(geometry);
  return edges;
};
