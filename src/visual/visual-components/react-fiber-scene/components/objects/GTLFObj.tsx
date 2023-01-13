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

interface GTLFObjProps {
  layers?: number[];
  objectUrl: string;
  positions?: Vector3[];
  numberItems?: number;
  boundingBox?: Bounds3D;
}
export const GTLFObj = ({
  objectUrl,
  layers = [0, 11],
  boundingBox = DEFAULT_BOUNDING_BOX,
  numberItems,
  positions,
}: GTLFObjProps) => {
  // const ref = useLayers(layers);
  const { nodes } = useGLTF(objectUrl);

  const objectProperties = useObjectProperties(
    boundingBox,
    numberItems,
    positions
  );

  const [matcapTexture] = useMatcapTexture("2E763A_78A0B7_B3D1CF_14F209");
  const ref = useLayers(layers);
  return (
    <>
      {objectProperties.map(({ position, rotation }, index) => {
        return (
          <mesh
            key={index}
            position={position}
            rotation={rotation}
            geometry={nodes.Curve_1.geometry}
            scale={7}
            layers={layers}
            ref={ref}
          >
            <meshMatcapMaterial
              matcap={matcapTexture}
              opacity={0.9}
              color="#14CEFF"
            />
          </mesh>
        );
      })}
    </>
  );
};

const useObjectProperties = (
  boundingBox: Bounds3D,
  numberItems = 1,
  positions?: Vector3[]
) => {
  if (positions) {
    return [
      {
        positions,
        rotations: getRandomRotation(positions.length, boundingBox),
      },
    ];
  } else {
    return useRandomObjectProperties(numberItems, boundingBox);
  }
};
