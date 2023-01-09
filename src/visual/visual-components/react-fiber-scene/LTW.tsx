import { Svg } from "@react-three/drei";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useLoader } from "react-three-fiber";
import { Background } from "./Background";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import { flatten } from "lodash";
import * as THREE from "three";
import { resolve } from "node:path/win32";
const BACKGROUND_MATCAP = "EA783E_6D4830_905837_FCDC6C";

// Promise of an SVG parsed into paths
// with which the threejs engine will make shapes
const svgResource = async () =>
  new Promise((resolve: any) =>
    new SVGLoader().load("./Logo.svg", (shapes) => {
      console.log(shapes);
      flatten(
        shapes.paths.map((group, index) => {
          return group.toShapes(true).map((shape) => {
            resolve({ shape, color: "#999997", index });
          });
        })
      );
    })
  );

function SvgShape({ shape, color, index }) {
  const mesh = useRef<any>();
  return (
    <mesh ref={mesh}>
      <shapeBufferGeometry attach="geometry" args={[shape]} />
      <meshBasicMaterial
        attach="material"
        color={color}
        opacity={1}
        side={THREE.DoubleSide}
        depthWrite={true}
        /*
          HACK: Offset SVG polygons by index
          The paths from SVGLoader Z-fight.
          This fix causes stacking problems with detailed SVGs.
        */
        polygonOffset
        polygonOffsetFactor={index * -0.1}
      />
    </mesh>
  );
}

export const SceneInner = () => {
  const [shapes, set] = useState([]);

  useEffect(() => {
    async function fetchSVG() {
      const svg = await svgResource();
      console.log(svg);
      set(svg as any);
    }

    fetchSVG();
  }, []);
  return (
    <>
      <Background
        layers={[0, 11]}
        position={[0, 0, -5]}
        texture={BACKGROUND_MATCAP}
      />
    </>
  );
};
export const LTW = () => {
  return (
    <Suspense fallback={null}>
      <Canvas shadows={true} camera={{ position: [0, 0, 5], fov: 70 }}>
        <SceneInner />
        <ambientLight intensity={0.4} />
      </Canvas>
    </Suspense>
  );
};
