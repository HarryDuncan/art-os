import { FontLoader } from "three/examples/jsm/loaders/FontLoader";

export const loadFont = (fontUrl: string) =>
  new Promise((resolve: (value) => void) => {
    const loader = new FontLoader();
    loader.load(fontUrl, (response) => {
      resolve(response.data);
    });
  });
