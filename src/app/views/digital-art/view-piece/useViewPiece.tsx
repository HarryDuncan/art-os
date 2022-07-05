import React from "react";
import * as SceneParams from "../scene-parameters";
import * as VisualComponents from "visual/visual-components";
import { DigitalPiece } from "../context/Context";

export const useViewPiece = (
  digitalPieces: DigitalPiece[],
  index: number | null
) => {
  if (index === null) return { component: <></> };
  const { sceneId, title, componentId } = digitalPieces[index];

  const currentSceneParams = SceneParams[sceneId];
  const SceneComponent = VisualComponents[componentId] as React.ElementType;

  return {
    component: <SceneComponent params={currentSceneParams} />,
    title,
  };
};
