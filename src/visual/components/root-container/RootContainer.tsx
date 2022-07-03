import React from "react";

interface IRootContainerProps {
  containerRef: React.MutableRefObject<any>;
  children?: React.ReactNode;
  viewWidth?: string;
  viewHeight?: string;
}
// Scene manager for displaying multiple scenes in a particular setting
export const RootContainer = ({
  containerRef,
  viewWidth = "100vw",
  viewHeight = "100vh",
}: IRootContainerProps) => {
  return (
    <div
      key={`Root-Container`}
      style={{
        height: `${viewHeight}`,
        width: `${viewWidth}`,
        overflow: "hidden",
        backgroundColor : 'transparent'
      
      }}
      ref={containerRef}
    ></div>
  );
};
