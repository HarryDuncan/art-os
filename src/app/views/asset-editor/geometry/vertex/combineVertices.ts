import { CHUNK_SIZE } from "../editGeometry.consts";
import { AdditonalVertexPosition } from "../editGeometry.types";
import { chunkArray } from "./helpers/chunkArray";
import { fillPoints } from "./helpers/fillPoints";

const ADDITIONAL_CHUNK_SIZE = 10000;
export const combineVertices = (
  currentVertices: number[],
  additionalVertices: AdditonalVertexPosition[],
  vertexArrayLength: number
) => {
  const chunks = chunkArray(currentVertices);
  let addedVertexCount = 0;
  additionalVertices.forEach(({ vertices, insertPosition }) => {
    const chunkIndex = Math.floor(insertPosition / CHUNK_SIZE);
    const chunkOffset = insertPosition % CHUNK_SIZE;
    const chunkedAdditional = chunkArray(vertices, ADDITIONAL_CHUNK_SIZE);
    chunkedAdditional.forEach((additional) => {
      chunks[chunkIndex].splice(
        chunkOffset + addedVertexCount,
        0,
        ...additional
      );
    });

    addedVertexCount += vertices.length;
  });

  if (combineVertices.length % 3 !== 0 || vertexArrayLength % 3 !== 0) {
    console.warn("vertex array length not divisible by three");
  }
  const combinedVertices = ([] as number[]).concat(...chunks);

  if (combinedVertices.length < vertexArrayLength - 1) {
    const additionalPoints = fillPoints(
      vertexArrayLength - combinedVertices.length
    );
    return [...combinedVertices, ...additionalPoints];
  }
  if (combinedVertices.length > vertexArrayLength - 1) {
    return combinedVertices.slice(0, vertexArrayLength);
  }

  return combinedVertices;
};
