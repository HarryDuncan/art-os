# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc

import interactionNode_pb2 as interactionNode__pb2


class InteractionNodeServiceStub(object):
    """Visual Input Node Service 

    """

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.InitializeInteractionNode = channel.unary_unary(
                '/interactionNode.InteractionNodeService/InitializeInteractionNode',
                request_serializer=interactionNode__pb2.InitializeInteractionNodeRequest.SerializeToString,
                response_deserializer=interactionNode__pb2.InitializeInteractionNodeResponse.FromString,
                )
        self.InitalizeAlgorithm = channel.unary_unary(
                '/interactionNode.InteractionNodeService/InitalizeAlgorithm',
                request_serializer=interactionNode__pb2.InitializeAlgorithmRequest.SerializeToString,
                response_deserializer=interactionNode__pb2.InitializeAlgorithmResponse.FromString,
                )
        self.RunAlgorithm = channel.unary_unary(
                '/interactionNode.InteractionNodeService/RunAlgorithm',
                request_serializer=interactionNode__pb2.RunAlgorithmRequest.SerializeToString,
                response_deserializer=interactionNode__pb2.RunAlgorithmResponse.FromString,
                )


class InteractionNodeServiceServicer(object):
    """Visual Input Node Service 

    """

    def InitializeInteractionNode(self, request, context):
        """<------------------- Initialization -------------------------------->
        """
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def InitalizeAlgorithm(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def RunAlgorithm(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_InteractionNodeServiceServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'InitializeInteractionNode': grpc.unary_unary_rpc_method_handler(
                    servicer.InitializeInteractionNode,
                    request_deserializer=interactionNode__pb2.InitializeInteractionNodeRequest.FromString,
                    response_serializer=interactionNode__pb2.InitializeInteractionNodeResponse.SerializeToString,
            ),
            'InitalizeAlgorithm': grpc.unary_unary_rpc_method_handler(
                    servicer.InitalizeAlgorithm,
                    request_deserializer=interactionNode__pb2.InitializeAlgorithmRequest.FromString,
                    response_serializer=interactionNode__pb2.InitializeAlgorithmResponse.SerializeToString,
            ),
            'RunAlgorithm': grpc.unary_unary_rpc_method_handler(
                    servicer.RunAlgorithm,
                    request_deserializer=interactionNode__pb2.RunAlgorithmRequest.FromString,
                    response_serializer=interactionNode__pb2.RunAlgorithmResponse.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'interactionNode.InteractionNodeService', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))


 # This class is part of an EXPERIMENTAL API.
class InteractionNodeService(object):
    """Visual Input Node Service 

    """

    @staticmethod
    def InitializeInteractionNode(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/interactionNode.InteractionNodeService/InitializeInteractionNode',
            interactionNode__pb2.InitializeInteractionNodeRequest.SerializeToString,
            interactionNode__pb2.InitializeInteractionNodeResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def InitalizeAlgorithm(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/interactionNode.InteractionNodeService/InitalizeAlgorithm',
            interactionNode__pb2.InitializeAlgorithmRequest.SerializeToString,
            interactionNode__pb2.InitializeAlgorithmResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def RunAlgorithm(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/interactionNode.InteractionNodeService/RunAlgorithm',
            interactionNode__pb2.RunAlgorithmRequest.SerializeToString,
            interactionNode__pb2.RunAlgorithmResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)
