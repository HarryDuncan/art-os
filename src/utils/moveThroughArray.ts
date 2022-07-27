export enum Direction {
  FORWARD = 'forward',
  REVERSE = 'reverse',
}

export function moveThroughArray<T>(
  array: Array<T>,
  index: number,
  direction: Direction = Direction.FORWARD,
): { item: T; newIndex: number } {
  const step = direction === Direction.FORWARD ? 1 : -1;
  const newIndex = index + step;
  if (newIndex > array.length - 1) {
    return { item: array[0], newIndex: 0 };
  } if (newIndex < 0) {
    return { item: array[array.length - 1], newIndex: array.length - 1 };
  }
  return { item: array[newIndex], newIndex };
}
