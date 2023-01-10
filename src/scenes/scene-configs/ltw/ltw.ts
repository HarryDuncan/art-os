import { BACKGROUND_TYPES } from "visual/visual-components/react-fiber-scene/reactFiberScene.constants";
import { ReactFiberSceneProps } from "visual/visual-components/react-fiber-scene/types";

export const ltw = (): ReactFiberSceneProps => {
  return {
    background: {
      type: BACKGROUND_TYPES.MatcapBackground,
      position: [0, 0, -5],
      layers: [0, 11],
      texture: "89204B_17080D_DA4377_F780B5",
    },
    light: {},
    camera: { position: [0, 0, 5], fov: 70 },
  };
};
