import tensorflow as tf
from tf_bodypix.api import download_model, load_model, BodyPixModelPaths
import cv2
from matplotlib import pyplot as plt
import numpy as np

class BodySeg():
     
    def __init__(self):
        self.selected_model_config = BodyPixModelPaths.MOBILENET_FLOAT_50_STRIDE_16

    def run_algorithim(self):
        bodypix_model = load_model(download_model(self.selected_model_config))
        cap = cv2.VideoCapture(0)
        while cap.isOpened():
            ret, frame = cap.read()
            result = bodypix_model.predict_single(frame)
            mask = result.get_mask(threshold=0.5).numpy().astype(np.uint8)
            masked_image = cv2.bitwise_and(frame, frame, mask=mask)
            cv2.imshow('BodyPix', masked_image )
            if cv2.waitKey(10) & 0xFF == ord('q'):
                break

        cv2.release()
        cv2.destroyAllWindows()

