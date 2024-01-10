# System Imports
from concurrent import futures
import logging
import numpy as np

# GRPC
import grpc

class ScreenRecorder(pb2_grpc.ScreenRecorder):

    def __init__(self):
        self.isRunning = False

    def InitializeScreenRecorder(self, request, context):
        self.isRunning = False
        return pb2.InitializeScreenRecorderResponse(is_initialized=True)

    def RunRecorder(self, request, context):
            print(self.currentAlgorithm)
            if(self.currentAlgorithm != None):
                if(self.isRunning == False):
                    self.currentAlgorithm.run_algorithm()
                    self.isRunning = True
                while self.isRunning == True:
                    coords = self.currentAlgorithm.get_smoothed_cluster_coords()
                    response = pb2.RunAlgorithmResponse(points=coords)
                    yield response
            else:
                return pb2.RunAlgorithmResponse(points=[],error_message='error' )

    def StopRecorder(self, request, context):
        self.isRunning = False
        if self.currentAlgorithm != None:
            print('stopping')
            self.currentAlgorithm.stop_running()
        return pb2.StopAlgorithmResponse()
    
  
        
    




































## GRPC CONNECTION: Connects visualInputNode to envoy proxy
def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    pb2_grpc.add_InteractionNodeServiceServicer_to_server(InteractionNode(), server)
    server.add_insecure_port('[::]:1995')
    server.start()
    server.wait_for_termination()


if __name__ == '__main__':
    logging.basicConfig()
    serve()
