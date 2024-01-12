import pygetwindow as gw
import pyautogui
import imageio
import time
import os

class ScreenRecorder:
    def __init__(self, output_folder, fps=30):
        self.output_folder = output_folder
        self.fps = fps
        self.writer = None

    def start(self):
        # Get the screen dimensions
        screen = gw.getWindowsWithTitle("")[0]  # Assumes the first window is the screen
        screen_width, screen_height = screen.width, screen.height

        # Set the region to record (in this case, the entire screen)
        region = (0, 0, screen_width, screen_height)

        # Set the output file name with timestamp
        timestamp = time.strftime("%Y%m%d_%H%M%S")
        output_file = f"screen_record_{timestamp}.mp4"

        # Create a writer object for lossless video
        self.writer = imageio.get_writer(os.path.join(self.output_folder, output_file), fps=self.fps)

        try:
            while True:
                # Capture the current screen image
                screenshot = pyautogui.screenshot(region=region)

                # Convert the PIL image to numpy array
                frame = imageio.core.util.Image(screenshot)

                # Append the frame to the video
                self.writer.append_data(frame)

                # Sleep for a short duration to control the recording speed
                time.sleep(1 / self.fps)
        except KeyboardInterrupt:
            pass

    def stop(self):
        # Close the writer
        if self.writer:
            self.writer.close()