import { BufferGeometry, Vector3 } from "three";
import { AssetMetaData } from "visual/set-up/assets/asset.types";
import { getEquidistantCoordinates } from "visual/display/helpers/three-dimension-space/position/getEquidistantCoordinates";
import {
  AdditonalVertexPosition,
  VertexAdditonConfig,
} from "../editGeometry.types";
import { vector3ToPosition3d } from "visual/display/helpers/conversion/vector3ToThreeDPosition";
import {
  AXIS,
  Axis,
  Position3d,
} from "visual/display/helpers/three-dimension-space/position/position.types";
import { fillPoints } from "./helpers/fillPoints";

export const retrieveAdditionalVertices = (
  originalBufferGeometry: BufferGeometry,
  extraVertexCount: number,
  assetMetaData: AssetMetaData,
  config: VertexAdditonConfig
): AdditonalVertexPosition[] => {
  const { boundingBox } = assetMetaData;
  const { vertexPositionsCount } = config;
  const extraPoints = getEquidistantCoordinates(
    vertexPositionsCount,
    boundingBox,
    AXIS.Y as Axis
  );
  const vCount = extraVertexCount;

  const arraySize = Math.floor(vCount / vertexPositionsCount);
  const remainderArraySize =
    extraVertexCount - arraySize * (vertexPositionsCount - 1);

  return extraPoints.flatMap((point, index) => {
    const { nearestPoint, vertexIndex } = nearestPointInBufferGeometry(
      point,
      originalBufferGeometry
    );
    if (!nearestPoint) {
      return [];
    }
    const vectorPoint = vector3ToPosition3d(nearestPoint);
    const vertices = fillPoints(
      index === vertexPositionsCount - 1 ? remainderArraySize : arraySize,
      vectorPoint
    );
    return { vertices, insertPosition: vertexIndex };
  });
};

const nearestPointInBufferGeometry = (
  point: Position3d,
  bufferGeometry: BufferGeometry
) => {
  const positionAttribute = bufferGeometry.getAttribute("position");
  const positions = positionAttribute.array as Float32Array;
  const numVertices = positions.length / 3;
  const pointAsVector = new Vector3(point.x, point.y, point.z);
  let vertexIndex: number = 0;
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
      vertexIndex = i;
    }
  }

  return { nearestPoint, vertexIndex };
};
