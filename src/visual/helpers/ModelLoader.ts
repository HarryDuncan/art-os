import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const loader = new GLTFLoader();
export const loadModel = (url) =>
  new Promise((resolve, reject) => {
    loader.load(url, (gltf) => {
      const result = gltf.scene;
      resolve(result);
    });
  });

const objLoader = new OBJLoader();

export const loadObjModel = (url) =>
  new Promise((resolve, reject) => {
    objLoader.load(url, (object) => {
      const result = object;
      resolve(result);
    });
  });
