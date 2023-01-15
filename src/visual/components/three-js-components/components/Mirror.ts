import { Reflector } from "three/examples/jsm/objects/Reflector";
export const Mirror = ({ name, geometry }) => {
  const mirror = new Reflector(geometry, {
    clipBias: 0.003,
    textureWidth: window.innerWidth * window.devicePixelRatio,
    textureHeight: window.innerHeight * window.devicePixelRatio,
    color: 0x777777,
  });
  return mirror;
};
