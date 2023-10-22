;; Auto-generated. Do not edit!


(when (boundp 'web_msgs::web_transfer_pkg)
  (if (not (find-package "WEB_MSGS"))
    (make-package "WEB_MSGS"))
  (shadow 'web_transfer_pkg (find-package "WEB_MSGS")))
(unless (find-package "WEB_MSGS::WEB_TRANSFER_PKG")
  (make-package "WEB_MSGS::WEB_TRANSFER_PKG"))

(in-package "ROS")
;;//! \htmlinclude web_transfer_pkg.msg.html
(if (not (find-package "NAV_MSGS"))
  (ros::roseus-add-msgs "nav_msgs"))
(if (not (find-package "STD_MSGS"))
  (ros::roseus-add-msgs "std_msgs"))


(defclass web_msgs::web_transfer_pkg
  :super ros::object
  :slots (_header _original_lidar_signal _filtered_lidar_signal _velocity _collision _map ))

(defmethod web_msgs::web_transfer_pkg
  (:init
   (&key
    ((:header __header) (instance std_msgs::Header :init))
    ((:original_lidar_signal __original_lidar_signal) (make-array 0 :initial-element 0.0 :element-type :float))
    ((:filtered_lidar_signal __filtered_lidar_signal) (make-array 0 :initial-element 0.0 :element-type :float))
    ((:velocity __velocity) (instance web_msgs::velocity :init))
    ((:collision __collision) (let (r) (dotimes (i 0) (push "" r)) r))
    ((:map __map) (instance nav_msgs::OccupancyGrid :init))
    )
   (send-super :init)
   (setq _header __header)
   (setq _original_lidar_signal __original_lidar_signal)
   (setq _filtered_lidar_signal __filtered_lidar_signal)
   (setq _velocity __velocity)
   (setq _collision __collision)
   (setq _map __map)
   self)
  (:header
   (&rest __header)
   (if (keywordp (car __header))
       (send* _header __header)
     (progn
       (if __header (setq _header (car __header)))
       _header)))
  (:original_lidar_signal
   (&optional __original_lidar_signal)
   (if __original_lidar_signal (setq _original_lidar_signal __original_lidar_signal)) _original_lidar_signal)
  (:filtered_lidar_signal
   (&optional __filtered_lidar_signal)
   (if __filtered_lidar_signal (setq _filtered_lidar_signal __filtered_lidar_signal)) _filtered_lidar_signal)
  (:velocity
   (&rest __velocity)
   (if (keywordp (car __velocity))
       (send* _velocity __velocity)
     (progn
       (if __velocity (setq _velocity (car __velocity)))
       _velocity)))
  (:collision
   (&optional __collision)
   (if __collision (setq _collision __collision)) _collision)
  (:map
   (&rest __map)
   (if (keywordp (car __map))
       (send* _map __map)
     (progn
       (if __map (setq _map (car __map)))
       _map)))
  (:serialization-length
   ()
   (+
    ;; std_msgs/Header _header
    (send _header :serialization-length)
    ;; float32[] _original_lidar_signal
    (* 4    (length _original_lidar_signal)) 4
    ;; float32[] _filtered_lidar_signal
    (* 4    (length _filtered_lidar_signal)) 4
    ;; web_msgs/velocity _velocity
    (send _velocity :serialization-length)
    ;; string[] _collision
    (apply #'+ (mapcar #'(lambda (x) (+ 4 (length x))) _collision)) 4
    ;; nav_msgs/OccupancyGrid _map
    (send _map :serialization-length)
    ))
  (:serialize
   (&optional strm)
   (let ((s (if strm strm
              (make-string-output-stream (send self :serialization-length)))))
     ;; std_msgs/Header _header
       (send _header :serialize s)
     ;; float32[] _original_lidar_signal
     (write-long (length _original_lidar_signal) s)
     (dotimes (i (length _original_lidar_signal))
       (sys::poke (elt _original_lidar_signal i) (send s :buffer) (send s :count) :float) (incf (stream-count s) 4)
       )
     ;; float32[] _filtered_lidar_signal
     (write-long (length _filtered_lidar_signal) s)
     (dotimes (i (length _filtered_lidar_signal))
       (sys::poke (elt _filtered_lidar_signal i) (send s :buffer) (send s :count) :float) (incf (stream-count s) 4)
       )
     ;; web_msgs/velocity _velocity
       (send _velocity :serialize s)
     ;; string[] _collision
     (write-long (length _collision) s)
     (dolist (elem _collision)
       (write-long (length elem) s) (princ elem s)
       )
     ;; nav_msgs/OccupancyGrid _map
       (send _map :serialize s)
     ;;
     (if (null strm) (get-output-stream-string s))))
  (:deserialize
   (buf &optional (ptr- 0))
   ;; std_msgs/Header _header
     (send _header :deserialize buf ptr-) (incf ptr- (send _header :serialization-length))
   ;; float32[] _original_lidar_signal
   (let (n)
     (setq n (sys::peek buf ptr- :integer)) (incf ptr- 4)
     (setq _original_lidar_signal (instantiate float-vector n))
     (dotimes (i n)
     (setf (elt _original_lidar_signal i) (sys::peek buf ptr- :float)) (incf ptr- 4)
     ))
   ;; float32[] _filtered_lidar_signal
   (let (n)
     (setq n (sys::peek buf ptr- :integer)) (incf ptr- 4)
     (setq _filtered_lidar_signal (instantiate float-vector n))
     (dotimes (i n)
     (setf (elt _filtered_lidar_signal i) (sys::peek buf ptr- :float)) (incf ptr- 4)
     ))
   ;; web_msgs/velocity _velocity
     (send _velocity :deserialize buf ptr-) (incf ptr- (send _velocity :serialization-length))
   ;; string[] _collision
   (let (n)
     (setq n (sys::peek buf ptr- :integer)) (incf ptr- 4)
     (setq _collision (make-list n))
     (dotimes (i n)
     (let (n) (setq n (sys::peek buf ptr- :integer)) (incf ptr- 4) (setf (elt _collision i) (subseq buf ptr- (+ ptr- n))) (incf ptr- n))
     ))
   ;; nav_msgs/OccupancyGrid _map
     (send _map :deserialize buf ptr-) (incf ptr- (send _map :serialization-length))
   ;;
   self)
  )

(setf (get web_msgs::web_transfer_pkg :md5sum-) "6d03f7cc7702568a120bbd62ac338224")
(setf (get web_msgs::web_transfer_pkg :datatype-) "web_msgs/web_transfer_pkg")
(setf (get web_msgs::web_transfer_pkg :definition-)
      "Header header
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

")



(provide :web_msgs/web_transfer_pkg "6d03f7cc7702568a120bbd62ac338224")


