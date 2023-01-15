import { Vector3 } from "three";
import { Reflector } from "three/examples/jsm/objects/Reflector";
import { rotatePlaneToFaceCoordinate } from "visual/helpers/three-dimension-space/rotatePlane";
import { rotateObjectToFaceCoordinate } from "visual/helpers/three-dimension-space/rotateToFaceCoordinate";

export const Mirror = ({ name, geometry }) => {
  const mirror = new Reflector(geometry, {
    clipBias: 0.003,
    textureWidth: window.innerWidth * window.devicePixelRatio,
    textureHeight: window.innerHeight * window.devicePixelRatio,
    color: 0x777777,
  });
  mirror.position.set(5, -6, -10);
  const position = new Vector3(5, -6, -10);
  const targetCoordinate = new Vector3(0, 0, 0);
  const newRotation = rotatePlaneToFaceCoordinate(position, targetCoordinate);
  mirror.rotation.set(newRotation.x, newRotation.y, newRotation.z);
  return mirror;
};
