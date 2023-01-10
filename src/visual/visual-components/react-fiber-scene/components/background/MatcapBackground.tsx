import React from "react";
import * as THREE from "three";
import { useMatcapTexture, Octahedron } from "@react-three/drei";
import useLayers from "../../hooks/useLayers";

export const MatcapBackground = ({ layers, position, texture }) => {
  const ref = useLayers([...layers]);
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
