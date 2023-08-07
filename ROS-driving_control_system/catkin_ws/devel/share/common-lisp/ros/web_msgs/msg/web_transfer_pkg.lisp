; Auto-generated. Do not edit!


(cl:in-package web_msgs-msg)


;//! \htmlinclude web_transfer_pkg.msg.html

(cl:defclass <web_transfer_pkg> (roslisp-msg-protocol:ros-message)
  ((header
    :reader header
    :initarg :header
    :type std_msgs-msg:Header
    :initform (cl:make-instance 'std_msgs-msg:Header))
   (original_lidar_signal
    :reader original_lidar_signal
    :initarg :original_lidar_signal
    :type (cl:vector cl:float)
   :initform (cl:make-array 0 :element-type 'cl:float :initial-element 0.0))
   (filtered_lidar_signal
    :reader filtered_lidar_signal
    :initarg :filtered_lidar_signal
    :type (cl:vector cl:float)
   :initform (cl:make-array 0 :element-type 'cl:float :initial-element 0.0))
   (velocity
    :reader velocity
    :initarg :velocity
    :type web_msgs-msg:velocity
    :initform (cl:make-instance 'web_msgs-msg:velocity))
   (collision
    :reader collision
    :initarg :collision
    :type (cl:vector cl:string)
   :initform (cl:make-array 0 :element-type 'cl:string :initial-element ""))
   (map
    :reader map
    :initarg :map
    :type nav_msgs-msg:OccupancyGrid
    :initform (cl:make-instance 'nav_msgs-msg:OccupancyGrid)))
)

(cl:defclass web_transfer_pkg (<web_transfer_pkg>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <web_transfer_pkg>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'web_transfer_pkg)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name web_msgs-msg:<web_transfer_pkg> is deprecated: use web_msgs-msg:web_transfer_pkg instead.")))

(cl:ensure-generic-function 'header-val :lambda-list '(m))
(cl:defmethod header-val ((m <web_transfer_pkg>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader web_msgs-msg:header-val is deprecated.  Use web_msgs-msg:header instead.")
  (header m))

(cl:ensure-generic-function 'original_lidar_signal-val :lambda-list '(m))
(cl:defmethod original_lidar_signal-val ((m <web_transfer_pkg>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader web_msgs-msg:original_lidar_signal-val is deprecated.  Use web_msgs-msg:original_lidar_signal instead.")
  (original_lidar_signal m))

(cl:ensure-generic-function 'filtered_lidar_signal-val :lambda-list '(m))
(cl:defmethod filtered_lidar_signal-val ((m <web_transfer_pkg>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader web_msgs-msg:filtered_lidar_signal-val is deprecated.  Use web_msgs-msg:filtered_lidar_signal instead.")
  (filtered_lidar_signal m))

(cl:ensure-generic-function 'velocity-val :lambda-list '(m))
(cl:defmethod velocity-val ((m <web_transfer_pkg>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader web_msgs-msg:velocity-val is deprecated.  Use web_msgs-msg:velocity instead.")
  (velocity m))

(cl:ensure-generic-function 'collision-val :lambda-list '(m))
(cl:defmethod collision-val ((m <web_transfer_pkg>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader web_msgs-msg:collision-val is deprecated.  Use web_msgs-msg:collision instead.")
  (collision m))

(cl:ensure-generic-function 'map-val :lambda-list '(m))
(cl:defmethod map-val ((m <web_transfer_pkg>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader web_msgs-msg:map-val is deprecated.  Use web_msgs-msg:map instead.")
  (map m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <web_transfer_pkg>) ostream)
  "Serializes a message object of type '<web_transfer_pkg>"
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'header) ostream)
  (cl:let ((__ros_arr_len (cl:length (cl:slot-value msg 'original_lidar_signal))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_arr_len) ostream))
  (cl:map cl:nil #'(cl:lambda (ele) (cl:let ((bits (roslisp-utils:encode-single-float-bits ele)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream)))
   (cl:slot-value msg 'original_lidar_signal))
  (cl:let ((__ros_arr_len (cl:length (cl:slot-value msg 'filtered_lidar_signal))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_arr_len) ostream))
  (cl:map cl:nil #'(cl:lambda (ele) (cl:let ((bits (roslisp-utils:encode-single-float-bits ele)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream)))
   (cl:slot-value msg 'filtered_lidar_signal))
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'velocity) ostream)
  (cl:let ((__ros_arr_len (cl:length (cl:slot-value msg 'collision))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_arr_len) ostream))
  (cl:map cl:nil #'(cl:lambda (ele) (cl:let ((__ros_str_len (cl:length ele)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) ele))
   (cl:slot-value msg 'collision))
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'map) ostream)
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <web_transfer_pkg>) istream)
  "Deserializes a message object of type '<web_transfer_pkg>"
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'header) istream)
  (cl:let ((__ros_arr_len 0))
    (cl:setf (cl:ldb (cl:byte 8 0) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 8) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 16) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 24) __ros_arr_len) (cl:read-byte istream))
  (cl:setf (cl:slot-value msg 'original_lidar_signal) (cl:make-array __ros_arr_len))
  (cl:let ((vals (cl:slot-value msg 'original_lidar_signal)))
    (cl:dotimes (i __ros_arr_len)
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
    (cl:setf (cl:aref vals i) (roslisp-utils:decode-single-float-bits bits))))))
  (cl:let ((__ros_arr_len 0))
    (cl:setf (cl:ldb (cl:byte 8 0) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 8) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 16) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 24) __ros_arr_len) (cl:read-byte istream))
  (cl:setf (cl:slot-value msg 'filtered_lidar_signal) (cl:make-array __ros_arr_len))
  (cl:let ((vals (cl:slot-value msg 'filtered_lidar_signal)))
    (cl:dotimes (i __ros_arr_len)
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
    (cl:setf (cl:aref vals i) (roslisp-utils:decode-single-float-bits bits))))))
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'velocity) istream)
  (cl:let ((__ros_arr_len 0))
    (cl:setf (cl:ldb (cl:byte 8 0) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 8) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 16) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 24) __ros_arr_len) (cl:read-byte istream))
  (cl:setf (cl:slot-value msg 'collision) (cl:make-array __ros_arr_len))
  (cl:let ((vals (cl:slot-value msg 'collision)))
    (cl:dotimes (i __ros_arr_len)
    (cl:let ((__ros_str_len 0))
      (cl:setf (cl:ldb (cl:byte 8 0) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:aref vals i) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:aref vals i) __ros_str_idx) (cl:code-char (cl:read-byte istream))))))))
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'map) istream)
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<web_transfer_pkg>)))
  "Returns string type for a message object of type '<web_transfer_pkg>"
  "web_msgs/web_transfer_pkg")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'web_transfer_pkg)))
  "Returns string type for a message object of type 'web_transfer_pkg"
  "web_msgs/web_transfer_pkg")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<web_transfer_pkg>)))
  "Returns md5sum for a message object of type '<web_transfer_pkg>"
  "6d03f7cc7702568a120bbd62ac338224")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'web_transfer_pkg)))
  "Returns md5sum for a message object of type 'web_transfer_pkg"
  "6d03f7cc7702568a120bbd62ac338224")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<web_transfer_pkg>)))
  "Returns full string definition for message of type '<web_transfer_pkg>"
  (cl:format cl:nil "Header header~%float32[] original_lidar_signal~%float32[] filtered_lidar_signal~%velocity velocity~%string[] collision~%nav_msgs/OccupancyGrid map~%================================================================================~%MSG: std_msgs/Header~%# Standard metadata for higher-level stamped data types.~%# This is generally used to communicate timestamped data ~%# in a particular coordinate frame.~%# ~%# sequence ID: consecutively increasing ID ~%uint32 seq~%#Two-integer timestamp that is expressed as:~%# * stamp.sec: seconds (stamp_secs) since epoch (in Python the variable is called 'secs')~%# * stamp.nsec: nanoseconds since stamp_secs (in Python the variable is called 'nsecs')~%# time-handling sugar is provided by the client library~%time stamp~%#Frame this data is associated with~%string frame_id~%~%================================================================================~%MSG: web_msgs/velocity~%float32 x~%float32 y~%================================================================================~%MSG: nav_msgs/OccupancyGrid~%# This represents a 2-D grid map, in which each cell represents the probability of~%# occupancy.~%~%Header header ~%~%#MetaData for the map~%MapMetaData info~%~%# The map data, in row-major order, starting with (0,0).  Occupancy~%# probabilities are in the range [0,100].  Unknown is -1.~%int8[] data~%~%================================================================================~%MSG: nav_msgs/MapMetaData~%# This hold basic information about the characterists of the OccupancyGrid~%~%# The time at which the map was loaded~%time map_load_time~%# The map resolution [m/cell]~%float32 resolution~%# Map width [cells]~%uint32 width~%# Map height [cells]~%uint32 height~%# The origin of the map [m, m, rad].  This is the real-world pose of the~%# cell (0,0) in the map.~%geometry_msgs/Pose origin~%================================================================================~%MSG: geometry_msgs/Pose~%# A representation of pose in free space, composed of position and orientation. ~%Point position~%Quaternion orientation~%~%================================================================================~%MSG: geometry_msgs/Point~%# This contains the position of a point in free space~%float64 x~%float64 y~%float64 z~%~%================================================================================~%MSG: geometry_msgs/Quaternion~%# This represents an orientation in free space in quaternion form.~%~%float64 x~%float64 y~%float64 z~%float64 w~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'web_transfer_pkg)))
  "Returns full string definition for message of type 'web_transfer_pkg"
  (cl:format cl:nil "Header header~%float32[] original_lidar_signal~%float32[] filtered_lidar_signal~%velocity velocity~%string[] collision~%nav_msgs/OccupancyGrid map~%================================================================================~%MSG: std_msgs/Header~%# Standard metadata for higher-level stamped data types.~%# This is generally used to communicate timestamped data ~%# in a particular coordinate frame.~%# ~%# sequence ID: consecutively increasing ID ~%uint32 seq~%#Two-integer timestamp that is expressed as:~%# * stamp.sec: seconds (stamp_secs) since epoch (in Python the variable is called 'secs')~%# * stamp.nsec: nanoseconds since stamp_secs (in Python the variable is called 'nsecs')~%# time-handling sugar is provided by the client library~%time stamp~%#Frame this data is associated with~%string frame_id~%~%================================================================================~%MSG: web_msgs/velocity~%float32 x~%float32 y~%================================================================================~%MSG: nav_msgs/OccupancyGrid~%# This represents a 2-D grid map, in which each cell represents the probability of~%# occupancy.~%~%Header header ~%~%#MetaData for the map~%MapMetaData info~%~%# The map data, in row-major order, starting with (0,0).  Occupancy~%# probabilities are in the range [0,100].  Unknown is -1.~%int8[] data~%~%================================================================================~%MSG: nav_msgs/MapMetaData~%# This hold basic information about the characterists of the OccupancyGrid~%~%# The time at which the map was loaded~%time map_load_time~%# The map resolution [m/cell]~%float32 resolution~%# Map width [cells]~%uint32 width~%# Map height [cells]~%uint32 height~%# The origin of the map [m, m, rad].  This is the real-world pose of the~%# cell (0,0) in the map.~%geometry_msgs/Pose origin~%================================================================================~%MSG: geometry_msgs/Pose~%# A representation of pose in free space, composed of position and orientation. ~%Point position~%Quaternion orientation~%~%================================================================================~%MSG: geometry_msgs/Point~%# This contains the position of a point in free space~%float64 x~%float64 y~%float64 z~%~%================================================================================~%MSG: geometry_msgs/Quaternion~%# This represents an orientation in free space in quaternion form.~%~%float64 x~%float64 y~%float64 z~%float64 w~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <web_transfer_pkg>))
  (cl:+ 0
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'header))
     4 (cl:reduce #'cl:+ (cl:slot-value msg 'original_lidar_signal) :key #'(cl:lambda (ele) (cl:declare (cl:ignorable ele)) (cl:+ 4)))
     4 (cl:reduce #'cl:+ (cl:slot-value msg 'filtered_lidar_signal) :key #'(cl:lambda (ele) (cl:declare (cl:ignorable ele)) (cl:+ 4)))
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'velocity))
     4 (cl:reduce #'cl:+ (cl:slot-value msg 'collision) :key #'(cl:lambda (ele) (cl:declare (cl:ignorable ele)) (cl:+ 4 (cl:length ele))))
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'map))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <web_transfer_pkg>))
  "Converts a ROS message object to a list"
  (cl:list 'web_transfer_pkg
    (cl:cons ':header (header msg))
    (cl:cons ':original_lidar_signal (original_lidar_signal msg))
    (cl:cons ':filtered_lidar_signal (filtered_lidar_signal msg))
    (cl:cons ':velocity (velocity msg))
    (cl:cons ':collision (collision msg))
    (cl:cons ':map (map msg))
))
