
import multiprocessing
import tensorflow_hub as hub;
import tensorflow as tf
import numpy as np
import cv2

from detection.detection_algorithm import DetectionAlgorithim


PIXEL_SKIP = 1
WIDTH = 640
HEIGHT = 480
#  [nose, left eye, right eye, left ear, right ear, left shoulder, right shoulder, left elbow, right elbow, left wrist,
#  right wrist, left hip, right hip, left knee, right knee, left ankle, right ankle]
def get_keypoints(frame, keypoints, algorithm_config):
    y, x, c = frame.shape
    shaped = np.squeeze(np.multiply(keypoints, [y,x,1]))
    threshold = algorithm_config.threshold
    keypoint = algorithm_config.key_points[0]
    selected_keypoint = shaped[keypoint]
    ky, kx, kp_conf = selected_keypoint
    if(kp_conf > threshold):
        coords = convert_to_scale(kx, ky)
        return coords
    else:
        return None
   
def convert_to_scale(x, y):
    return ({'x' :  round(abs((x / WIDTH)  - 1), 2) , 'y' : round(abs((y / HEIGHT)  -1), 2)})

def loop_through_people(frame, keypoints_with_scores,algorithm_config):
    points = []
    for person in keypoints_with_scores:
        key_points_for_person = get_keypoints(frame, person,algorithm_config)
        if(key_points_for_person != None):
            points.append(key_points_for_person)
    return points



def run_stream( queue, algorithm_config):
    model = hub.load('https://tfhub.dev/google/movenet/multipose/lightning/1')
    movenet = model.signatures['serving_default']
    cap = cv2.VideoCapture('udp://127.0.0.1:1235', )
    while cap.isOpened():
        ret,frame = cap.read()
        img = tf.image.resize_with_pad(tf.expand_dims(frame, axis=0), 256,256)
        input_image = tf.cast(img, dtype=tf.int32)
        results = movenet(input_image)
        keypoints_with_scores = results['output_0'].numpy()[:,:,:51].reshape((6,17,3))
        selected_points = loop_through_people(frame, keypoints_with_scores, algorithm_config)
        queue.put(selected_points)
    cap.release()



class Posenet(DetectionAlgorithim): 
    def __init__(self):
        super().__init__()
        self.cluster_buffer_data = []
        self.window_size = 3
      
    def set_config(self, algorithm_config):
        self.algorithm_config = algorithm_config
    
    def run_algorithm(self):
        self.isRunning = True
        self.queue = multiprocessing.Queue()
        print(self.algorithm_config)
        self.process = multiprocessing.Process(target=run_stream, args=(self.queue,self.algorithm_config,))
        self.process.start()
       
    def get_cluster_coords(self):
        return self.queue.get()
    
    def get_smoothed_cluster_coords(self):
        clusters = self.get_cluster_coords()
        return clusters

   
        
        



def update_cluster_buffer(latest_point, cluster_buffer, window_size):
    if len( cluster_buffer['x']) == window_size or (latest_point == None and len( cluster_buffer['x']) > 0):
        cluster_buffer['sum_x'] -= cluster_buffer['x'].pop(0)
    if len(cluster_buffer['y']) == window_size or (latest_point == None and len( cluster_buffer['y']) > 0):
        cluster_buffer['sum_y'] -= cluster_buffer['y'].pop(0)
        
    if latest_point != None:
        x = latest_point['x']
        y = latest_point['y']
        cluster_buffer['x'].append(x)
        cluster_buffer['y'].append(y)
        cluster_buffer['sum_x'] += x
        cluster_buffer['sum_y'] += y
    
    return cluster_buffer

def get_movement_value(cluster_data):
        x = -2
        y = -2
        if len(cluster_data['x']) > 0:
            x =  cluster_data['sum_x'] / len(cluster_data['x'])
        if len( cluster_data['y']) > 0:
            y = cluster_data['sum_y'] / len( cluster_data['y'])
        return {'x' : x, 'y' : y}


