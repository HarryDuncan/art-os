// @ts-nocheck
import * as THREE from "three";
import { TWidgetVisual, IFramework } from "../../../../animations/interfaces";
import { fragShader } from "./frag.ts";
import { vertShader } from "./vert.ts";
import obj from "./../../../assets/models/nymph1.obj";
import { loadObjModel } from "../../../helpers/ModelLoader";
const init = (sceneData, framework: IFramework) => {
  return new Promise((resolve, reject) => {
    // Camera
    const camera = new THREE.PerspectiveCamera(50, 1.0, 1, 10000);

    camera.position.set(-5, -1, 1500);
    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const geometry = new THREE.PlaneGeometry(2, 2);

    let uniforms = {
      iTime: { value: 0.0 },
      change: { value: 1.0 },
      iResolution: { type: "v3", value: new THREE.Vector3() },
    };

    // choose a resolution to pass to the shader
    uniforms.iResolution.value.x = window.innerWidth;
    uniforms.iResolution.value.y = window.innerHeight;

    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertShader,
      fragmentShader: fragShader,
      depthWrite: true,
      derivatives: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    loadObjModel("assets/models/nymph1.obj").then((value) => {
      console.log("value");
    });
    const sceneParams = { uniforms: uniforms };
    resolve({ camera: camera, scene: scene, sceneParams: sceneParams });
  });
};

const onUpdate = (framework: IFramework, sceneParams: any) => {
  sceneParams.uniforms.iTime.value = performance.now() / 10000;
  sceneParams.uniforms.change.value = Math.sin(
    (performance.now() / 1000) * 0.03
  );
};
export const NymphAndColors: TWidgetVisual = {
  name: "nymphandcolors",
  scene: null,
  camera: null,
  sceneParams: {},
  tag: "generic",
  sceneLength: 7000,

  init: init,
  onUpdate: onUpdate,
};
