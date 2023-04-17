# Art-OS

Desktop Application created by HARRY J DEE - for reactive art installations

## Generate Protos

### AudioNode Service

- compile typescript client proto

protoc -I../googleapis -I. --include_imports --include_source_info protos/visualInputNode.proto --js_out=import_style=commonjs,binary:./src/grpc --grpc-web_out=import_style=typescript,mode=grpcwebtext:./src/grpc

- generate python proto

python -m -I../googleapis grpc_tools.protoc -I./protos --python_out=./visualInputNode --grpc_python_out=./visualInputNode ./protos/visualInputNode.proto

protoc -I../googleapis -I. --include_imports --include_source_info --descriptor_set_out=envoy/protos/visualInputNode.pb protos/visualInputNode.proto

## Build Docker Images

build

- docker-compose -f docker-compose.yml build
  run
  docker network create isolated
- docker-compose -f docker-compose.yml up -d

docker ps
~/Users/harry/Desktop/Techno/YTP.aiff

ffmpeg -f dshow -framerate 5 -i video="c922 Pro Stream Webcam" -vcodec mpeg4 -q 20 -f mpegts udp://127.0.0.1:1235
