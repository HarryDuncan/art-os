import React from "react";
import { useMatcapTexture, Octahedron } from "@react-three/drei";
import * as THREE from "three";
import useLayers from "./useLayers";

export const Background = ({ layers, position, texture }) => {
  const ref = useLayers(layers);
  // EA783E_6D4830_905837_FCDC6C;
  // EA783E_6D4830_905837_FCDC6C
  const [matcapTexture] = useMatcapTexture(texture);

  return (
    <Octahedron ref={ref} name="background" args={[20, 4]} position={position}>
      <meshMatcapMaterial
        matcap={matcapTexture}
        side={THREE.BackSide}
        color="#FFFFFF"
      />
    </Octahedron>
  );
};
