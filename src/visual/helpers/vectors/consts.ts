import { Vector2 } from 'three';

export const DIRECTION_KEYS = {
  LEFT_TO_RIGHT: 'LEFT_TO_RIGHT',
  RIGHT_TO_LEFT: 'RIGHT_TO_LEFT',
  TOP_TO_BOTTOM: 'TOP_TO_BOTTOM',
  BOTTOM_TO_TOP: 'BOTTOM_TO_TOP',
};
export const DIRECTIONS = {
  LEFT_TO_RIGHT: new Vector2(-1, 0),
  RIGHT_TO_LEFT: new Vector2(1, 0),
  TOP_TO_BOTTOM: new Vector2(0, -1),
  BOTTOM_TO_TOP: new Vector2(0, 1),
};
