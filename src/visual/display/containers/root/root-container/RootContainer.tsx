import React from "react";
import { Layers } from "../../../components/layers/Layers";
import { Root } from "./RootContainer.styles";
import { VideoBackground } from "../video-background/VideoBackground";
import { RootContainerConfig } from "../../containers.types";
import { Layer } from "visual/display/components/layers/types";

const DEFAULT_COMPONENT_CONFIG = {
  viewWidth: "100vw",
  viewHeight: "100vh",
  backgroundColor: "white",
  backgroundUrl: "",
};
interface IRootContainerProps {
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
  visualComponentConfig?: Partial<RootContainerConfig>;
  visualData?;
  layers?: Layer[];
}
// Scene manager for displaying multiple scenes in a particular setting
export const RootContainer = ({
  containerRef,
  visualComponentConfig,
  visualData = {},
  layers = [],
}: IRootContainerProps) => {
  // todo - set component config from app selector
  const componentConfig = {
    ...DEFAULT_COMPONENT_CONFIG,
    visualComponentConfig,
  };
  const { video } = visualData;

  return (
    <>
      <Layers layers={layers} />
      <Root
        $height={componentConfig.viewHeight}
        $width={componentConfig.viewWidth}
        ref={containerRef}
        $backgroundColor={componentConfig.backgroundColor}
      />
      <VideoBackground videoSrc={video?.src} />
    </>
  );
};
