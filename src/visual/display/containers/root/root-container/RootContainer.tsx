import React from "react";
import { Layers } from "../../../components/layers/Layers";
import { Root } from "./RootContainer.styles";
import { VideoBackground } from "../video-background/VideoBackground";
import { Layer } from "visual/display/components/layers/types";
import { SceneProperties } from "visual/display/components/interactive-scene";

interface IRootContainerProps {
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
  sceneProperties: SceneProperties;
  visualData?;
  layers?: Layer[];
}
// Scene manager for displaying multiple scenes in a particular setting
export const RootContainer = ({
  containerRef,
  sceneProperties,
  visualData = {},
  layers = [],
}: IRootContainerProps) => {
  const { video } = visualData;
  return (
    <>
      <Layers layers={layers} />
      <Root
        $height={sceneProperties.viewHeight}
        $width={sceneProperties.viewWidth}
        ref={containerRef}
        $backgroundColor={sceneProperties.backgroundColor}
      />
      <VideoBackground videoSrc={video?.src} />
    </>
  );
};
