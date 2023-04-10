import {
  BufferAttribute,
  BufferGeometry,
  Float32BufferAttribute,
  Mesh,
  Points,
} from "three";
import { Geometry } from "types/threeJs.types";
import {
  MESH_TYPES,
  MeshConfig,
  MeshType,
} from "utils/assets/geometry/geometry.types";

export const setUpMeshes = (meshConfigs: MeshConfig[] = []) => {
  return meshConfigs.flatMap(
    ({ geometry, name, material, meshType, position, rotation }, index) => {
      const mesh = getMesh(geometry, material, meshType);
      formatMesh(mesh, position, rotation, name ?? `mesh-${index}`);
      return mesh;
    }
  );
};

const getMesh = (geometry: Geometry, material, meshType?: MeshType) => {
  switch (meshType) {
    case MESH_TYPES.POINTS:
      const positionsLength = geometry.getAttribute("position").array.length;

      const pointIds = new Float32Array(positionsLength);
      pointIds.forEach((value, index) => {
        pointIds[index] = Number(index.toFixed(1));
      });
      geometry.setAttribute("pointId", new BufferAttribute(pointIds, 1));
      console.log(geometry);
      return new Points(geometry, material);
    case MESH_TYPES.MESH:
    default:
      return new Mesh(geometry, material);
  }
};

const formatMesh = (mesh, position, rotation, name) => {
  mesh.name = name;
  if (position) {
    const { x, y, z } = position;
    mesh.position.set(x, y, z);
  }
  if (rotation) {
    const { x, y, z } = rotation;
    mesh.rotation.set(x, y, z);
  }
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
