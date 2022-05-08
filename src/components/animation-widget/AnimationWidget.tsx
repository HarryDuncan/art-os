import React, { FC, useRef } from "react";
import { IAnimationWidgetScene } from "./types";
import { useFramework } from "./framework/useFramework";
import { useRunAnimations } from "./useRunAnimations";

interface IAnimationWidgetProps {
  scenes: IAnimationWidgetScene[];
  viewHeight?: string;
  viewWidth?: string;
}

// Scene framework for displaying multiple scenes in a particular setting
export const AnimationWidget: FC<IAnimationWidgetProps> = ({
  scenes,
  viewWidth = "100vw",
  viewHeight = "100vh",
}) => {
  const container = useRef(null);

  const { framework, updateFramework } = useFramework();

  useRunAnimations(container, scenes, updateFramework, framework);

  return (
    <div
      key={`Animation Container`}
      style={{
        height: `${viewHeight}`,
        width: `${viewWidth}`,
        overflow: "hidden",
      }}
      ref={container}
    ></div>
  );
};
