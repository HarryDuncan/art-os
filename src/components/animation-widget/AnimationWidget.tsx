import React, { FC, useRef } from "react";
import { IAnimationWidgetScene } from "./interfaces";
import { useRunThread } from "./useRunThread";
import { useInitializeWidget } from "./useInitializeWidget";

interface IAnimationWidgetProps {
  scenes: IAnimationWidgetScene[];
  viewHeight?: string;
  viewWidth?: string;
}
var currentAnimation = 0;
// Scene manager for displaying multiple scenes in a particular setting
export const AnimationWidget: FC<IAnimationWidgetProps> = ({
  scenes,
  viewWidth = "100vw",
  viewHeight = "100vh",
}) => {
  const container = useRef(null);

  const { manager, setManager, sceneIndex, updateSceneIndex, sceneArray } =
    useInitializeWidget(scenes, viewWidth, viewHeight);

  useRunThread(
    manager,
    setManager,
    sceneIndex,
    updateSceneIndex,
    sceneArray,
    container
  );

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
