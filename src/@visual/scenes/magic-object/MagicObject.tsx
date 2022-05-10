import { useRenderer } from "@visual/hooks/renderer/useRenderer";
import { useCamera } from "@visual/hooks/use-camera/useCamera";
import { useScene } from "@visual/hooks/use-scene/useScene";
import React, { useRef, useState } from "react";
import { Color, Mesh, Vector3 } from "three";
import { RootContainer } from "../../components/root-container";
import { loadModel } from "../../helpers/ModelLoader";
import loadTexture from "../../helpers/TextureLoader";
import ParticleSystem from "./class-components/ParticleSystem";
import PARAMS from "./Params";
import LokiMaterial from "./shaders/materials/loki-material";

export interface IMagicObjectStore {
  model?: any;
  texture?: any;
}

export const MagicObject = () => {
  // Set up ref, scene, and renderer, camera
  const container = useRef(null);
  const renderer = useRenderer(container);
  const scene = useScene();
  const camera = useCamera();

  const {
    progress,
    baseNoiseIteration,
    noiseDiffusion,
    mainColor,
    noisePrecision,
    lightningThickness,
    lightningPower,
    lightningDiffusion,
    vanishDirection,
  } = PARAMS;

  const store: IMagicObjectStore = {};

  console.log(renderer);
  const initialize = async () => {
    Promise.all([
      loadTexture("../assets//textures/obsidian.jpg"),
      loadModel("../assets/models/suzanne.glb"),
    ]).then((values) => {
      store.texture = values[0];
      //@ts-ignore
      store.model = values[1].children[0];

      const material1 = new LokiMaterial({
        matcap: { value: store.texture },
        progress,
        baseNoiseIteration,
        noisePrecision,
        size: { value: new Vector3() },
        color: { value: new Color(mainColor) },
        noiseDiffusion,
        lightningThickness,
        lightningPower,
        lightningDiffusion,
        vanishDirection,
        time: { value: 0 },
      });

      // @ts-ignore
      const geom = store.model.geometry.clone();
      geom.computeBoundingBox();

      const size = new Vector3();
      geom.boundingBox.getSize(size);

      const mesh = new Mesh(geom, material1);

      material1.uniforms.size.value.copy(size);

      const particles = new ParticleSystem(store);
      particles.init();

      scene.add(mesh, particles);

      renderer.render(scene, camera);
    });
  };

  const initializeMaterials = () => {
    // const material = new LokiMaterial({
    //   matcap: { value: this.store.obsidian },
    //   progress,
    //   baseNoiseIteration,
    //   noisePrecision,
    //   size: { value: new Vector3() },
    //   color: { value: new Color(mainColor) },
    //   noiseDiffusion,
    //   lightningThickness,
    //   lightningPower,
    //   lightningDiffusion,
    //   vanishDirection,
    //   time: { value: 0 },
    // });
  };

  // const initializeScene = () => {

  // };
  initialize();
  return <RootContainer containerRef={container} />;
};
