# Art-OS

Desktop Application created by HARRY J DEE - for reactive art installations

## Generate Protos

### AudioNode Service

- compile typescript client proto

protoc protos/visualInputNode.proto --js_out=import_style=commonjs,binary:./src/grpc --grpc-web_out=import_style=typescript,mode=grpcwebtext:./src/grpc

- generate python proto

python -m grpc_tools.protoc -I./protos --python_out=./visualInputNode --grpc_python_out=./visualInputNode ./protos/visualInputNode.proto

## Build Docker Images

build

- docker-compose -f docker-compose.yml build
  run
  docker network create isolated
- docker-compose -f docker-compose.yml up -d

docker ps
~/Users/harry/Desktop/Techno/YTP.aiff
