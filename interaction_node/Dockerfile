# syntax=docker/dockerfile:1

FROM python:3.10.5
ENV APP_HOME /interaction_node
WORKDIR $APP_HOME



RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    cmake \
    gcc g++ \
    libopencv-dev \
    python3-opencv \
    libavcodec-dev \
    libswscale-dev \
    libavformat-dev \
    libgstreamer-plugins-base1.0-dev \
    libgstreamer1.0-dev \
    libpng-dev \
    libopencv-dev \
    libjpeg-dev \
    libopenexr-dev \
    libtiff-dev \
    libwebp-dev \
    wget \
    qtbase5-dev \
    libgtk2.0-dev \
    pkg-config \
    qtchooser \
    qt5-qmake \
    qtbase5-dev-tools \
    libtbb-dev \
    libgphoto2-dev \
    ffmpeg \
    usbutils \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN pip install --upgrade pip setuptools

# Copy requirements folder to image
COPY requirements /requirements

# Install requirements
RUN for file in /requirements/*; do pip install --no-cache-dir -r "$file"; done



COPY . .

# Because we have to use an old version of protobuf - it doesn't have builder py
# so we need to copy it into the site packages for protobuf to work for grpc and tensorflow
COPY /body_seg/builder.py ../../usr/local/lib/python3.10/site-packages/google/protobuf/internal/

WORKDIR /interaction_node


RUN chmod +x interaction_node.py
ENV APP_HOME=$APP_HOME
WORKDIR /interaction_node

CMD ["python", "-u", "interaction_node.py"]
