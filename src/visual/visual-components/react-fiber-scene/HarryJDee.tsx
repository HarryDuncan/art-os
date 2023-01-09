// @ts-nocheck
import React, { useMemo, Suspense } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "react-three-fiber";
import {
  Text,
  useMatcapTexture,
  Octahedron,
  useGLTF,
  Box,
  useLoader,
  useTexture,
  TorusKnot,
  Sphere,
  GradientTexture,
} from "@react-three/drei";
import useSlerp from "./useSlerp";
import useRenderTarget from "./useRenderTarget";
import { mirrorsData as diamondsData } from "./data";
import useLayers from "./useLayers";
import { useCounter } from "visual/hooks/useCounter";
import { useRandomObjectProperties } from "visual/hooks/useRandomObjectProperties";

const TEXT_PROPS = {
  fontSize: 5,
  font: "../assets/AnimationS.woff",
};

function Title({ material, texture, layers, ...props }) {
  const textRef = useLayers(layers);
  // console.log(textRef);

  const { count, stepFunction } = useCounter(0.005, -5, 5);
  useFrame(() => {
    if (textRef.current) {
      stepFunction();
      textRef.current.position.x = count;
    }
  });

  return (
    <group {...props}>
      <Text
        ref={textRef}
        name="text-olga"
        depthTest={false}
        position={[-5, 0, -0.5]}
        {...TEXT_PROPS}
      >
        {"Harry\nJ Dee"}
        <meshPhysicalMaterial
          envMap={texture}
          specularColor={"#FFFFFF"}
          clearcoat={1}
          roughness={0}
          metalness={1}
          reflectivity={0.5}
          color="#999997"
        />
      </Text>
    </group>
  );
}

function Diamond({ map, texture, matcap, layers, ...props }) {
  const ref = useLayers(layers);

  useFrame(() => {
    if (ref.current) {
      // ref.current.rotation.y += 0.001;
      ref.current.rotation.z += 0.01;
    }
  });

  return (
    <mesh
      position={props.position}
      rotation={[1.5, 0, 0]}
      geometry={props.geometry}
      scale={props.scale}
      layers={layers}
      ref={ref}
    >
      <meshMatcapMaterial matcap={matcap} color="#14CEFF" />
    </mesh>
  );
}

function Diamonds({ layers, ...props }) {
  const [matcapTexture] = useMatcapTexture("4F4C45_A7AEAA_7A8575_9D97A2");
  const { nodes } = useGLTF("../Model.glb");
  console.log(nodes);
  const data = useRandomObjectProperties(2, BOUNDS);

  return (
    <group name="diamonds" {...props}>
      {nodes &&
        data.map((data, index) => (
          <Diamond
            key={`diamond-${index}`}
            name={`diamond-${index}`}
            geometry={nodes.HerculesBust.geometry}
            {...data}
            matcap={matcapTexture}
            scale={[0.05, 0.05, 0.05]}
            layers={layers}
          />
        ))}
    </group>
  );
}

function Background({ layers, ...props }) {
  const ref = useLayers(layers);
  // EA783E_6D4830_905837_FCDC6C;
  // EA783E_6D4830_905837_FCDC6C
  const [matcapTexture] = useMatcapTexture("ED4630_791A0E_A42716_501009");

  return (
    <Octahedron ref={ref} name="background" args={[20, 4, 4]} {...props}>
      <meshMatcapMaterial
        matcap={matcapTexture}
        side={THREE.BackSide}
        color="#FFFFFF"
      />
    </Octahedron>
  );
}
const ReactFiberSceneInner = () => {
  const [cubeCamera, renderTarget] = useRenderTarget();

  const group = useSlerp();

  return (
    <>
      <Background layers={[0, 11]} position={[0, 0, -5]} />
      <cubeCamera
        layers={[11]}
        name="cubeCamera"
        ref={cubeCamera}
        args={[0.1, 100, renderTarget]}
        position={[0, 0, -12]}
      />
      <group name="sceneContainer" ref={group}>
        <Diamonds layers={[0, 11]} />
        <group name="text" position={[0, 0, -5]}>
          <Title layers={[0]} name="title" texture={renderTarget.texture} />
        </group>
      </group>
    </>
  );
};
const Loader = () => <p>Loading</p>;
export const HarryJDee = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Canvas shadows={true} camera={{ position: [0, 0, 5], fov: 70 }}>
        <ReactFiberSceneInner />
        <ambientLight intensity={0.4} />
      </Canvas>
    </Suspense>
  );
};

const BOUNDS = {
  lowerBoundX: -2,
  upperBoundX: 3,
  lowerBoundY: -3,
  upperBoundY: 2,
  lowerBoundZ: -0,
  upperBoundZ: 2,
};
