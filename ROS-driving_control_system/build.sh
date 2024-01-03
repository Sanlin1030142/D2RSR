cd ~/D2RSR/ROS-driving_control_system/catkin_ws
catkin_make --only-pkg-with-deps joystick_drivers
catkin_make --only-pkg-with-deps usb_cam
catkin_make --only-pkg-with-deps joy_control
catkin_make --only-pkg-with-deps avoidance
catkin_make --only-pkg-with-deps rosky_control
catkin_make --only-pkg-with-deps ydlidar_noise_filter
catkin_make --only-pkg-with-deps web_msgs
catkin_make --only-pkg-with-deps web_bridge
catkin_make --only-pkg-with-deps video_stream
catkin_make --only-pkg-with-deps signal