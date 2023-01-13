// @ts-nocheck

import { useGLTF, useMatcapTexture } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { useLoader } from "@react-three/fiber";
import React from "react";
import { Vector3 } from "three";
import { getRandomRotation } from "visual/helpers/getRandomRotation";
import { useRandomObjectProperties } from "visual/hooks/useRandomObjectProperties";
import useLayers from "../../hooks/useLayers";
import { DEFAULT_BOUNDING_BOX } from "../../reactFiberScene.constants";
import { Bounds3D } from "../../types";
import { degreesToEuler } from "visual/helpers/three-dimension-space/degreesToEuler";

interface GTLFObjProps {
  layers?: number[];
  objectUrl: string;
  positions?: Vector3[];
  numberItems?: number;
  boundingBox?: Bounds3D;
}
export const GTLFObjGroup = ({
  objectUrl,
  layers = [0, 11],
  boundingBox = DEFAULT_BOUNDING_BOX,
  numberItems,
  positions,
}: GTLFObjProps) => {
  // const ref = useLayers(layers);
  const { nodes } = useGLTF(objectUrl);

  const [matcapTexture] = useMatcapTexture("2E763A_78A0B7_B3D1CF_14F209");
  const ref = useLayers(layers);

  // const axis = new THREE.Vector3(1, 0, 0);
  const rotationDegrees = [90, 0, 0];
  const rotationEueler = rotationDegrees.map((rotation) =>
    degreesToEuler(rotation)
  );
  console.log(nodes);

  return (
    <group
      name="mesh-obj"
      ref={ref}
      position={[0, 0, 4.5]}
      rotation={rotationEueler}
    >
      {nodes &&
        Object.keys(nodes).map((key, index) => {
          const node = getNodeProperties(nodes[key]);
          console.log(node);
          if (!node) return null;

          return (
            <mesh
              key={index}
              position={node.position}
              rotation={node.rotation}
              geometry={node.geometry}
              scale={1}
            >
              <meshMatcapMaterial
                texture={matcapTexture}
                opacity={1}
                color="#FFFFFF"
              />
            </mesh>
          );
        })}
    </group>
  );
};

const getNodeProperties = (node) => {
  if (!node.isMesh) return null;
  return node;
};
