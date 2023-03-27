// @ts-nocheck
import Webcam from "react-webcam";
import { BodySegInteractionKeys } from "../types";
import * as bodySeg from "@tensorflow-models/body-segmentation";
import { getCoordsFromSeg } from "./getCoordsFromSeg";
import { MODEL_READ_INTERVAL } from "../const";
import { ev } from "visual/hooks/use-events/useEventsWithMeshes";

const foregroundThreshold = 0.5;
export const BODY_PIX_CONFIG = {
  architecture: "MobileNetV1",
  outputStride: 16,
  multiplier: 0.75,
  quantBytes: 4,
  visualization: "binaryMask",
};
let canvas = null;

export const runBodySeg = (
  webcamRef: React.MutableRefObject<Webcam | null>
) => {
  const runBodySegModel = async () => {
    canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);
    const runtime = bodySeg.SupportedModels.BodyPix;

    const segmenter = await bodySeg.createSegmenter(
      runtime,
      BODY_PIX_CONFIG as bodySeg.BodyPixModelConfig
    );

    setInterval(() => {
      readSegement(segmenter);
    }, MODEL_READ_INTERVAL);
  };

  const readSegement = async (segmenter) => {
    const { current: webcam } = webcamRef;

    if (
      webcam !== null &&
      webcam.video !== null &&
      webcam.video.readyState === 4
    ) {
      // Get Video Properties
      const { video } = webcam;
      const { videoWidth } = webcam.video;
      const { videoHeight } = webcam.video;

      // Set video width
      webcam.video.width = videoWidth;
      webcam.video.height = videoHeight;

      const segmentation = await segmenter.segmentPeople(video, {
        flipHorizontal: false,
        multiSegmentation: true,
        segmentBodyParts: true,
        segmentationThreshold: foregroundThreshold,
      });
      const coloredPartImage = await bodySeg.toBinaryMask(segmentation);
      // const opacity = 0.7;
      // const flipHorizontal = false;
      // const maskBlurAmount = 0;

      // // // Draw the colored part image on top of the original image onto a canvas.
      // // // The colored part image will be drawn semi-transparent, with an opacity of
      // // // 0.7, allowing for the original image to be visible under.
      // // bodySeg.drawMask(
      // //   canvas,
      // //   video,
      // //   coloredPartImage,
      // //   opacity,
      // //   maskBlurAmount,
      // //   flipHorizontal
      // // );
      const coords = getCoordsFromSeg(coloredPartImage);

      ev(`:${BodySegInteractionKeys.PersonPosition}`, [coords, coords, coords]);
    }
  };

  runBodySegModel();
};
