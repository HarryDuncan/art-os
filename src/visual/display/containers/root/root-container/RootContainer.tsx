import React from "react";
import { useAppSelector } from "app/redux/store";
// import { VisualComponentConfig } from "app/redux/visual/types";
import { Layers } from "../../../components/layers/Layers";
import { Root } from "./RootContainer.styles";
import { VideoBackground } from "../video-background/VideoBackground";

interface IRootContainerProps {
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
  //  config?: Partial<VisualComponentConfig>;
}
// Scene manager for displaying multiple scenes in a particular setting
export const RootContainer = ({ containerRef }: IRootContainerProps) => {
  const { visualComponentConfig, visualData } = useAppSelector(
    (state) => state.visual
  );

  // todo - set component config from app selector
  const componentConfig = { ...visualComponentConfig };
  const { viewHeight, viewWidth, backgroundColor } = componentConfig;
  const { video } = visualData;

  return (
    <>
      <Layers />
      <Root
        $height={viewHeight}
        $width={viewWidth}
        ref={containerRef}
        $backgroundColor={backgroundColor}
      />
      <VideoBackground videoSrc={video?.src} />
    </>
  );
};
