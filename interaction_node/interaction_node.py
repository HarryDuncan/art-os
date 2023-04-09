# System Imports
from concurrent import futures
import logging
import multiprocessing
import sys
import time
import numpy as np

# GRPC
import grpc
import interactionNode_pb2 as pb2
import interactionNode_pb2_grpc as pb2_grpc



# ALGOS
import body_seg.body_seg as BodySeg

class InteractionNode(pb2_grpc.InteractionNodeServiceServicer):

    def __init__(self):
        print('initialized')
        self.currentAlgorithm = None
        self.isRunning = False

    def InitializeInteractionNode(self, request, context):
        return pb2.InitializeInteractionNodeResponse(isInitialized=True)

    def InitalizeAlgorithm(self, request, context):
        initialized = False
        if self.isRunning == False:
            if(request.algorithm_type == "BODY_PIX"):
                self.currentAlgorithm = BodySeg.BodySeg()
                initialized = True
        else:
            initialized = True
        return pb2.InitializeAlgorithmResponse(id='1',isInitialized=initialized )

    def RunAlgorithm(self, request, context):
        if(self.currentAlgorithm != None):
            if(self.isRunning == False):
                self.currentAlgorithm.run_algorithm()
                self.isRunning = True
            while self.isRunning == True:
                coords = self.currentAlgorithm.get_coords()
                if(coords == None):
                    coords = {'x' : 0, 'y' : 0}
                response = pb2.RunAlgorithmResponse(point=coords)
                yield response
        else:
            return pb2.RunAlgorithmResponse(point={'x' : 0, 'y' : 0},errorMessage='error' )

        
    




































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
