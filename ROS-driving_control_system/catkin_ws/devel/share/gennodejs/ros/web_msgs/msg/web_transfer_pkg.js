// Auto-generated. Do not edit!

// (in-package web_msgs.msg)


"use strict";

const _serializer = _ros_msg_utils.Serialize;
const _arraySerializer = _serializer.Array;
const _deserializer = _ros_msg_utils.Deserialize;
const _arrayDeserializer = _deserializer.Array;
const _finder = _ros_msg_utils.Find;
const _getByteLength = _ros_msg_utils.getByteLength;
let velocity = require('./velocity.js');
let nav_msgs = _finder('nav_msgs');
let std_msgs = _finder('std_msgs');

//-----------------------------------------------------------

class web_transfer_pkg {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.header = null;
      this.original_lidar_signal = null;
      this.filtered_lidar_signal = null;
      this.velocity = null;
      this.collision = null;
      this.map = null;
    }
    else {
      if (initObj.hasOwnProperty('header')) {
        this.header = initObj.header
      }
      else {
        this.header = new std_msgs.msg.Header();
      }
      if (initObj.hasOwnProperty('original_lidar_signal')) {
        this.original_lidar_signal = initObj.original_lidar_signal
      }
      else {
        this.original_lidar_signal = [];
      }
      if (initObj.hasOwnProperty('filtered_lidar_signal')) {
        this.filtered_lidar_signal = initObj.filtered_lidar_signal
      }
      else {
        this.filtered_lidar_signal = [];
      }
      if (initObj.hasOwnProperty('velocity')) {
        this.velocity = initObj.velocity
      }
      else {
        this.velocity = new velocity();
      }
      if (initObj.hasOwnProperty('collision')) {
        this.collision = initObj.collision
      }
      else {
        this.collision = [];
      }
      if (initObj.hasOwnProperty('map')) {
        this.map = initObj.map
      }
      else {
        this.map = new nav_msgs.msg.OccupancyGrid();
      }
    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type web_transfer_pkg
    // Serialize message field [header]
    bufferOffset = std_msgs.msg.Header.serialize(obj.header, buffer, bufferOffset);
    // Serialize message field [original_lidar_signal]
    bufferOffset = _arraySerializer.float32(obj.original_lidar_signal, buffer, bufferOffset, null);
    // Serialize message field [filtered_lidar_signal]
    bufferOffset = _arraySerializer.float32(obj.filtered_lidar_signal, buffer, bufferOffset, null);
    // Serialize message field [velocity]
    bufferOffset = velocity.serialize(obj.velocity, buffer, bufferOffset);
    // Serialize message field [collision]
    bufferOffset = _arraySerializer.string(obj.collision, buffer, bufferOffset, null);
    // Serialize message field [map]
    bufferOffset = nav_msgs.msg.OccupancyGrid.serialize(obj.map, buffer, bufferOffset);
    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    //deserializes a message object of type web_transfer_pkg
    let len;
    let data = new web_transfer_pkg(null);
    // Deserialize message field [header]
    data.header = std_msgs.msg.Header.deserialize(buffer, bufferOffset);
    // Deserialize message field [original_lidar_signal]
    data.original_lidar_signal = _arrayDeserializer.float32(buffer, bufferOffset, null)
    // Deserialize message field [filtered_lidar_signal]
    data.filtered_lidar_signal = _arrayDeserializer.float32(buffer, bufferOffset, null)
    // Deserialize message field [velocity]
    data.velocity = velocity.deserialize(buffer, bufferOffset);
    // Deserialize message field [collision]
    data.collision = _arrayDeserializer.string(buffer, bufferOffset, null)
    // Deserialize message field [map]
    data.map = nav_msgs.msg.OccupancyGrid.deserialize(buffer, bufferOffset);
    return data;
  }

  static getMessageSize(object) {
    let length = 0;
    length += std_msgs.msg.Header.getMessageSize(object.header);
    length += 4 * object.original_lidar_signal.length;
    length += 4 * object.filtered_lidar_signal.length;
    object.collision.forEach((val) => {
      length += 4 + val.length;
    });
    length += nav_msgs.msg.OccupancyGrid.getMessageSize(object.map);
    return length + 20;
  }

  static datatype() {
    // Returns string type for a message object
    return 'web_msgs/web_transfer_pkg';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return '6d03f7cc7702568a120bbd62ac338224';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    Header header
    float32[] original_lidar_signal
    float32[] filtered_lidar_signal
    velocity velocity
    string[] collision
    nav_msgs/OccupancyGrid map
    ================================================================================
    MSG: std_msgs/Header
    # Standard metadata for higher-level stamped data types.
    # This is generally used to communicate timestamped data 
    # in a particular coordinate frame.
    # 
    # sequence ID: consecutively increasing ID 
    uint32 seq
    #Two-integer timestamp that is expressed as:
    # * stamp.sec: seconds (stamp_secs) since epoch (in Python the variable is called 'secs')
    # * stamp.nsec: nanoseconds since stamp_secs (in Python the variable is called 'nsecs')
    # time-handling sugar is provided by the client library
    time stamp
    #Frame this data is associated with
    string frame_id
    
    ================================================================================
    MSG: web_msgs/velocity
    float32 x
    float32 y
    ================================================================================
    MSG: nav_msgs/OccupancyGrid
    # This represents a 2-D grid map, in which each cell represents the probability of
    # occupancy.
    
    Header header 
    
    #MetaData for the map
    MapMetaData info
    
    # The map data, in row-major order, starting with (0,0).  Occupancy
    # probabilities are in the range [0,100].  Unknown is -1.
    int8[] data
    
    ================================================================================
    MSG: nav_msgs/MapMetaData
    # This hold basic information about the characterists of the OccupancyGrid
    
    # The time at which the map was loaded
    time map_load_time
    # The map resolution [m/cell]
    float32 resolution
    # Map width [cells]
    uint32 width
    # Map height [cells]
    uint32 height
    # The origin of the map [m, m, rad].  This is the real-world pose of the
    # cell (0,0) in the map.
    geometry_msgs/Pose origin
    ================================================================================
    MSG: geometry_msgs/Pose
    # A representation of pose in free space, composed of position and orientation. 
    Point position
    Quaternion orientation
    
    ================================================================================
    MSG: geometry_msgs/Point
    # This contains the position of a point in free space
    float64 x
    float64 y
    float64 z
    
    ================================================================================
    MSG: geometry_msgs/Quaternion
    # This represents an orientation in free space in quaternion form.
    
    float64 x
    float64 y
    float64 z
    float64 w
    
    `;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new web_transfer_pkg(null);
    if (msg.header !== undefined) {
      resolved.header = std_msgs.msg.Header.Resolve(msg.header)
    }
    else {
      resolved.header = new std_msgs.msg.Header()
    }

    if (msg.original_lidar_signal !== undefined) {
      resolved.original_lidar_signal = msg.original_lidar_signal;
    }
    else {
      resolved.original_lidar_signal = []
    }

    if (msg.filtered_lidar_signal !== undefined) {
      resolved.filtered_lidar_signal = msg.filtered_lidar_signal;
    }
    else {
      resolved.filtered_lidar_signal = []
    }

    if (msg.velocity !== undefined) {
      resolved.velocity = velocity.Resolve(msg.velocity)
    }
    else {
      resolved.velocity = new velocity()
    }

    if (msg.collision !== undefined) {
      resolved.collision = msg.collision;
    }
    else {
      resolved.collision = []
    }

    if (msg.map !== undefined) {
      resolved.map = nav_msgs.msg.OccupancyGrid.Resolve(msg.map)
    }
    else {
      resolved.map = new nav_msgs.msg.OccupancyGrid()
    }

    return resolved;
    }
};

module.exports = web_transfer_pkg;
