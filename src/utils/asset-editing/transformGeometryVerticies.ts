import { BufferAttribute, BufferGeometry } from "three";
import { getEquidistantCoordinates } from "visual/display/helpers/three-dimension-space/position/getEquidistantCoordinates";
import {
  AXIS,
  Axis,
  ThreeDPosition,
} from "visual/display/helpers/three-dimension-space/position/position.types";
import { AssetMetaData } from "visual/set-up/assets/asset.types";
import {
  getPositionsLength,
  getVertices,
} from "visual/set-up/config/mesh/geometry/attributes/attribute.functions";

export interface TransformGeometryConfig {
  extraVertexPoints: number;
}
export const transformGeometryVerticies = (
  geometry: BufferGeometry,
  maxVertexCount: number,
  assetMetaData: AssetMetaData,
  config: TransformGeometryConfig
) => {
  const currentVertices = getVertices(geometry);
  const vertexCount = getPositionsLength(geometry);
  const extraVertexCount = maxVertexCount - vertexCount;
  if (extraVertexCount <= 0) {
    return geometry;
  }
  const allVerticies = setUpExtraVertexPoints(
    extraVertexCount,
    assetMetaData,
    config
  );

  const totalLength = vertexCount + extraVertexCount;
  const combinedArray = new Float32Array(totalLength);
  combinedArray.set(currentVertices, 0);
  combinedArray.set(allVerticies, currentVertices.length);
  const newGeometry = new BufferGeometry();
  newGeometry.setAttribute("position", new BufferAttribute(combinedArray, 3));

  newGeometry.setDrawRange(0, vertexCount);
  newGeometry.computeBoundingSphere();
  newGeometry.computeVertexNormals();
  return newGeometry;
};

const setUpExtraVertexPoints = (
  extraVertexCount: number,
  assetMetaData: AssetMetaData,
  config: TransformGeometryConfig
) => {
  const { boundingBox } = assetMetaData;
  const { extraVertexPoints } = config;
  const extraPoints = getEquidistantCoordinates(
    extraVertexPoints,
    boundingBox,
    AXIS.X as Axis
  );

  const arraySize = Math.floor(extraVertexCount / extraVertexPoints);
  const remainderArraySize =
    extraVertexCount - arraySize * (extraVertexPoints - 1);
  return extraPoints.flatMap((coordinates, index) =>
    fillPoints(
      index === extraVertexPoints - 1 ? remainderArraySize : arraySize,
      coordinates
    )
  );
};

const fillPoints = (arraySize: number, coordinates: ThreeDPosition) =>
  new Array(arraySize).fill(0).map((_value, index) => {
    const axis = index % 3;
    if (axis === 0) {
      return coordinates.x;
    }
    if (axis === 1) {
      return coordinates.y;
    }
    return coordinates.z;
  });
