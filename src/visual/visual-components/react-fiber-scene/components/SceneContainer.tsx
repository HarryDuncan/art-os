import React from "react";
import { Layers } from "react-three-fiber";
import useRenderTarget from "../hooks/useRenderTarget";
import useSlerp from "../hooks/useSlerp";
import { BackgroundProps, ReactFiberSceneObjects } from "../types";
import { Background } from "./background";
import { Objects } from "./objects/Objects";

interface SceneContainerProps {
  name: string;
  background: BackgroundProps;
  objects: ReactFiberSceneObjects[];
}
export const SceneContainer = ({
  background,
  objects,
}: SceneContainerProps) => {
  const { cubeCamera, renderTarget } = useRenderTarget();
  const group = useSlerp();
  return (
    <>
      <Background props={background} />
      <cubeCamera
        layers={([11] as unknown) as Layers}
        name="cubeCamera"
        // @ts-ignore
        ref={cubeCamera}
        args={[0.1, 100, renderTarget]}
        position={[0, 0, -12]}
      />
      <group name="sceneContainer" ref={group.current}>
        <Objects objectData={objects} renderTarget={renderTarget} />
      </group>
      ;
    </>
  );
};
