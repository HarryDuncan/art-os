# System Imports
from concurrent import futures
import logging
# GRPC
import grpc
import sceneCapture_pb2 as pb2
import sceneCapture_pb2_grpc as pb2_grpc


class SceneCapture(pb2_grpc.SceneCapture):

    def __init__(self):
        self.isRunning = False

    def InitializeSceneCapture(self, request, context):
        self.isRunning = False
        return pb2.InitializeSceneCaptureResponse(is_initialized=True)

    def RunCapture(self, request, context):
        return pb2.RunCaptureResponse()

    def StopCapture(self, request, context):
        self.isRunning = False
        return pb2.StopCaptureResponse()
    
  
## GRPC CONNECTION: Connects visualInputNode to envoy proxy
def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    pb2_grpc.add_SceneCaptureServiceServicer_to_server(SceneCapture(), server)
    server.add_insecure_port('[::]:1996')
    server.start()
    server.wait_for_termination()


if __name__ == '__main__':
    logging.basicConfig()
    serve()
        
    




































