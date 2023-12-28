# System Imports
from concurrent import futures
import logging
import numpy as np

# GRPC
import grpc
import interactionNode_pb2 as pb2
import interactionNode_pb2_grpc as pb2_grpc



# ALGOS
import detection.posenet as Posenet

class InteractionNode(pb2_grpc.InteractionNodeServiceServicer):

    def __init__(self):
        self.currentAlgorithm = None
        self.isRunning = False

    def InitializeInteractionNode(self, request, context):
        self.isRunning = False
        if self.currentAlgorithm != None:
            self.currentAlgorithm.stop_running()
        return pb2.InitializeInteractionNodeResponse(is_initialized=True)

    def StopAlgorithm(self, request, context):
        self.isRunning = False
        if self.currentAlgorithm != None:
            print('stopping')
            self.currentAlgorithm.stop_running()
        return pb2.StopAlgorithmResponse()
    
    def InitalizeAlgorithm(self, request, context):
        initialized = False
        if self.isRunning == False:
            if(request.algorithm_type == "POSENET"):
                print('setting to posenet')
                self.currentAlgorithm = Posenet.Posenet()
                self.currentAlgorithm.set_config(request.algorithm_config)
                initialized = True
        else:
            initialized = True
        return pb2.InitializeAlgorithmResponse(id='1',is_initialized=initialized )

    def RunAlgorithm(self, request, context):
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
