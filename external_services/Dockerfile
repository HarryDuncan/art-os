# syntax=docker/dockerfile:1
FROM nvidia/cuda:11.8.0-cudnn8-devel-ubuntu20.04 as base
WORKDIR /scene_capture

RUN apt-get update && apt-get upgrade -y
RUN export DEBIAN_FRONTEND=noninteractive


# Set up python
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        python3 \
        python3-pip \
        procps \
        lsof \
        numactl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /scene_capture
RUN pip install --upgrade pip setuptools
# Copy requirements folder to image
COPY ../requirements /requirements

# Install requirements
RUN pip install -r /requirements/grpc-requirements.txt

RUN chmod +x scene_capture.py
ENV APP_HOME=$APP_HOME
WORKDIR /scene_capture

CMD ["python3", "-u", "scene_capture.py"]
