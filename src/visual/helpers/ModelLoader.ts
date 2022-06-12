import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Group } from "three";

const loader = new GLTFLoader();

export const loadModel = (url: string) =>
  new Promise((resolve, reject) => {
    loader.load(
      url,
      (gltf: GLTF) => {
        const result = gltf.scene;
        resolve(result);
      }, // On Progress
      () => {},
      // On Error
      () => {
        console.error("error loading object");
        reject();
      }
    );
  });

const objLoader = new OBJLoader();

export const loadObjModel = (url: string) =>
  new Promise((resolve, reject) => {
    objLoader.load(
      url,
      (object: Group) => {
        const result = object;
        resolve(result);
      },
      // On Progress
      () => {},
      // On Error
      () => {
        console.error("error loading object");
        reject();
      }
    );
  });
