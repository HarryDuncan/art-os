import { InteractiveThreeScene } from "visual/components/interactive-scene/InteractiveScene";
import { getMeshByName } from "visual/helpers/scene/getMeshByName";
import { ASSET_TYPES } from "visual/hooks/use-assets/types";
import { formatSceneData } from "./formatSceneData";
import { chainAnimation } from "visual/helpers/animation/chainAnimation";
import { LOGO_ANIMATION_CONFIG } from "./ltw.constants";

export const ltw = () => {
  return {
    threeJsParams: {
      camera: { position: { x: 0, y: 0, z: 10 } },
    },
    assets: [
      {
        name: "logo-geometry",
        url: "../assets/models/ltw/3dLogo.obj",
        assetType: ASSET_TYPES.Geometry,
      },
      {
        name: "matcap1",
        url: "../assets/textures/matcaps/pearl.jpg",
        assetType: ASSET_TYPES.Texture,
      },
      {
        name: "matcap2",
        url: "../assets/textures/backgrounds/blue-mag.jpg",
        assetType: ASSET_TYPES.Texture,
      },
    ],
    sceneFunctions: {
      onTimeUpdate: (scene: InteractiveThreeScene) => {
        const time = scene.clock.getElapsedTime() * 0.3;
        const marchingCube = getMeshByName(scene, "marching-cubes");
        updateCubes(marchingCube, time, 10);
        scene.animationManager.startAnimation("logo-rotate", {
          scene,
          targetIdentifier: "logo-geometry",
          animationConfig: LOGO_ANIMATION_CONFIG,
        });
      },
    },
    interactions: [],
    formatSceneData,
    animations: [
      {
        animationId: "logo-rotate",
        animationFunction: chainAnimation,
      },
    ],
  };
};

const updateCubes = (object, time, numblobs) => {
  object.reset();

  // fill the field with some metaballs
  const subtract = 12;
  const strength = 1.2 / ((Math.sqrt(numblobs) - 1) / 4 + 1);

  for (let i = 0; i < numblobs; i += 1) {
    const ballx =
      Math.sin(i + 1.26 * time * (1.03 + 0.5 * Math.cos(0.21 * i))) * 0.27 +
      0.5;
    const bally =
      Math.abs(Math.cos(i + 1.12 * time * Math.cos(1.22 + 0.1424 * i))) * 0.77; // dip into the floor
    const ballz =
      Math.cos(i + 1.32 * time * 0.1 * Math.sin(0.92 + 0.53 * i)) * 0.27 + 0.5;

    object.addBall(ballx, bally, ballz, strength, subtract);
  }

  object.update();
};
