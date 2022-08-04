import React from "react";
import * as VisualComponents from "visual/visual-components";
import * as SceneParams from "../scene-parameters";
import { DigitalPiece } from "../context/Context";

export const useViewPiece = (
  digitalPieces: DigitalPiece[],
  index: number | null
) => {
  if (index === null) return { component: null };
  const { sceneId, title, componentId } = digitalPieces[index];

  const currentSceneParams = SceneParams[sceneId];
  const SceneComponent = VisualComponents[componentId] as React.ElementType;

  return {
    component: <SceneComponent params={currentSceneParams} />,
    title,
  };
};
