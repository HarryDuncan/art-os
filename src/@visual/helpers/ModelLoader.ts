import { ObjectLoader } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

const loader = new GLTFLoader();

// Optional
// const dracoLoader = new DRACOLoader()
// dracoLoader.setDecoderPath('./node_modules/three/examples/js/libs/draco/')
// dracoLoader.preload()
// loader.setDRACOLoader(dracoLoader)

export const loadModel = (url) =>
  new Promise((resolve, reject) => {
    loader.load(url, (gltf) => {
      const result = gltf.scene;
      resolve(result);
    });
  });

const objLoader = new ObjectLoader();
export const loadObjModel = (url) =>
  new Promise((resolve, reject) => {
    objLoader.load(url, (object) => {
      const result = object;
      console.log(result);
      resolve(result);
    });
  });
