import { BufferAttribute, BufferGeometry, Vector3 } from "three";
import { vector3ToPosition3d } from "visual/display/helpers/conversion/vector3ToThreeDPosition";
import { getEquidistantCoordinates } from "visual/display/helpers/three-dimension-space/position/getEquidistantCoordinates";
import {
  AXIS,
  Axis,
  Position3d,
} from "visual/display/helpers/three-dimension-space/position/position.types";
import { AssetMetaData } from "visual/set-up/assets/asset.types";
import {
  getPositionsLength,
  getVertices,
} from "visual/set-up/config/mesh/geometry/attributes/attribute.functions";

export interface TransformGeometryConfig {
  extraVertexPoints: number;
}
export const transformGeometryVertices = (
  geometry: BufferGeometry,
  originalBufferGeometry,
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
  const allVertices = setUpExtraVertexPoints(
    originalBufferGeometry,
    extraVertexCount,
    assetMetaData,
    config
  );

  const totalLength = vertexCount + extraVertexCount;
  const combinedArray = new Float32Array(totalLength);
  combinedArray.set(currentVertices, 0);
  combinedArray.set(allVertices, currentVertices.length);
  const newGeometry = new BufferGeometry();
  newGeometry.setAttribute("position", new BufferAttribute(combinedArray, 3));

  newGeometry.setDrawRange(0, vertexCount);
  newGeometry.computeBoundingSphere();
  newGeometry.computeVertexNormals();
  return newGeometry;
};

const setUpExtraVertexPoints = (
  originalBufferGeometry: BufferGeometry,
  extraVertexCount: number,
  assetMetaData: AssetMetaData,
  config: TransformGeometryConfig
) => {
  const { boundingBox } = assetMetaData;
  const { extraVertexPoints } = config;
  const extraPoints = getEquidistantCoordinates(
    extraVertexPoints,
    boundingBox,
    AXIS.Y as Axis
  );

  const targetPoints = extraPoints.flatMap((point) => {
    const targetPoint = nearestPointInBufferGeometry(
      point,
      originalBufferGeometry
    );
    if (!targetPoint) {
      return [];
    }
    return vector3ToPosition3d(targetPoint);
  });

  const arraySize = Math.floor(extraVertexCount / extraVertexPoints);
  const remainderArraySize =
    extraVertexCount - arraySize * (extraVertexPoints - 1);

  return targetPoints.flatMap((coordinates, index) =>
    fillPoints(
      index === extraVertexPoints - 1 ? remainderArraySize : arraySize,
      coordinates
    )
  );
};

const fillPoints = (arraySize: number, coordinates: Position3d) =>
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

const nearestPointInBufferGeometry = (
  point: Position3d,
  bufferGeometry: BufferGeometry
) => {
  const positionAttribute = bufferGeometry.getAttribute("position");
  const positions = positionAttribute.array as Float32Array;
  const numVertices = positions.length / 3;
  const pointAsVector = new Vector3(point.x, point.y, point.z);
  let nearestVertexIndexes: number[] = [];
  let nearestDistance = Number.POSITIVE_INFINITY;
  let nearestPoint: Vector3 | null = null;
  // Iterate through all vertices and calculate distances
  for (let i = 0; i < numVertices; i++) {
    const x = positions[i * 3];
    const y = positions[i * 3 + 1];
    const z = positions[i * 3 + 2];

    const vertex = new Vector3(x, y, z);
    const distance = pointAsVector.distanceTo(vertex);

    // Check if this vertex is closer than the current nearest vertex
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestPoint = vertex;
      nearestVertexIndexes = [i];
    } else if (distance === nearestDistance) {
      // If there are multiple vertices at the same distance, add them to the list
      nearestVertexIndexes.push(i);
    }
  }

  return nearestPoint;
};
