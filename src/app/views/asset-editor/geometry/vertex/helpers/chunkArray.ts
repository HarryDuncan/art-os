import { CHUNK_SIZE } from "../../editGeometry.consts";

export const chunkArray = (array: number[], chunkSize = CHUNK_SIZE) => {
  const numChunks = Math.ceil(array.length / chunkSize);
  const chunks: number[][] = [];
  for (let i = 0; i < numChunks; i++) {
    const start = i * chunkSize;
    const end = Math.min(start + chunkSize, array.length);
    const chunk = array.slice(start, end);
    chunks.push(chunk);
  }
  return chunks;
};
