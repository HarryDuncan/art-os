import { BufferAttribute, BufferGeometry } from "three";
import { AssetMetaData } from "visual/set-up/assets/asset.types";
import {
  getPositionsLength,
  getVertices,
} from "visual/set-up/config/mesh/geometry/attributes/attribute.functions";
import { retrieveAdditionalVertices } from "./retrieveAdditionalVertices";
import { combineVertices } from "./combineVertices";
import { VertexAdditonConfig } from "../editGeometry.types";

export const setSameVertexCount = (
  geometry: BufferGeometry,
  originalBufferGeometry,
  maxVertexCount: number,
  assetMetaData: AssetMetaData,
  config: VertexAdditonConfig
) => {
  const currentVertices = getVertices(geometry);
  const vertexCount = getPositionsLength(geometry);
  const extraVertexCount = maxVertexCount - vertexCount;
  if (extraVertexCount <= 0) {
    return geometry;
  }
  const additional = retrieveAdditionalVertices(
    originalBufferGeometry,
    extraVertexCount,
    assetMetaData,
    config
  );
  const totalLength = vertexCount + extraVertexCount;
  const combinedVertices = combineVertices(
    currentVertices as number[],
    additional,
    totalLength
  );
  const combinedArray = new Float32Array(totalLength);
  combinedArray.set(combinedVertices, 0);
  const newGeometry = new BufferGeometry();
  newGeometry.setAttribute("position", new BufferAttribute(combinedArray, 3));

  newGeometry.setDrawRange(0, vertexCount);
  newGeometry.computeBoundingSphere();
  newGeometry.computeVertexNormals();
  return newGeometry;
};
