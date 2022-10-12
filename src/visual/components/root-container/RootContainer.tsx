import React from "react";
import { Root } from "./RootContainer.styles";

interface IRootContainerProps {
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
  viewWidth?: string;
  viewHeight?: string;
  backgroundColor?: string;
}
// Scene manager for displaying multiple scenes in a particular setting
export function RootContainer({
  containerRef,
  viewWidth = "100vw",
  viewHeight = "100vh",
  backgroundColor = "black",
}: IRootContainerProps) {
  return (
    <Root
      $height={viewHeight}
      $width={viewWidth}
      ref={containerRef}
      $backgroundColor={backgroundColor}
    />
  );
}
