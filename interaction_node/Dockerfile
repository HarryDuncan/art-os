# syntax=docker/dockerfile:1
FROM nvidia/cuda:11.8.0-cudnn8-devel-ubuntu20.04 as base
WORKDIR /interaction_node

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

WORKDIR /interaction_node
RUN pip install --upgrade pip setuptools
# Copy requirements folder to image
COPY requirements /requirements

# Install requirements
RUN pip install -r /requirements/grpc-requirements.txt
RUN pip install -r /requirements/ai-requirements.txt
RUN pip install --extra-index-url https://pypi.nvidia.com tensorrt-bindings==8.6.1 tensorrt-libs==8.6.1
RUN pip install -U tensorflow[and-cuda]
RUN pip install tensorrt
COPY . .
WORKDIR /interaction_node
# Because we have to use an old version of protobuf - it doesn't have builder py
# so we need to copy it into the site packages for protobuf to work for grpc and tensorflow
COPY /detection/builder.py ../../usr/local/lib/python3.8/dist-packages/google/protobuf/internal/

ENV PATH="/usr/local/nvidia/bin:${PATH}"
ENV LD_LIBRARY_PATH="/usr/local/nvidia/lib:${LD_LIBRARY_PATH}"


RUN chmod +x interaction_node.py
ENV CUDA_VISIBLE_DEVICES=0
ENV APP_HOME=$APP_HOME
WORKDIR /interaction_node

CMD ["python3", "-u", "interaction_node.py"]
