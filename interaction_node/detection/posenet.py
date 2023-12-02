
import multiprocessing
import tensorflow_hub as hub;
import tensorflow as tf
import cv2
import numpy as np

from detection.detection_algorithm import DetectionAlgorithim


PIXEL_SKIP = 1
WIDTH = 640
HEIGHT = 480
#  [nose, left eye, right eye, left ear, right ear, left shoulder, right shoulder, left elbow, right elbow, left wrist,
#  right wrist, left hip, right hip, left knee, right knee, left ankle, right ankle]
def get_keypoints(frame, keypoints, confidence_threshold):
    y, x, c = frame.shape
    shaped = np.squeeze(np.multiply(keypoints, [y,x,1]))
    right_wrist = shaped[9]
    ky, kx, kp_conf = right_wrist
    if(kp_conf > confidence_threshold):
        coords = convert_to_scale(kx, ky)
        return coords
    else:
        return None
   
def convert_to_scale(x, y):
    return ({'x' :  round(abs((x / 640)  - 1), 2) , 'y' : round(abs((y / 480)  -1), 2)})

def loop_through_people(frame, keypoints_with_scores,confidence_threshold):
    points = []
    for person in keypoints_with_scores:
        key_points_for_person = get_keypoints(frame, person, confidence_threshold)
        if(key_points_for_person != None):
            points.append(key_points_for_person)
    return points

def group_data(points):
    grouped_data = {}
    for d in points:
        key = None
        for k in grouped_data.keys():
            if abs(k[0] - d['x']) <= 0.02 and abs(k[1] - d['y']) <= 0.02:
                key = k
                break
        if key:
            grouped_data[key].append(d)
        else:
            grouped_data[(d['x'], d['y'])] = [d]
    result = list(grouped_data.values())
    return result

def run_stream(isRunning, queue):
    model = hub.load('https://tfhub.dev/google/movenet/multipose/lightning/1')
    movenet = model.signatures['serving_default']
    cap = cv2.VideoCapture('udp://127.0.0.1:1235', )
    fps = round(cap.get(cv2.CAP_PROP_FPS))
    hop = round(fps / 1)
    curr_frame = 0
    while cap.isOpened():
        ret,frame = cap.read()
        if curr_frame % hop == 0:
            img = tf.image.resize_with_pad(tf.expand_dims(frame, axis=0), 192,256)
            input_image = tf.cast(img, dtype=tf.int32)
            results = movenet(input_image)
            keypoints_with_scores = results['output_0'].numpy()[:,:,:51].reshape((6,17,3))
            selected_points = loop_through_people(frame, keypoints_with_scores, 0.1)
            queue.put(selected_points)
        curr_frame += 1
        if isRunning == False:
            break
    cap.release()



class Posenet(DetectionAlgorithim): 
    def __init__(self):
        super().__init__()
        self.cluster_buffer_data = []
        self.window_size = 3
        self.queue = None
        self.process = None

    def run_algorithm(self):
        self.isRunning = True
        self.queue = multiprocessing.Queue()
        self.process = multiprocessing.Process(target=run_stream, args=(self.isRunning, self.queue,))
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


