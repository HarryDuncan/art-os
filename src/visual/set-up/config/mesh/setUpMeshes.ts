import { Box3, BufferAttribute, Mesh, Points, Vector3 } from "three";
import { Geometry } from "types/threeJs.types";
import {
  MeshConfig,
  MeshType,
  MESH_TYPES,
  MeshAttributeConfig,
} from "visual/set-up/assets/geometry/geometry.types";
import { ThreeDPosition } from "visual/display/helpers/three-dimension-space/position/position.types";

export const setUpMeshes = (meshConfigs: MeshConfig[] = []) => {
  console.log(meshConfigs);
  return meshConfigs.flatMap(
    (
      {
        geometry,
        name,
        material,
        meshAttributeConfig,
        position,
        rotation,
        groupId,
      },
      index
    ) => {
      const mesh = getMesh(geometry, material, meshAttributeConfig);
      formatMesh(mesh, name ?? `mesh-${index}`, position, rotation, groupId);
      return mesh;
    }
  );
};

const attributeConfig = [{ type: "POINT_ID" }];

const getMesh = (
  geometry: Geometry,
  material,
  meshAttributeConfig: MeshAttributeConfig = {
    meshType: MESH_TYPES.MESH,
  } as MeshAttributeConfig
) => {
  const { meshType } = meshAttributeConfig;
  switch (meshType) {
    case MESH_TYPES.POINTS: {
      const positionsLength = geometry.getAttribute("position").array.length;

      const pointIds = new Float32Array(positionsLength / 3);
      pointIds.forEach((_value, index) => {
        pointIds[index] = Number(index.toFixed(1));
      });

      const angles = new Float32Array(positionsLength / 3);
      angles.forEach((_value, index) => {
        angles[index] = Math.random() * Math.PI;
      });

      getBoundingBoxDimensions(geometry);
      geometry.setAttribute("pointIndex", new BufferAttribute(pointIds, 1));
      geometry.setAttribute("angle", new BufferAttribute(angles, 1, false));
      return new Points(geometry, material);
    }

    case MESH_TYPES.MESH:
    default:
      setUpAttributes(geometry, attributeConfig);
      return new Mesh(geometry, material);
  }
};

const formatMesh = (
  mesh,
  name: string,
  position?: ThreeDPosition,
  rotation?: ThreeDPosition,
  groupId?: string
) => {
  mesh.name = name;
  mesh.groupId = groupId;
  if (position) {
    const { x, y, z } = position;
    mesh.position.set(x, y, z);
  }
  if (rotation) {
    const { x, y, z } = rotation;
    mesh.rotation.set(x, y, z);
  }
};

const ATTRIBUTE_TYPES = {
  POINT_ID: "POINT_ID",
};

const setUpAttributes = (geometry, attributeConfig) => {
  const positionsLength = geometry.getAttribute("position").array.length;
  attributeConfig.forEach((attribute) => {
    switch (attribute.type) {
      case ATTRIBUTE_TYPES.POINT_ID:
        const pointIds = new Float32Array(positionsLength / 3);
        pointIds.forEach((_value, index) => {
          pointIds[index] = Number(index.toFixed(1));
        });
        geometry.setAttribute("pointIndex", new BufferAttribute(pointIds, 1));
    }
  });
};
// function removeXPositionsAndNormals(
//   geometry: THREE.BufferGeometry,
//   n: number
// ): THREE.BufferGeometry {
//   const positionArray = geometry.getAttribute("position").array;
//   // const normalArray = geometry.getAttribute("normal").array;
//   const resultPositionArray: number[] = [];
//   const resultNormalArray: number[] = [];

//   for (let i = 0; i < positionArray.length; i += 3) {
//     if (i % (n * 3) !== 0) {
//       // keep only positions that are not a multiple of n
//       resultPositionArray.push(positionArray[i + 1]); // push y position
//       resultPositionArray.push(positionArray[i + 2]); // push z position
//     }
//   }

//   const resultGeometry = new BufferGeometry();
//   resultGeometry.setAttribute(
//     "position",
//     new Float32BufferAttribute(resultPositionArray, 3)
//   );
//   resultGeometry.computeVertexNormals();
//   resultGeometry.computeBoundingSphere();

//   return resultGeometry;
// }
export const getBoundingBoxDimensions = (geometry) => {
  // Create a Box3 object
  const boundingBox = new Box3();

  // Set the bounding box to encapsulate the model
  boundingBox.setFromBufferAttribute(geometry.getAttribute("position"));

  // Get the size of the bounding box
  const size = new Vector3();
  boundingBox.getSize(size);
};
