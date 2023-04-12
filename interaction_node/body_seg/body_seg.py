
import multiprocessing
from tf_bodypix.api import download_model, load_model, BodyPixModelPaths
import tensorflow as tf
import cv2
from matplotlib import pyplot as plt
import numpy as np

def run_stream(model_config, isRunning, queue):
    
    bodypix_model = load_model(download_model(model_config))
    cap = cv2.VideoCapture('udp://127.0.0.1:1235', )
    left_face = np.array([110, 64, 170])
    while cap.isOpened():
        ret, frame = cap.read()
        result = bodypix_model.predict_single(frame)
        mask = result.get_mask(threshold=0.75).numpy().astype(np.uint8)
        coloured_mask = result.get_colored_part_mask(mask=mask)
        s = np.array(list(zip(*np.where(np.all(coloured_mask==left_face, axis=-1)))))
        detected = bool(s.size > 0)
        centroid = s.mean(axis=0)
        
        coords = centroid_to_scale(centroid, detected)
        queue.put(coords)
      
        # clusters = detect_clusters(coloured_mask)
        # print(clusters)
        # print('on process {}'.format(coords))
        if isRunning == False:
            break
    cap.release()


class BodySeg():
     
    def __init__(self):
        self.selected_model_config = BodyPixModelPaths.MOBILENET_FLOAT_50_STRIDE_16
        self.isRunning = False
        self.current_coords = {'x': -2, 'y': -2}
        self.x_buffer = []
        self.y_buffer = []
        self.sum_x = 0
        self.sum_y = 0
        self.window_size = 15
        self.queue = None
        self.process = None
        

    def run_algorithm(self):
        self.isRunning = True
        self.queue = multiprocessing.Queue()
        self.process = multiprocessing.Process(target=run_stream, args=(self.selected_model_config, self.isRunning, self.queue))
        self.process.start()
       


    def get_coords(self):
        return self.queue.get()
    
    def get_movement_trail(self):
        latest_point = self.get_coords()
        x = latest_point['x']
        y = latest_point['y']
        if len(self.x_buffer) == self.window_size:
            self.sum_x -= self.x_buffer.pop(0)
        if len(self.y_buffer) == self.window_size:
            self.sum_y -= self.y_buffer.pop(0)
        self.x_buffer.append(x)
        self.y_buffer.append(y)
        self.sum_x += x
        self.sum_y += y



    
    def get_movement_value(self):
        self.get_movement_trail()
        x = -2
        y = -2
        if len(self.x_buffer) > 0:
            x = self.sum_x / len(self.x_buffer)
        if len(self.y_buffer) > 0:
            y = self.sum_y / len(self.y_buffer)
        return {'x' : x, 'y' : y}
        
        


PIXEL_SKIP = 1
WIDTH = 640
HEIGHT = 480

def centroid_to_scale(centroid, detected):
     if detected == False:
         return {'x': 2, 'y' : 2}
     return {'x': getPositionAsPercentage(WIDTH,centroid[1], True), 'y': getPositionAsPercentage(HEIGHT, centroid[0], True)}


def get_center(point_one, point_two):
    return (point_one + point_two) / 2

def getPositionAsPercentage(axis, value, detected):
    if(detected == False):
        return 2
    return round(1 - value / axis, 2)


# def detect_clusters(frame):




    # def get_coords_from_seg(image):
    # if image is None:
    #     return
    
    # coor_obj = {
    #     'left': None,
    #     'right': None,
    #     'top': None,
    #     'bottom': None,
    # }
    # detected = False
 
    # for y in range(0,HEIGHT,20):
    #     for x in range(0,WIDTH, 16):
    #     # Get the pixel value at (x, y)
    #         b, g, r = image[y, x]
    #         if b == 110 and g == 64 and r == 170:
    #             detected = True
    #             coor_obj['left'] = min(x, coor_obj['left'] or x)
    #             coor_obj['right'] = max(x, coor_obj['right'] or x)
    #             coor_obj['top'] = min(y, coor_obj['top'] or y)
    #             coor_obj['bottom'] = max(y, coor_obj['bottom'] or y)
               
        

            
    # center_x = get_center(coor_obj['left'] or 0, coor_obj['right'] or 0) 
    # center_y = get_center(coor_obj['top'] or 0, coor_obj['bottom'] or 0)
    # return {'x': getPositionAsPercentage(WIDTH, center_x, detected), 'y': getPositionAsPercentage(HEIGHT, center_y, detected)}

    # # Convert frame to a NumPy array
    # arr_reduced = frame[::20, ::16]
    # img = np.array( arr_reduced )
    # color = ( 255,  94, 99)

    # # Create a mask for the color of interest
    # mask = np.all(img == color, axis=2)
    # # Initialize a list to store the coordinates of the clusters
    # cluster_coords = []
    # detected = False
    # # Loop over each pixel in the mask
    # for y in range(0, int(HEIGHT // 20)):
    #     for x in range(0, int(WIDTH // 16)):       
    #         # Check if the pixel is part of a cluster
    #         if mask[y, x]:
    #             # Initialize variables to track the boundaries of the cluster
    #             top, bottom, left, right = y, y, x, x

    #             # Expand the boundaries of the cluster in all directions
    #             while top >= 0 and np.any(mask[top, :]):
    #                 top -= 1
    #             while bottom < HEIGHT // 20 and np.any(mask[bottom, :]):
    #                 bottom += 1
    #             while left >= 0 and np.any(mask[:, left]):
    #                 left -= 1
    #             while right < WIDTH  // 16 and np.any(mask[:, right]):
    #                 right += 1

    #             # Calculate the central coordinates of the cluster
    #             center_x = (left + right) // 2
    #             center_y = (top + bottom) // 2
    #             detected = True
    #             x_coord  = getPositionAsPercentage(WIDTH // 16, center_x, detected), 
    #             y_coord = getPositionAsPercentage(HEIGHT // 20, center_y, detected)
    #             # Add the coordinates to the list of clusters
    #             cluster_coords.append({"x" : x_coord, "y" : y_coord})

    #             # Set the mask for the cluster to zero to prevent double counting
    #             mask[top:bottom, left:right] = 0

    # return cluster_coords