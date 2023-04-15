
import multiprocessing
from tf_bodypix.api import download_model, load_model, BodyPixModelPaths
import tensorflow as tf
import cv2
import numpy as np



def run_stream(model_config, isRunning, queue, num_clusters):
    bodypix_model = load_model(download_model(model_config))
    cap = cv2.VideoCapture('udp://127.0.0.1:1235', )
    torso = np.array([175, 240, 91])
    print('this is ran once')
    count = 0
    while cap.isOpened():
        ret,frame = cap.read()
      
        result = bodypix_model.predict_single(frame)
        mask = result.get_mask(threshold=0.5).numpy().astype(np.uint8)
        coloured_mask = result.get_colored_part_mask(mask=mask)
        selected_coordinates = np.array(list(zip(*np.where(np.all(coloured_mask==torso, axis=-1)))))
        detected = bool(selected_coordinates.size > 0)
        # process = multiprocessing.Process(target=run_stream, args=())
        # process = multiprocessing.Process(target=run_stream, args=())
        
        if detected == True:
            # pass in half of selected coordinates
        
            centroid = selected_coordinates.mean(axis=0)
            coords = centroid_to_scale(centroid, detected)
            queue.put(np.array([coords]))
            # get_clusters_birch(selected_coordinates)
            # clusters = get_clusters(selected_coordinates)
            # queue.put(clusters)
        count += 1
        if isRunning == False:
            break
    cap.release()


# def processSegmentOfFrame(frameData, queue):
#     print(frameData)

class BodySeg():
     
    def __init__(self):
        self.selected_model_config = BodyPixModelPaths.MOBILENET_FLOAT_50_STRIDE_16
        self.isRunning = False
        self.cluster_buffer_data = []
        self.window_size = 8
        self.queue = None
        self.num_clusters = 2
        self.processMain = None
        self.process1 = None
        self.process2 = None

    def run_algorithm(self):
        self.isRunning = True
        self.queue = multiprocessing.Queue()
        self.process = multiprocessing.Process(target=run_stream, args=(self.selected_model_config, self.isRunning, self.queue,self.num_clusters))
        self.process.start()
       
    def get_cluster_coords(self):
        return self.queue.get()
    
    def get_smoothed_cluster_coords(self):
        clusters = self.get_cluster_coords()
        cluster_buffer_data = self.cluster_buffer_data
        smoothed_cluster_centroids = []
        for i in range(len(clusters)):
            current_cluster_centroid = clusters[i]
            current_cluster_buffer_data = {
                'x' : [],
                'y' : [],
                'sum_x' : 0,
                'sum_y' : 0
            }
            if(i+1 <= len(cluster_buffer_data)):
                current_cluster_buffer_data = cluster_buffer_data[i]
            updated_cluster_buffer = update_cluster_buffer(current_cluster_centroid, current_cluster_buffer_data, self.window_size)
            if(i+1 <= len(cluster_buffer_data)):
                self.cluster_buffer_data[i] = updated_cluster_buffer
            else:
                self.cluster_buffer_data.append(updated_cluster_buffer)
            smoothed_cluster_centroids.append(get_movement_value(updated_cluster_buffer))
        return smoothed_cluster_centroids

   
        
        


PIXEL_SKIP = 1
WIDTH = 640
HEIGHT = 480

def centroid_to_scale(centroid, detected = True):
     if detected == False:
         return {'x': 2, 'y' : 2}
     return {'x': getPositionAsPercentage(WIDTH,centroid[1], True), 'y': getPositionAsPercentage(HEIGHT, centroid[0], True)}


def get_center(point_one, point_two):
    return (point_one + point_two) / 2

def getPositionAsPercentage(axis, value, detected):
    if(detected == False):
        return 2
    return round(1 - value / axis, 2)


def update_cluster_buffer(latest_point, cluster_buffer, window_size):
    x = latest_point['x']
    y = latest_point['y']
    if len( cluster_buffer['x']) == window_size:
        cluster_buffer['sum_x'] -= cluster_buffer['x'].pop(0)
    if len(cluster_buffer['y']) == window_size:
        cluster_buffer['sum_y'] -= cluster_buffer['y'].pop(0)
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

def get_clusters(frame_data):
    points = frame_data[::40, :]
    total_points = points.size
    num_clusters = 2
    if total_points > num_clusters * 2:
        spaced_elements = np.linspace(0, len(points)-1, num_clusters, dtype=int)
        centroids = points[spaced_elements]
        # loop until convergence
        while True:
            # calculate the distance from each point to each centroid
            distances = np.linalg.norm(points[:, np.newaxis, :] - centroids, axis=2)
            # assign each point to the nearest centroid
            labels = np.argmin(distances, axis=1)
            # calculate the new centroids
            new_centroids = np.array([np.mean(points[labels == i], axis=0) for i in range(num_clusters)])

            # check if the centroids have converged
            if np.allclose(new_centroids, centroids):
                break

            # update the centroids
            centroids = new_centroids 

        scaled_centroids = []
        for i in range(centroids.shape[0]):
            scaled_centroids.append(centroid_to_scale(centroids[i]))
        return scaled_centroids
    return []




 # def get_movement_trail(self):
    #     latest_point = self.get_coords()
    #     x = latest_point['x']
    #     y = latest_point['y']
    #     if len(self.x_buffer) == self.window_size:
    #         self.sum_x -= self.x_buffer.pop(0)
    #     if len(self.y_buffer) == self.window_size:
    #         self.sum_y -= self.y_buffer.pop(0)
    #     self.x_buffer.append(x)
    #     self.y_buffer.append(y)
    #     self.sum_x += x
    #     self.sum_y += y

    
def get_clusters_birch(frame_data):
    points = frame_data[::40, :]
    # Create the Birch object with desired parameters
    birch = Birch(n_clusters=3, threshold=5.0, branching_factor=200)

    # Fit the data to the Birch model
    birch.fit(points)

    # Get the centroid coordinates for each cluster
    centroid_coords = birch.subcluster_centers_ 
    print(centroid_coords)
    print(centroid_coords.size)