// source: protos/interactionNode.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.interactionNode.InitalizeAlgorithimResponse', null, global);
goog.exportSymbol('proto.interactionNode.InitializeAlgorithmRequest', null, global);
goog.exportSymbol('proto.interactionNode.InitializeInteractionNodeRequest', null, global);
goog.exportSymbol('proto.interactionNode.InitializeInteractionNodeResponse', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.interactionNode.InitializeInteractionNodeRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.interactionNode.InitializeInteractionNodeRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.interactionNode.InitializeInteractionNodeRequest.displayName = 'proto.interactionNode.InitializeInteractionNodeRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.interactionNode.InitializeInteractionNodeResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.interactionNode.InitializeInteractionNodeResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.interactionNode.InitializeInteractionNodeResponse.displayName = 'proto.interactionNode.InitializeInteractionNodeResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.interactionNode.InitializeAlgorithmRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.interactionNode.InitializeAlgorithmRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.interactionNode.InitializeAlgorithmRequest.displayName = 'proto.interactionNode.InitializeAlgorithmRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.interactionNode.InitalizeAlgorithimResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.interactionNode.InitalizeAlgorithimResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.interactionNode.InitalizeAlgorithimResponse.displayName = 'proto.interactionNode.InitalizeAlgorithimResponse';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.interactionNode.InitializeInteractionNodeRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.interactionNode.InitializeInteractionNodeRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.interactionNode.InitializeInteractionNodeRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.interactionNode.InitializeInteractionNodeRequest.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.interactionNode.InitializeInteractionNodeRequest}
 */
proto.interactionNode.InitializeInteractionNodeRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.interactionNode.InitializeInteractionNodeRequest;
  return proto.interactionNode.InitializeInteractionNodeRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.interactionNode.InitializeInteractionNodeRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.interactionNode.InitializeInteractionNodeRequest}
 */
proto.interactionNode.InitializeInteractionNodeRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.interactionNode.InitializeInteractionNodeRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.interactionNode.InitializeInteractionNodeRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.interactionNode.InitializeInteractionNodeRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.interactionNode.InitializeInteractionNodeRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.interactionNode.InitializeInteractionNodeResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.interactionNode.InitializeInteractionNodeResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.interactionNode.InitializeInteractionNodeResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.interactionNode.InitializeInteractionNodeResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    isinitialized: jspb.Message.getBooleanFieldWithDefault(msg, 1, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.interactionNode.InitializeInteractionNodeResponse}
 */
proto.interactionNode.InitializeInteractionNodeResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.interactionNode.InitializeInteractionNodeResponse;
  return proto.interactionNode.InitializeInteractionNodeResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.interactionNode.InitializeInteractionNodeResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.interactionNode.InitializeInteractionNodeResponse}
 */
proto.interactionNode.InitializeInteractionNodeResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIsinitialized(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.interactionNode.InitializeInteractionNodeResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.interactionNode.InitializeInteractionNodeResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.interactionNode.InitializeInteractionNodeResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.interactionNode.InitializeInteractionNodeResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getIsinitialized();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
};


/**
 * optional bool isInitialized = 1;
 * @return {boolean}
 */
proto.interactionNode.InitializeInteractionNodeResponse.prototype.getIsinitialized = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.interactionNode.InitializeInteractionNodeResponse} returns this
 */
proto.interactionNode.InitializeInteractionNodeResponse.prototype.setIsinitialized = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.interactionNode.InitializeAlgorithmRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.interactionNode.InitializeAlgorithmRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.interactionNode.InitializeAlgorithmRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.interactionNode.InitializeAlgorithmRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    algorithmType: jspb.Message.getFieldWithDefault(msg, 1, ""),
    dataTransformType: jspb.Message.getFieldWithDefault(msg, 2, ""),
    id: jspb.Message.getFieldWithDefault(msg, 3, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.interactionNode.InitializeAlgorithmRequest}
 */
proto.interactionNode.InitializeAlgorithmRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.interactionNode.InitializeAlgorithmRequest;
  return proto.interactionNode.InitializeAlgorithmRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.interactionNode.InitializeAlgorithmRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.interactionNode.InitializeAlgorithmRequest}
 */
proto.interactionNode.InitializeAlgorithmRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setAlgorithmType(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setDataTransformType(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.interactionNode.InitializeAlgorithmRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.interactionNode.InitializeAlgorithmRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.interactionNode.InitializeAlgorithmRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.interactionNode.InitializeAlgorithmRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAlgorithmType();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getDataTransformType();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional string algorithm_type = 1;
 * @return {string}
 */
proto.interactionNode.InitializeAlgorithmRequest.prototype.getAlgorithmType = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.interactionNode.InitializeAlgorithmRequest} returns this
 */
proto.interactionNode.InitializeAlgorithmRequest.prototype.setAlgorithmType = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string data_transform_type = 2;
 * @return {string}
 */
proto.interactionNode.InitializeAlgorithmRequest.prototype.getDataTransformType = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.interactionNode.InitializeAlgorithmRequest} returns this
 */
proto.interactionNode.InitializeAlgorithmRequest.prototype.setDataTransformType = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string id = 3;
 * @return {string}
 */
proto.interactionNode.InitializeAlgorithmRequest.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.interactionNode.InitializeAlgorithmRequest} returns this
 */
proto.interactionNode.InitializeAlgorithmRequest.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.interactionNode.InitalizeAlgorithimResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.interactionNode.InitalizeAlgorithimResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.interactionNode.InitalizeAlgorithimResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.interactionNode.InitalizeAlgorithimResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    isintialized: jspb.Message.getBooleanFieldWithDefault(msg, 2, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.interactionNode.InitalizeAlgorithimResponse}
 */
proto.interactionNode.InitalizeAlgorithimResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.interactionNode.InitalizeAlgorithimResponse;
  return proto.interactionNode.InitalizeAlgorithimResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.interactionNode.InitalizeAlgorithimResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.interactionNode.InitalizeAlgorithimResponse}
 */
proto.interactionNode.InitalizeAlgorithimResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIsintialized(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.interactionNode.InitalizeAlgorithimResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.interactionNode.InitalizeAlgorithimResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.interactionNode.InitalizeAlgorithimResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.interactionNode.InitalizeAlgorithimResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getIsintialized();
  if (f) {
    writer.writeBool(
      2,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.interactionNode.InitalizeAlgorithimResponse.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.interactionNode.InitalizeAlgorithimResponse} returns this
 */
proto.interactionNode.InitalizeAlgorithimResponse.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional bool isIntialized = 2;
 * @return {boolean}
 */
proto.interactionNode.InitalizeAlgorithimResponse.prototype.getIsintialized = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 2, false));
};


/**
 * @param {boolean} value
 * @return {!proto.interactionNode.InitalizeAlgorithimResponse} returns this
 */
proto.interactionNode.InitalizeAlgorithimResponse.prototype.setIsintialized = function(value) {
  return jspb.Message.setProto3BooleanField(this, 2, value);
};


goog.object.extend(exports, proto.interactionNode);
