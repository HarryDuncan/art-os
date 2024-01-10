#!/bin/bash
# Generate JavaScript protobuf files
protoc -I../googleapis -I. protos/interactionNode.proto --js_out=import_style=commonjs,binary:./src/interaction/external --grpc-web_out=import_style=typescript,mode=grpcwebtext:./src/interaction/external
python -m grpc_tools.protoc -I./protos --python_out=./interaction_node --grpc_python_out=./interaction_node ./protos/interactionNode.proto
protoc -I../googleapis -I. --include_imports --include_source_info --descriptor_set_out=envoy/protos/interactionNode.pb protos/interactionNode.proto

protoc -I../googleapis -I. protos/sceneCapture.proto --js_out=import_style=commonjs,binary:./src/external-services/scene-capture --grpc-web_out=import_style=typescript,mode=grpcwebtext:./src/external-services/scene-capture
python -m grpc_tools.protoc -I./protos --python_out=./external_services/scene_capture --grpc_python_out=./external_services/scene_capture ./protos/sceneCapture.proto
protoc -I../googleapis -I. --include_imports --include_source_info --descriptor_set_out=envoy/protos/sceneCapture.pb protos/sceneCapture.proto
