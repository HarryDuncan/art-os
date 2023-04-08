
from tf_bodypix.api import download_model, load_model, BodyPixModelPaths
import tensorflow as tf
import cv2
from matplotlib import pyplot as plt
import numpy as np

class BodySeg():
     
    def __init__(self):
        self.selected_model_config = BodyPixModelPaths.MOBILENET_FLOAT_50_STRIDE_16
        self.isRunning = False

    def run_algorithm(self):
         self.isRunning = True
         bodypix_model = load_model(download_model(self.selected_model_config))
         cap = cv2.VideoCapture('udp://127.0.0.1:1235')
         while cap.isOpened():
             ret, frame = cap.read()
             result = bodypix_model.predict_single(frame)
             mask = result.get_mask(threshold=0.5).numpy().astype(np.uint8)
             colored_mask = result.get_colored_part_mask(mask)
             masked_image = cv2.bitwise_and(frame, frame, mask=mask)
             
             coords = get_coords_from_seg(masked_image)
             print(coords)
             if self.isRunning == False:
                 break
         cap.release()
         cap.destroyAllWindows()

def run():
    bodypix_model = load_model(download_model( BodyPixModelPaths.MOBILENET_FLOAT_50_STRIDE_16))
    cap = cv2.VideoCapture(0)
    while cap.isOpened():
        ret, frame = cap.read()
        result = bodypix_model.predict_single(frame)
        mask = result.get_mask(threshold=0.5).numpy().astype(np.uint8)
        masked_image = cv2.bitwise_and(frame, frame, mask=mask)
        cv2.imshow('BodyPix', masked_image )
          
        coords = get_coords_from_seg(masked_image)
        if cv2.waitKey(10) & 0xFF == ord('q'):
            break

    cv2.release()
    cv2.destroyAllWindows()

PIXEL_SKIP = 1
WIDTH = 640

def get_coords_from_seg(image):
    if image is None:
        return
    
    coor_obj = {
        'left': None,
        'right': None,
        'top': None,
        'bottom': None,
    }
    
    data = image[..., 2] # Extract alpha channel
    for i in range(2, data.size, 4 * PIXEL_SKIP + WIDTH * 8):
        
        if data.flat[i] != 0:
            
            x = (i // 4) % WIDTH
            y = i // 4 // WIDTH
            coor_obj['left'] = min(x, coor_obj['left'] or x)
            coor_obj['right'] = max(x, coor_obj['right'] or x)
            coor_obj['top'] = min(y, coor_obj['top'] or y)
            coor_obj['bottom'] = max(y, coor_obj['bottom'] or y)
            
    center_x = get_center(coor_obj['left'] or 0, coor_obj['right'] or 0)
    center_y = get_center(coor_obj['top'] or 0, coor_obj['bottom'] or 0)
    return {'x': center_x, 'y': center_y}
    
def get_center(point_one, point_two):
    return (point_one + point_two) / 2

