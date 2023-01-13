import { InteractiveThreeScene } from "visual/components/interactive-scene/InteractiveScene";
import { AssetType } from "visual/hooks/use-assets/types";
import { formatSceneData } from "./formatSceneData";

export const ltw = () => {
  return {
    threeJsParams: {
      camera: { position: { x: 0, y: 0, z: 10 } },
    },
    assets: [
      {
        name: "logo-geometry",
        url: "../assets/models/ltw/3dLogo.obj",
        assetType: AssetType.Geometry,
      },
      {
        name: "matcap1",
        url: "../assets/textures/matcaps/pearl.jpg",
        assetType: AssetType.Texture,
      },
    ],
    sceneFunctions: {
      onTimeUpdate: (scene: InteractiveThreeScene) => {
        console.log(scene);
        const mesh = scene.children[0];
        mesh.rotation.z += 0.01;
      },
    },
    formatSceneData,
  };
};
