import React, { FC, useRef } from "react";
import { IAnimationWidgetScene } from "./types";
import { useFramework } from "./framework/useFramework";
import { useRunAnimations } from "./useRunAnimations";
import { RootContainer } from "../root-container";

interface IAnimationWidgetProps {
  scenes: IAnimationWidgetScene[];
  viewHeight?: string;
  viewWidth?: string;
}

// Scene framework for displaying multiple function based scenes
export const AnimationWidget: FC<IAnimationWidgetProps> = ({
  scenes,
  viewWidth = "100vw",
  viewHeight = "100vh",
}) => {
  const container = useRef(null);
  const { framework, updateFramework } = useFramework();
  useRunAnimations(container, scenes, updateFramework, framework);

  return (
    <RootContainer
      containerRef={container}
      viewWidth={viewWidth}
      viewHeight={viewHeight}
    />
  );
};
