import { ObjectLoader } from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

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
