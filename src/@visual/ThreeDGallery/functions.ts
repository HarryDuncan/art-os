import { IThreeDCard } from "./interfaces";
import { Vector3, Object3D } from "three";
// @ts-ignore
import { TWEEN } from "three/examples/jsm/libs/tween.module.min.js";

export const formatPositionsToSphere = (items: IThreeDCard[]) => {
  const vector = new Vector3();
  const length = items.length;
  return items.map((card: IThreeDCard, index: number) => {
    const phi = Math.acos(-1 + (2 * index) / length);
    const theta = Math.sqrt(length * Math.PI) * phi;

    const object = new Object3D();

    object.position.setFromSphericalCoords(800, phi, theta);

    vector.copy(object.position).multiplyScalar(2);

    object.lookAt(vector);
    return object;
  });
};

export const formatPositionsToHelix = (items: IThreeDCard[]) => {
  const vector = new Vector3();
  return items.map((card: IThreeDCard, index: number) => {
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
};
