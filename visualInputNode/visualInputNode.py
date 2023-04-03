# System Imports
from concurrent import futures
import logging

import sys

import numpy as np

# GRPC
import grpc
import visualInputNode_pb2
import visualInputNode_pb2_grpc


class VisualInputNode(visualInputNode_pb2_grpc.VisualInputNodeServiceServicer):

    def __init__(self):
        print('initialized')

    def InitializeVisualInputNode(self, request, context):
        return visualInputNode_pb2.InitializeVisualInputNodeResponse(isInitialized=True)

 

    


## GRPC CONNECTION: Connects visualInputNode to envoy proxy
def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    visualInputNode_pb2_grpc.add_VisualInputNodeServiceServicer_to_server(VisualInputNode(), server)
    server.add_insecure_port('[::]:8080')
    server.start()
    server.wait_for_termination()


if __name__ == '__main__':
    logging.basicConfig()
    serve()
