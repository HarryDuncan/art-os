// @ts-nocheck
import React, { Suspense } from "react";
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
import { Background } from "./components/background";
import useSlerp from "./hooks/useSlerp";
import useRenderTarget from "./hooks/useRenderTarget";
import useLayers from "./hooks/useLayers";
import { useCounter } from "visual/hooks/useCounter";
import { useRandomObjectProperties } from "visual/hooks/useRandomObjectProperties";
import { ReactFiberSceneProps } from "./types";
import { ReactFiberNode } from "./components/ReactFiberNode";

const TEXT_PROPS = {
  fontSize: 5,
  font: "../assets/AnimationS.woff",
};

function Title({ material, texture, map, layers, ...props }) {
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
        {"TOMMY\nCRAIG"}
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
      ref.current.rotation.y += 0.001;
      ref.current.rotation.z += 0.01;
    }
  });

  return (
    <TorusKnot
      position={props.position}
      rotation={props.rotation}
      scale={props.scale}
      layers={layers}
      ref={ref}
      smoothness={1}
      args={[2.5, 1, 2000, 2000]}
    >
      <meshMatcapMaterial matcap={matcap} opacity={0.9} color="#14CEFF" />
    </TorusKnot>
  );
}

function Diamonds({ layers, ...props }) {
  const [matcapTexture] = useMatcapTexture("1A2461_3D70DB_2C3C8F_2C6CAC");
  const { nodes } = useGLTF("../diamond.glb");

  const data = useRandomObjectProperties(7, BOUNDS);
  return (
    <group name="diamonds" {...props}>
      {nodes &&
        data.map((data, index) => (
          <Diamond
            key={`diamond-${index}`}
            name={`diamond-${index}`}
            geometry={nodes.Cylinder.geometry}
            {...data}
            matcap={matcapTexture}
            scale={[0.15, 0.15, 0.15]}
            layers={layers}
          />
        ))}
    </group>
  );
}

const ReactFiberSceneInner = ({
  sceneProps,
}: {
  sceneProps: ReactFiberSceneProps;
}) => {
  const [cubeCamera, renderTarget] = useRenderTarget();
  const colorMap = useTexture("../assets/textures/LTW.jpg");
  const group = useSlerp();
  return (
    <>
      <Background props={sceneProps.background} />
      <cubeCamera
        layers={[11]}
        name="cubeCamera"
        ref={cubeCamera}
        args={[0.1, 100, renderTarget]}
        position={[0, 0, -12]}
      />
      <group name="sceneContainer" ref={group}>
        <Diamonds layers={[0, 11]} map={colorMap} />
        <group name="text" position={[0, 0, -5]}>
          <Title
            layers={[0]}
            name="title"
            texture={renderTarget.texture}
            map={colorMap}
          />
        </group>
      </group>
    </>
  );
};
const Loader = () => <p>Loading</p>;

export const ReactFiberScene = (sceneProps: ReactFiberSceneProps) => {
  return (
    <Suspense fallback={<Loader />}>
      <ReactFiberNode
        cameraProps={sceneProps.camera}
        lightProps={sceneProps.light}
      >
        <ReactFiberSceneInner sceneProps={sceneProps} />
      </ReactFiberNode>
    </Suspense>
  );
};

const BOUNDS = {
  lowerBoundX: -5,
  upperBoundX: 5,
  lowerBoundY: -2,
  upperBoundY: 4,
  lowerBoundZ: -0,
  upperBoundZ: 2,
};
