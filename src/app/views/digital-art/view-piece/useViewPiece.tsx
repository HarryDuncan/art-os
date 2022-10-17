import React from "react";
import * as VisualComponents from "visual/visual-components";
import { useGalleryScenes } from "scenes/gallery-scenes/useGalleryScenes";
import { DigitalPiece } from "../context/Context";

export const useViewPiece = (
  digitalPieces: DigitalPiece[],
  index: number | null
) => {
  if (index === null) return { component: null };
  const { sceneId, title, componentId } = digitalPieces[index];
  const getGalleryScene = useGalleryScenes();
  const currentSceneParams = getGalleryScene(sceneId);
  const SceneComponent = VisualComponents[componentId] as React.ElementType;

  return {
    component: <SceneComponent params={currentSceneParams} />,
    title,
  };
};
