#!/bin/bash

# Generate JavaScript protobuf files
protoc -I../googleapis -I. protos/interactionNode.proto --js_out=import_style=commonjs,binary:./src/interaction/external --grpc-web_out=import_style=typescript,mode=grpcwebtext:./src/interaction/external

# Generate Python protobuf files
python -m grpc_tools.protoc -I./protos --python_out=./interaction_node --grpc_python_out=./interaction_node ./protos/interactionNode.proto
# Generate descriptor set file
protoc -I../googleapis -I. --include_imports --include_source_info --descriptor_set_out=envoy/protos/interactionNode.pb protos/interactionNode.proto
