import { Camera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { InteractionEventObject } from "visual/hooks/use-interactions/types";

export default class InteractiveOrbitControls extends OrbitControls {
  constructor(
    renderer,
    camera: Camera,
    interactions: InteractionEventObject[]
  ) {
    super(camera, renderer);
  }
}
