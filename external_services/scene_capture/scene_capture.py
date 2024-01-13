# System Imports
from concurrent import futures
import logging
# GRPC
import grpc
from screen_recorder import ScreenRecorder
import sceneCapture_pb2 as pb2
import sceneCapture_pb2_grpc as pb2_grpc
from pyvirtualdisplay import Display

class SceneCapture(pb2_grpc.SceneCaptureServiceServicer):

    def __init__(self):
        self.isRunning = False
        with Display(backend='xvfb', size=(1920, 1080)):  
            self.screenRecorder = ScreenRecorder()

    def InitializeSceneCapture(self, request, context):
        self.isRunning = False
        return pb2.InitializeSceneCaptureResponse(is_initialized=True)

    def RunCapture(self, request, context):
        self.screenRecorder.set_output_name( request.capture_name)
        self.screenRecorder.start()
        return pb2.RunCaptureResponse()

    def StopCapture(self, request, context):
        self.isRunning = False
        self.screenRecorder.stop()
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
        
    




































