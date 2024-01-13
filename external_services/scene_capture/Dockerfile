# Use an official Python runtime as a parent image
FROM python:3.9

# Change the mirror for apt
RUN apt-get update && \
    apt-get install -y \
    libx11-dev \
    libxext-dev \
    libxrender-dev \
    libxtst-dev \
    libxtst6 \
    libxi6 \
    ffmpeg \
    x11-apps



# Set the working directory in the container
WORKDIR /scene_capture

# Copy the current directory contents into the container at /app
COPY . /scene_capture
# Copy requirements folder to image
COPY requirements /requirements
RUN pip install -r /requirements/grpc-requirements.txt
RUN pip install -r /requirements/sr-requirements.txt

# Run screen recording script when the container launches
CMD ["python", "scene_capture.py"]