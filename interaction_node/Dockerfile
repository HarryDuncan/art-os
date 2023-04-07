# syntax=docker/dockerfile:1

FROM python:3.10.5
ENV APP_HOME /interaction_node
WORKDIR $APP_HOME
 
RUN apt-get update && apt-get install -y python3-opencv
    

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
# RUN ["python", "body_seg/body_seg.py"]
CMD ["python", "interaction_node.py"]
