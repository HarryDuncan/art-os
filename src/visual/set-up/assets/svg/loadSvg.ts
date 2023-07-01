import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";

export const LoadSvg = async (path) =>
  new Promise((resolve: (value) => void) => {
    const loader = new SVGLoader();
    loader.load(path, (_data) => {
      // todo - svg loader - waiting until i need to do it
      resolve("");
    });
  });
