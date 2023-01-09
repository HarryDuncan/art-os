// @ts-nocheck
import React, { useEffect, useMemo, useRef, useState, Suspense } from "react";
import * as THREE from "three";
import { useFrame, Canvas } from "react-three-fiber";
import { Text, Box, useMatcapTexture, Octahedron } from "@react-three/drei";

import useSlerp from "./useSlerp";
import useLayers from "./useLayers";
import useRenderTarget from "./useRenderTarget";

import { mirrorsData } from "./data";

const TEXT_PROPS = {
  fontSize: 2.5,
};

function Title({ layers, ...props }) {
  const group = useRef<any>();
  useEffect(() => {
    if (group.current) {
      group.current.lookAt(0, 0, 0);
    }
  }, []);

  const textRef = useLayers(layers);
  const [matcap] = useMatcapTexture("D0CCCB_524D50_928891_727581");
  return (
    <group {...props} ref={group}>
      <Text ref={textRef} name="text-panna" {...TEXT_PROPS}>
        {"PANNA"}
        <meshMatcapMaterial matcap={matcap} opacity={0.9} color="#14CEFF" />
      </Text>
    </group>
  );
}

function Mirror({
  sideMaterial,
  envMap,
  reflectionMaterial,
  args,
  layers,
  ...props
}) {
  const ref = useLayers(layers);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.001;
      ref.current.rotation.z += 0.01;
    }
  });

  return (
    <Box {...props} ref={ref} args={args}>
      {" "}
      <meshPhysicalMaterial
        ref={reflectionMaterial}
        envMap={envMap}
        color="#FFFFFF"
        metalness={1}
        reflectivity={0.9}
      />
    </Box>
  );
}

function Mirrors({ envMap, layers, ...props }) {
  const sideMaterial = useRef();
  const reflectionMaterial = useRef();
  console.log(sideMaterial);
  return (
    <group name="mirrors" {...props}>
      <meshLambertMaterial ref={sideMaterial} color="#AAAAAA" />

      {mirrorsData.mirrors.map((mirror, index) => (
        <Mirror
          key={`mirror-${index}`}
          layers={layers}
          {...mirror}
          name={`mirror-${index}`}
          sideMaterial={sideMaterial.current}
          envMap={envMap}
          reflectionMaterial={reflectionMaterial.current}
        />
      ))}
    </group>
  );
}

function TitleCopies({ layers }) {
  const vertices = useMemo(() => {
    const y = new THREE.IcosahedronGeometry(10);
    console.log(y);
    return [];
  }, []);

  return (
    <group name="titleCopies">
      {vertices.map((vertex, i) => (
        <Title name={"titleCopy-" + i} position={vertex} layers={layers} />
      ))}
    </group>
  );
}

function Scene() {
  const [cubeCamera, renderTarget] = useRenderTarget();
  const group = useSlerp();

  const [matcapTexture] = useMatcapTexture("0A0A0A_A9A9A9_525252_747474");

  return (
    <group name="sceneContainer" ref={group}>
      <Octahedron name="background" args={[20, 4]} position={[0, 0, -5]}>
        <meshMatcapMaterial
          matcap={matcapTexture}
          side={THREE.BackSide}
          transparent={true}
          color="#FFFFFF"
        />
      </Octahedron>
      <cubeCamera
        name="cubeCamera"
        ref={cubeCamera}
        args={[0.1, 100, renderTarget]}
        position={[0, 0, 5]}
      />
      <Title name="title" position={[0, 0, -5]} layers={[0]} />
      <TitleCopies layers={[0]} />
      <Mirrors layers={[0, 11]} envMap={renderTarget.texture} />
    </group>
  );
}

export const Scene1 = () => (
  <Suspense fallback={null}>
    <Canvas shadows={true} camera={{ position: [0, 0, 5], fov: 70 }}>
      <Scene />
    </Canvas>
  </Suspense>
);
