
class DetectionAlgorithim():
   def __init__(self):
      self.isRunning = False
      self.cap = None
      self.queue = None
      self.process = None

      
   def stop_running(self):
         self.isRunning = False
         self.process.terminate()