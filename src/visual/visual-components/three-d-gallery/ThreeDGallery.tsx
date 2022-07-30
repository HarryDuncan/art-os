import React, { useCallback, useEffect } from "react";
import { useThreeJs } from "visual/hooks/use-three-js/useThreeJs";
import { RootContainer } from "visual/components/root-container";
import { useThread } from "visual/hooks/use-thread";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min.js";
import { GalleryShapeTypes, ThreeDGalleryParams } from "./types";
import { useSetUpGallery } from "./useSetUpGallery";
import { useFormatToShape } from "./useFormatToShape";
import { useTransform } from "./useTranform";
import { useTrackballControls } from "./TrackballControls/TrackballControls";

const cardItems = new Array(20).fill("").map((_, index) => ({
  id: index,
  cardFace: (
    <h1>
      Hello Im
      {index}
    </h1>
  ),
}));
const tableType: GalleryShapeTypes = GalleryShapeTypes.SPHERE;

export function ThreeDGallery({ params }: { params: ThreeDGalleryParams }) {
  const { threeJsParams } = params;
  const { container, scene, camera, currentFrameRef, cssRenderer } = useThreeJs(
    threeJsParams
  );

  const { update, pause } = useThread(
    cssRenderer,
    currentFrameRef,
    scene,
    camera
  );
  const controls = useTrackballControls(camera, cssRenderer, update);
  const animate = useCallback(() => {
    currentFrameRef.current = requestAnimationFrame(animate);
    TWEEN.update();
    if (controls) {
      controls.update();
    }
  }, [currentFrameRef, controls]);

  const { galleryItems, galleryObjects } = useSetUpGallery(cardItems, scene);
  const targets = useFormatToShape(tableType, galleryItems);
  const transformItems = useTransform(container, update);

  const initializeGallery = useCallback(() => {
    if (targets.length && galleryObjects) {
      transformItems(targets, galleryObjects);
      animate();
    }
  }, [targets, galleryObjects, transformItems, animate]);

  useEffect(() => {
    initializeGallery();
  }, [initializeGallery]);

  useEffect(() => () => pause(), [pause]);

  return <RootContainer containerRef={container} />;
}
