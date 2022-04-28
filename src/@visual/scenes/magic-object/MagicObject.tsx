import React, { useRef, useState } from "react";
import { RootContainer } from "../../components/root-container";
import { loadModel } from "../../helpers/ModelLoader";
import loadTexture from "../../helpers/TextureLoader";
import PARAMS from "./Params";

export const MagicObject = () => {
  const container = useRef(null);

  const initialize = async () => {
    Promise.all([
      loadTexture("dist/img/obsidian.jpg"),
      loadModel("dist/models/suzanne.glb"),
    ]).then((values) => {
      console.log(values);
    });
  };

  const initializeMaterials = () => {
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
  //   const geom = this.store.suzanne.geometry.clone();
  //   geom.computeBoundingBox();

  //   const size = new Vector3();
  //   geom.boundingBox.getSize(size);

  //   this.mesh = new Mesh(geom, this.material);

  //   this.material.uniforms.size.value.copy(size);
  //   this.particles = new ParticleSystem(this.store);
  //   // this.mesh = new InstancedMeshSystem()

  //   this.add(this.mesh, this.particles);
  // };

  return <RootContainer containerRef={container} />;
};
