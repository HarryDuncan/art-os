import { Vector2 } from 'three';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { getWindowParams } from 'visual/helpers/getWindowParams';

const BLOOM_PARAMS = {
  strength: 2,
  radius: 0.16,
  threshold: 0.7,
};
export const getBloomPass = () => {
  const { strength, radius, threshold } = BLOOM_PARAMS;
  const modifier = 1;
  const { width, height } = getWindowParams();
  const bloomPass = new UnrealBloomPass(
    new Vector2(width, height),
    strength * modifier,
    radius * modifier,
    threshold * modifier,
  );
  return bloomPass;
};
