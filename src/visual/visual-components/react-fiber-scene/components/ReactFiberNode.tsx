import React from "react";
import { Canvas } from "react-three-fiber";
import { LIGHT_TYPES } from "../reactFiberScene.constants";
import { CameraProps, LightProps } from "../types";

interface ReactFiberNodeProps {
  cameraProps: CameraProps;
  lightProps: LightProps[];
  children: any;
}
export const ReactFiberNode = ({
  cameraProps,
  lightProps,
  children,
}: ReactFiberNodeProps) => {
  return (
    <Canvas shadows={true} camera={cameraProps}>
      {lightProps.map((lightProp, index) => {
        switch (lightProp.type) {
          case LIGHT_TYPES.AMBIENT:
          default:
            return <ambientLight key={`light-${index}`} intensity={0.4} />;
        }
      })}
      {children}
    </Canvas>
  );
};
