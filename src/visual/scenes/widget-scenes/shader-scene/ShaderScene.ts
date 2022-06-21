// @ts-nocheck
import * as THREE from "three";
import {
  FunctionBasedScene,
  IFramework,
} from "../../../../animations/interfaces";
import { useWebGLShader } from "visual/hooks/use-webgl-shader";

const init = (sceneData) => {
  return new Promise((resolve, reject) => {
    // Camera
    const camera = new THREE.PerspectiveCamera(50, 1.0, 1, 10000);

    camera.position.set(-5, -1, 1500);
    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    const uniformsPassed = {};
    const { sceneMesh, uniforms } = useWebGLShader(
      sceneData.data.shaderName,
      uniformsPassed
    );
    const sceneParams = { uniforms: uniforms };
    sceneParams.name = sceneData.data.shaderName;
    scene.add(sceneMesh);
    resolve({ camera: camera, scene: scene, sceneParams: sceneParams });
  });
};

const onUpdate = (framework: IFramework, sceneParams: any) => {
  sceneParams.uniforms.iTime.value = performance.now() / 10000;
};
export const ShaderScene: FunctionBasedScene = {
  name: "shader-scene",
  scene: null,
  camera: null,
  sceneParams: {},
  tag: "generic",
  sceneLength: 7000,

  init: init,
  onUpdate: onUpdate,
};
