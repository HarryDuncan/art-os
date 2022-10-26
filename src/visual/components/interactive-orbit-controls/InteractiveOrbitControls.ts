import { Camera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { InteractionEventObject } from "visual/helpers/interactions/types";

export default class InteractiveOrbitControls extends OrbitControls {
  interactions: InteractionEventObject[];

  constructor(
    renderer,
    camera: Camera,
    interactions: InteractionEventObject[]
  ) {
    super(camera, renderer);
    this.interactions = interactions;
  }
}
