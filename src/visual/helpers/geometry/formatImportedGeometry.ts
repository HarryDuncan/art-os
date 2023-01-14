import { Vector3 } from "three";

export const formatImportedGeometry = (geometry, scale: number = 0.15) => {
  const formattedGeometry = geometry.clone();
  formattedGeometry.computeBoundingBox();
  const size = new Vector3();
  formattedGeometry.boundingBox.getSize(size);
  formattedGeometry.scale(scale, scale, scale);
  return formattedGeometry;
};
