import React, { useCallback, useEffect } from "react";
import { GalleryShapeTypes, ThreeDGalleryParams } from "./types";
import { useThreeJs } from "visual/hooks/use-three-js/useThreeJs";
import { RootContainer } from "visual/components/root-container";
import { useThread } from "visual/hooks/use-thread";
import { useSetUpGallery } from "./useSetUpGallery";
import { useFormatToShape } from "./useFormatToShape";
import { useTransform } from "./useTranform";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min.js";
import { useTrackballControls } from "./TrackballControls/TrackballControls";

const cardItems = new Array(20)
  .fill("")
  .map((_, index) => ({ id: index, cardFace: <h1>Hello Im {index}</h1> }));
let tableType: GalleryShapeTypes = GalleryShapeTypes.SPHERE;

export const ThreeDGallery = ({ params }: { params: ThreeDGalleryParams }) => {
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

  useEffect(() => {
    return () => pause();
  }, [pause]);

  return <RootContainer containerRef={container} />;
};
