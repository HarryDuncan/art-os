import { InteractiveThreeScene } from "visual/components/interactive-scene/InteractiveScene";
// import Particle from "./classes/Particle";
import { BufferAttribute } from "three";

const settings = {
  number: 5000,
  trails: 0.0,
  size: 0.7,
  gravity: 0.24,
  gravityDifference: 0.08,
  randomness: 0.5,
  sideScale: 4,
  speedScale: 8,
};
export const sceneFunctions = {
  onTimeUpdate: (scene: InteractiveThreeScene) => {
    const elapsedTime = scene.clock.getDelta();
    const particles =
      scene.sceneObjects.find(({ name }) => name === "particles")?.object ?? [];
    const positions =
      scene.sceneObjects.find(({ name }) => name === "positions")?.object ?? [];
    // updateParticles(particles);
    const image =
      scene.sceneObjects.find(({ name }) => name === "image")?.object ?? [];
    particles.forEach((p, i) => {
      p.update(
        image,
        elapsedTime,
        0.0,
        settings.sideScale,
        settings.speedScale
      );

      positions.set([p.position.x, p.position.y, 0], i * 3);
    });
    scene.sceneObjects[1].object = positions;

    // @ts-ignore
    scene.children[0].geometry.attributes.position = new BufferAttribute(
      positions,
      3
    );
    // @ts-ignore
    scene.children[0].geometry.attributes.position.needsUpdate = true;
  },
};

// const updateParticles = (particles: Particle[]) => {
//   particles.forEach((p) => {
//     p.gravity = -settings.gravity - Math.random() * settings.randomness;
//     p.slowGravity = p.gravity * settings.gravityDifference;
//     // p.gravity*=settings.speedScale;
//     // p.slowGravity*=settings.speedScale;
//   });
// };
