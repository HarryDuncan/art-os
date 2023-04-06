# System Imports
from concurrent import futures
import logging
import sys
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
        self.currentAlgorithim = None
        self.isRunning = False

    def InitializeInteractionNode(self, request, context):
        return pb2.InitializeInteractionNodeResponse(isInitialized=True)

    def InitalizeAlgorithim(self, request, context):
        print(request)
        return pb2.InitializeAlgorithimResponse(id=1,isInitialized=True)

    




































## GRPC CONNECTION: Connects visualInputNode to envoy proxy
def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    pb2_grpc.add_InteractionNodeServiceServicer_to_server(InteractionNode(), server)
    server.add_insecure_port('[::]:8080')
    server.start()
    server.wait_for_termination()


if __name__ == '__main__':
    logging.basicConfig()
    serve()
