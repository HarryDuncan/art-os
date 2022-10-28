import React from "react";
import { useAppSelector } from "app/redux/store";
import { VisualComponentConfig } from "app/redux/visual/types";
import { InteractiveNode } from "../interactive-node/InteractiveNode";
import { Layers } from "../layers/Layers";
import { Root } from "./RootContainer.styles";

interface IRootContainerProps {
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
  config?: Partial<VisualComponentConfig>;
}
// Scene manager for displaying multiple scenes in a particular setting
export function RootContainer({ containerRef, config }: IRootContainerProps) {
  const {
    visualComponentConfig,
    visualData: { interactionEvents },
  } = useAppSelector((state) => state.visual);
  const componentConfig = { ...visualComponentConfig, ...config };
  const { viewHeight, viewWidth, backgroundColor } = componentConfig;
  return (
    <>
      <Layers />
      <InteractiveNode />
      <Root
        $height={viewHeight}
        $width={viewWidth}
        ref={containerRef}
        $backgroundColor={backgroundColor}
      />
    </>
  );
}
