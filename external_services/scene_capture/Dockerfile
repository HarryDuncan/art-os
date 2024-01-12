# Use an official Python runtime as a parent image
FROM python:3.9

# Set the working directory in the container
WORKDIR /scene_capture

# Copy the current directory contents into the container at /app
COPY . /scene_capture

# Copy requirements folder to image
COPY ../requirements /requirements
RUN pip install -r /requirements/grpc-requirements.txt
# Install any needed packages specified in requirements.txt
RUN pip install pygetwindow pyautogui imageio



# Define environment variable
ENV NAME World

# Run screen recording script when the container launches
CMD ["python", "scene_capture.py"]

