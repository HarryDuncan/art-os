import { Vector2 } from "three";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { getWindowParams } from "visual/display/helpers/getWindowParams";

const BLOOM_PARAMS = {
  strength: 1.8,
  radius: 0.1,
  threshold: 0.1,
};
export const getBloomPass = () => {
  const { strength, radius, threshold } = BLOOM_PARAMS;
  const modifier = 1;
  const { width, height } = getWindowParams();
  const bloomPass = new UnrealBloomPass(
    new Vector2(width, height),
    strength * modifier,
    radius * modifier,
    threshold * modifier
  );
  return bloomPass;
};
