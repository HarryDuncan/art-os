
import multiprocessing
from tf_bodypix.api import download_model, load_model, BodyPixModelPaths
import tensorflow as tf
import cv2
from matplotlib import pyplot as plt
import numpy as np

def run_stream(model_config, isRunning, queue):
    
    bodypix_model = load_model(download_model(model_config))
    cap = cv2.VideoCapture('udp://127.0.0.1:1235', )
    # width = cap.get(3)
    # height = cap.get(4)
    while cap.isOpened():
        ret, frame = cap.read()
        result = bodypix_model.predict_single(frame)
        mask = result.get_mask(threshold=0.5).numpy().astype(np.uint8)
        masked_image = cv2.bitwise_and(frame, frame, mask=mask)
        coords = get_coords_from_seg(masked_image)
        queue.put(coords)
        # print('on process {}'.format(coords))
        if isRunning == False:
            break
    cap.release()


class BodySeg():
     
    def __init__(self):
        self.selected_model_config = BodyPixModelPaths.MOBILENET_FLOAT_50_STRIDE_16
        self.isRunning = False
        self.current_coords = {'x': 0, 'y': 0}
        self.queue = None
        self.process = None

    def run_algorithm(self):
        self.isRunning = True
        self.queue = multiprocessing.Queue()
        self.process = multiprocessing.Process(target=run_stream, args=(self.selected_model_config, self.isRunning, self.queue))
        self.process.start()
       


    def get_coords(self):
        return self.queue.get()
# def run():
#     bodypix_model = load_model(download_model( BodyPixModelPaths.MOBILENET_FLOAT_50_STRIDE_16))
#     cap = cv2.VideoCapture(0)
#     cv2.
#     while cap.isOpened():
#         ret, frame = cap.read()
#         result = bodypix_model.predict_single(frame)
#         mask = result.get_mask(threshold=0.5).numpy().astype(np.uint8)
#         masked_image = cv2.bitwise_and(frame, frame, mask=mask)
#         cv2.imshow('BodyPix', masked_image )
          
#         coords = get_coords_from_seg(masked_image)
#         if cv2.waitKey(10) & 0xFF == ord('q'):
#             break

#     cv2.release()
#     cv2.destroyAllWindows()

PIXEL_SKIP = 1
WIDTH = 640
HEIGHT = 480
def get_coords_from_seg(image):
    if image is None:
        return
    
    coor_obj = {
        'left': None,
        'right': None,
        'top': None,
        'bottom': None,
    }
    data = image
    for y in range(0,HEIGHT,20):
        for x in range(0,WIDTH, 16):
        # Get the pixel value at (x, y)
            b, g, r = image[y, x]
            if b != 0 or g != 0 or r != 0:
                coor_obj['left'] = min(x, coor_obj['left'] or x)
                coor_obj['right'] = max(x, coor_obj['right'] or x)
                coor_obj['top'] = min(y, coor_obj['top'] or y)
                coor_obj['bottom'] = max(y, coor_obj['bottom'] or y)
              
    # for i in range(0, data.size, 4 * PIXEL_SKIP ):
    #     print(image[i])
    #     if data.flat[i] != 0:
            
    #         x = (i // 4) % WIDTH
    #         y = i // 4 // WIDTH

            
    center_x = get_center(coor_obj['left'] or 0, coor_obj['right'] or 0)
    center_y = get_center(coor_obj['top'] or 0, coor_obj['bottom'] or 0)
    return {'x': center_x, 'y': center_y}
    
def get_center(point_one, point_two):
    return (point_one + point_two) / 2

