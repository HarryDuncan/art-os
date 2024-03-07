import { AnimationClip, AnimationMixer } from "three";

let startTime = 0;
export const runRiggedAnimation = (
  riggedAnimationConfig,
  selectedMesh,
  clock
) => {
  console.log(selectedMesh);

  selectedMesh.forEach((mesh) => {
    const { animations } = mesh;
    const mixer = new AnimationMixer(mesh);
    const clip = AnimationClip.findByName(animations, "fly-trap");
    if (clip) {
      const action = mixer.clipAction(clip);
      action.play();
    } else {
      console.error(`Animation clip  not found for mesh.`);
      return;
    }

    function step(timestamp: number) {
      const t =
        Math.max(Math.min(Math.cos(timestamp * 0.001), 0.9), 0.1) * 0.01;
      mixer.update(t);
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
};
