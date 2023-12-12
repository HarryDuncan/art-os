export const createAdditionalVertexArray = (
  extraVertexCount: number,
  positions: Float32Array
) => {
  const positionsCount = positions.length - 1;

  const positionsAsObjects: any = [];
  for (let i = 0; i < positionsCount; i += 1) {
    if (i % 3 === 0) {
      positionsAsObjects.push({
        x: positions[i],
        y: positions[i + 1],
        z: positions[i + 2],
      });
    }
  }
  const additionalVerticies: number[] = [];
  let direction = -1;
  let currentIndex = positionsAsObjects.length - 1;
  for (let i = 3; i <= extraVertexCount; i += 3) {
    // add the items
    additionalVerticies.push(positionsAsObjects[currentIndex].x);
    additionalVerticies.push(positionsAsObjects[currentIndex].y);
    additionalVerticies.push(positionsAsObjects[currentIndex].z);

    // move index in direction
    if (i % 9 === 0) {
      currentIndex += direction;
      if (currentIndex === 0) {
        direction = 1;
      } else if (currentIndex === positionsAsObjects.length - 1) {
        direction = -1;
      }
    }
  }
  return additionalVerticies;
};
