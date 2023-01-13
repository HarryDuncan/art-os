import { Vector3 } from "three";
import {
  BACKGROUND_TYPES,
  LIGHT_TYPES,
  OBJECT_TYPES,
} from "visual/visual-components/react-fiber-scene/reactFiberScene.constants";
import {
  GTLFObject,
  ReactFiberSceneProps,
} from "visual/visual-components/react-fiber-scene/types";

export const ltw = (): ReactFiberSceneProps => {
  return {
    background: {
      type: BACKGROUND_TYPES.MATCAPBACKGROUND,
      position: new Vector3(0, 0, -5),
      layers: [0, 11],
      texture: "89204B_17080D_DA4377_F780B5",
    },
    light: [{ type: LIGHT_TYPES.AMBIENT, intensity: 0.4 }],
    camera: { position: new Vector3(0, 0, 5), fov: 70 },
    objects: [
      {
        objectType: OBJECT_TYPES.GTLF_GROUP,
        objectUrl: "../assets/models/ltw/logo.glb",
      } as GTLFObject,
    ],
  };
};
