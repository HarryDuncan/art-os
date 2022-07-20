import { useCallback, useMemo } from "react";
import { Vector3, Object3D } from "three";
import { GalleryShapeTypes } from "./types";

export const useSphere = () =>
  useCallback((items): Object3D[] => {
    const vector = new Vector3();
    const length = items.length;
    return items.map((_, index: number) => {
      const phi = Math.acos(-1 + (2 * index) / length);
      const theta = Math.sqrt(length * Math.PI) * phi;
      const object = new Object3D();
      object.position.setFromSphericalCoords(800, phi, theta);
      vector.copy(object.position).multiplyScalar(2);
      object.lookAt(vector);
      return object;
    });
  }, []);

export const useHelix = () =>
  useCallback((items: Object3D[]) => {
    const vector = new Vector3();
    return items.map((_, index: number) => {
      const theta = index * 0.575 + Math.PI;
      const y = -(index * 80) + 450;
      const object = new Object3D();
      object.position.setFromCylindricalCoords(900, theta, y);
      vector.x = object.position.x * 2;
      vector.y = object.position.y;
      vector.z = object.position.z * 2;

      object.lookAt(vector);
      return object;
    });
  }, []);

export const useFormatToShape = (
  shapeType: GalleryShapeTypes,
  galleryItems: Object3D[]
) => {
  const formatToSphere = useSphere();
  const formatToHelix = useHelix();
  return useMemo(() => {
    const targets: Object3D[] = [];
    switch (shapeType) {
      case GalleryShapeTypes.SPHERE:
        return targets.concat(formatToSphere(galleryItems));
      case GalleryShapeTypes.HELIX:
        return targets.concat(formatToHelix(galleryItems));
      case GalleryShapeTypes.GRID:
        break;
      default:
        break;
    }
    return targets;
  }, [shapeType, galleryItems, formatToHelix, formatToSphere]);
};
