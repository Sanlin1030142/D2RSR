# generated from genmsg/cmake/pkg-genmsg.cmake.em

message(STATUS "web_msgs: 2 messages, 0 services")

set(MSG_I_FLAGS "-Iweb_msgs:/home/master/D2RSR/ROS-driving_control_system/catkin_ws/src/web_msgs/msg;-Inav_msgs:/opt/ros/melodic/share/nav_msgs/cmake/../msg;-Istd_msgs:/opt/ros/melodic/share/std_msgs/cmake/../msg;-Iweb_msgs:/home/master/D2RSR/ROS-driving_control_system/catkin_ws/src/web_msgs/msg;-Igeometry_msgs:/opt/ros/melodic/share/geometry_msgs/cmake/../msg;-Iactionlib_msgs:/opt/ros/melodic/share/actionlib_msgs/cmake/../msg")

# Find all generators
find_package(gencpp REQUIRED)
find_package(geneus REQUIRED)
find_package(genlisp REQUIRED)
find_package(gennodejs REQUIRED)
find_package(genpy REQUIRED)

add_custom_target(web_msgs_generate_messages ALL)

# verify that message/service dependencies have not changed since configure



get_filename_component(_filename "/home/master/D2RSR/ROS-driving_control_system/catkin_ws/src/web_msgs/msg/velocity.msg" NAME_WE)
add_custom_target(_web_msgs_generate_messages_check_deps_${_filename}
  COMMAND ${CATKIN_ENV} ${PYTHON_EXECUTABLE} ${GENMSG_CHECK_DEPS_SCRIPT} "web_msgs" "/home/master/D2RSR/ROS-driving_control_system/catkin_ws/src/web_msgs/msg/velocity.msg" ""
)

get_filename_component(_filename "/home/master/D2RSR/ROS-driving_control_system/catkin_ws/src/web_msgs/msg/web_transfer_pkg.msg" NAME_WE)
add_custom_target(_web_msgs_generate_messages_check_deps_${_filename}
  COMMAND ${CATKIN_ENV} ${PYTHON_EXECUTABLE} ${GENMSG_CHECK_DEPS_SCRIPT} "web_msgs" "/home/master/D2RSR/ROS-driving_control_system/catkin_ws/src/web_msgs/msg/web_transfer_pkg.msg" "nav_msgs/MapMetaData:web_msgs/velocity:geometry_msgs/Pose:nav_msgs/OccupancyGrid:std_msgs/Header:geometry_msgs/Quaternion:geometry_msgs/Point"
)

#
#  langs = gencpp;geneus;genlisp;gennodejs;genpy
#

### Section generating for lang: gencpp
### Generating Messages
_generate_msg_cpp(web_msgs
  "/home/master/D2RSR/ROS-driving_control_system/catkin_ws/src/web_msgs/msg/velocity.msg"
  "${MSG_I_FLAGS}"
  ""
  ${CATKIN_DEVEL_PREFIX}/${gencpp_INSTALL_DIR}/web_msgs
)
_generate_msg_cpp(web_msgs
  "/home/master/D2RSR/ROS-driving_control_system/catkin_ws/src/web_msgs/msg/web_transfer_pkg.msg"
  "${MSG_I_FLAGS}"
  "/opt/ros/melodic/share/nav_msgs/cmake/../msg/MapMetaData.msg;/home/master/D2RSR/ROS-driving_control_system/catkin_ws/src/web_msgs/msg/velocity.msg;/opt/ros/melodic/share/geometry_msgs/cmake/../msg/Pose.msg;/opt/ros/melodic/share/nav_msgs/cmake/../msg/OccupancyGrid.msg;/opt/ros/melodic/share/std_msgs/cmake/../msg/Header.msg;/opt/ros/melodic/share/geometry_msgs/cmake/../msg/Quaternion.msg;/opt/ros/melodic/share/geometry_msgs/cmake/../msg/Point.msg"
  ${CATKIN_DEVEL_PREFIX}/${gencpp_INSTALL_DIR}/web_msgs
)

### Generating Services

### Generating Module File
_generate_module_cpp(web_msgs
  ${CATKIN_DEVEL_PREFIX}/${gencpp_INSTALL_DIR}/web_msgs
  "${ALL_GEN_OUTPUT_FILES_cpp}"
)

add_custom_target(web_msgs_generate_messages_cpp
  DEPENDS ${ALL_GEN_OUTPUT_FILES_cpp}
)
add_dependencies(web_msgs_generate_messages web_msgs_generate_messages_cpp)

# add dependencies to all check dependencies targets
get_filename_component(_filename "/home/master/D2RSR/ROS-driving_control_system/catkin_ws/src/web_msgs/msg/velocity.msg" NAME_WE)
add_dependencies(web_msgs_generate_messages_cpp _web_msgs_generate_messages_check_deps_${_filename})
get_filename_component(_filename "/home/master/D2RSR/ROS-driving_control_system/catkin_ws/src/web_msgs/msg/web_transfer_pkg.msg" NAME_WE)
add_dependencies(web_msgs_generate_messages_cpp _web_msgs_generate_messages_check_deps_${_filename})

# target for backward compatibility
add_custom_target(web_msgs_gencpp)
add_dependencies(web_msgs_gencpp web_msgs_generate_messages_cpp)

# register target for catkin_package(EXPORTED_TARGETS)
list(APPEND ${PROJECT_NAME}_EXPORTED_TARGETS web_msgs_generate_messages_cpp)

### Section generating for lang: geneus
### Generating Messages
_generate_msg_eus(web_msgs
  "/home/master/D2RSR/ROS-driving_control_system/catkin_ws/src/web_msgs/msg/velocity.msg"
  "${MSG_I_FLAGS}"
  ""
  ${CATKIN_DEVEL_PREFIX}/${geneus_INSTALL_DIR}/web_msgs
)
_generate_msg_eus(web_msgs
  "/home/master/D2RSR/ROS-driving_control_system/catkin_ws/src/web_msgs/msg/web_transfer_pkg.msg"
  "${MSG_I_FLAGS}"
  "/opt/ros/melodic/share/nav_msgs/cmake/../msg/MapMetaData.msg;/home/master/D2RSR/ROS-driving_control_system/catkin_ws/src/web_msgs/msg/velocity.msg;/opt/ros/melodic/share/geometry_msgs/cmake/../msg/Pose.msg;/opt/ros/melodic/share/nav_msgs/cmake/../msg/OccupancyGrid.msg;/opt/ros/melodic/share/std_msgs/cmake/../msg/Header.msg;/opt/ros/melodic/share/geometry_msgs/cmake/../msg/Quaternion.msg;/opt/ros/melodic/share/geometry_msgs/cmake/../msg/Point.msg"
  ${CATKIN_DEVEL_PREFIX}/${geneus_INSTALL_DIR}/web_msgs
)

### Generating Services

### Generating Module File
_generate_module_eus(web_msgs
  ${CATKIN_DEVEL_PREFIX}/${geneus_INSTALL_DIR}/web_msgs
  "${ALL_GEN_OUTPUT_FILES_eus}"
)

add_custom_target(web_msgs_generate_messages_eus
  DEPENDS ${ALL_GEN_OUTPUT_FILES_eus}
)
add_dependencies(web_msgs_generate_messages web_msgs_generate_messages_eus)

# add dependencies to all check dependencies targets
get_filename_component(_filename "/home/master/D2RSR/ROS-driving_control_system/catkin_ws/src/web_msgs/msg/velocity.msg" NAME_WE)
add_dependencies(web_msgs_generate_messages_eus _web_msgs_generate_messages_check_deps_${_filename})
get_filename_component(_filename "/home/master/D2RSR/ROS-driving_control_system/catkin_ws/src/web_msgs/msg/web_transfer_pkg.msg" NAME_WE)
add_dependencies(web_msgs_generate_messages_eus _web_msgs_generate_messages_check_deps_${_filename})

# target for backward compatibility
add_custom_target(web_msgs_geneus)
add_dependencies(web_msgs_geneus web_msgs_generate_messages_eus)

# register target for catkin_package(EXPORTED_TARGETS)
list(APPEND ${PROJECT_NAME}_EXPORTED_TARGETS web_msgs_generate_messages_eus)

### Section generating for lang: genlisp
### Generating Messages
_generate_msg_lisp(web_msgs
  "/home/master/D2RSR/ROS-driving_control_system/catkin_ws/src/web_msgs/msg/velocity.msg"
  "${MSG_I_FLAGS}"
  ""
  ${CATKIN_DEVEL_PREFIX}/${genlisp_INSTALL_DIR}/web_msgs
)
_generate_msg_lisp(web_msgs
  "/home/master/D2RSR/ROS-driving_control_system/catkin_ws/src/web_msgs/msg/web_transfer_pkg.msg"
  "${MSG_I_FLAGS}"
  "/opt/ros/melodic/share/nav_msgs/cmake/../msg/MapMetaData.msg;/home/master/D2RSR/ROS-driving_control_system/catkin_ws/src/web_msgs/msg/velocity.msg;/opt/ros/melodic/share/geometry_msgs/cmake/../msg/Pose.msg;/opt/ros/melodic/share/nav_msgs/cmake/../msg/OccupancyGrid.msg;/opt/ros/melodic/share/std_msgs/cmake/../msg/Header.msg;/opt/ros/melodic/share/geometry_msgs/cmake/../msg/Quaternion.msg;/opt/ros/melodic/share/geometry_msgs/cmake/../msg/Point.msg"
  ${CATKIN_DEVEL_PREFIX}/${genlisp_INSTALL_DIR}/web_msgs
)

### Generating Services

### Generating Module File
_generate_module_lisp(web_msgs
  ${CATKIN_DEVEL_PREFIX}/${genlisp_INSTALL_DIR}/web_msgs
  "${ALL_GEN_OUTPUT_FILES_lisp}"
)

add_custom_target(web_msgs_generate_messages_lisp
  DEPENDS ${ALL_GEN_OUTPUT_FILES_lisp}
)
add_dependencies(web_msgs_generate_messages web_msgs_generate_messages_lisp)

# add dependencies to all check dependencies targets
get_filename_component(_filename "/home/master/D2RSR/ROS-driving_control_system/catkin_ws/src/web_msgs/msg/velocity.msg" NAME_WE)
add_dependencies(web_msgs_generate_messages_lisp _web_msgs_generate_messages_check_deps_${_filename})
get_filename_component(_filename "/home/master/D2RSR/ROS-driving_control_system/catkin_ws/src/web_msgs/msg/web_transfer_pkg.msg" NAME_WE)
add_dependencies(web_msgs_generate_messages_lisp _web_msgs_generate_messages_check_deps_${_filename})

# target for backward compatibility
add_custom_target(web_msgs_genlisp)
add_dependencies(web_msgs_genlisp web_msgs_generate_messages_lisp)

# register target for catkin_package(EXPORTED_TARGETS)
list(APPEND ${PROJECT_NAME}_EXPORTED_TARGETS web_msgs_generate_messages_lisp)

### Section generating for lang: gennodejs
### Generating Messages
_generate_msg_nodejs(web_msgs
  "/home/master/D2RSR/ROS-driving_control_system/catkin_ws/src/web_msgs/msg/velocity.msg"
  "${MSG_I_FLAGS}"
  ""
  ${CATKIN_DEVEL_PREFIX}/${gennodejs_INSTALL_DIR}/web_msgs
)
_generate_msg_nodejs(web_msgs
  "/home/master/D2RSR/ROS-driving_control_system/catkin_ws/src/web_msgs/msg/web_transfer_pkg.msg"
  "${MSG_I_FLAGS}"
  "/opt/ros/melodic/share/nav_msgs/cmake/../msg/MapMetaData.msg;/home/master/D2RSR/ROS-driving_control_system/catkin_ws/src/web_msgs/msg/velocity.msg;/opt/ros/melodic/share/geometry_msgs/cmake/../msg/Pose.msg;/opt/ros/melodic/share/nav_msgs/cmake/../msg/OccupancyGrid.msg;/opt/ros/melodic/share/std_msgs/cmake/../msg/Header.msg;/opt/ros/melodic/share/geometry_msgs/cmake/../msg/Quaternion.msg;/opt/ros/melodic/share/geometry_msgs/cmake/../msg/Point.msg"
  ${CATKIN_DEVEL_PREFIX}/${gennodejs_INSTALL_DIR}/web_msgs
)

### Generating Services

### Generating Module File
_generate_module_nodejs(web_msgs
  ${CATKIN_DEVEL_PREFIX}/${gennodejs_INSTALL_DIR}/web_msgs
  "${ALL_GEN_OUTPUT_FILES_nodejs}"
)

add_custom_target(web_msgs_generate_messages_nodejs
  DEPENDS ${ALL_GEN_OUTPUT_FILES_nodejs}
)
add_dependencies(web_msgs_generate_messages web_msgs_generate_messages_nodejs)

# add dependencies to all check dependencies targets
get_filename_component(_filename "/home/master/D2RSR/ROS-driving_control_system/catkin_ws/src/web_msgs/msg/velocity.msg" NAME_WE)
add_dependencies(web_msgs_generate_messages_nodejs _web_msgs_generate_messages_check_deps_${_filename})
get_filename_component(_filename "/home/master/D2RSR/ROS-driving_control_system/catkin_ws/src/web_msgs/msg/web_transfer_pkg.msg" NAME_WE)
add_dependencies(web_msgs_generate_messages_nodejs _web_msgs_generate_messages_check_deps_${_filename})

# target for backward compatibility
add_custom_target(web_msgs_gennodejs)
add_dependencies(web_msgs_gennodejs web_msgs_generate_messages_nodejs)

# register target for catkin_package(EXPORTED_TARGETS)
list(APPEND ${PROJECT_NAME}_EXPORTED_TARGETS web_msgs_generate_messages_nodejs)

### Section generating for lang: genpy
### Generating Messages
_generate_msg_py(web_msgs
  "/home/master/D2RSR/ROS-driving_control_system/catkin_ws/src/web_msgs/msg/velocity.msg"
  "${MSG_I_FLAGS}"
  ""
  ${CATKIN_DEVEL_PREFIX}/${genpy_INSTALL_DIR}/web_msgs
)
_generate_msg_py(web_msgs
  "/home/master/D2RSR/ROS-driving_control_system/catkin_ws/src/web_msgs/msg/web_transfer_pkg.msg"
  "${MSG_I_FLAGS}"
  "/opt/ros/melodic/share/nav_msgs/cmake/../msg/MapMetaData.msg;/home/master/D2RSR/ROS-driving_control_system/catkin_ws/src/web_msgs/msg/velocity.msg;/opt/ros/melodic/share/geometry_msgs/cmake/../msg/Pose.msg;/opt/ros/melodic/share/nav_msgs/cmake/../msg/OccupancyGrid.msg;/opt/ros/melodic/share/std_msgs/cmake/../msg/Header.msg;/opt/ros/melodic/share/geometry_msgs/cmake/../msg/Quaternion.msg;/opt/ros/melodic/share/geometry_msgs/cmake/../msg/Point.msg"
  ${CATKIN_DEVEL_PREFIX}/${genpy_INSTALL_DIR}/web_msgs
)

### Generating Services

### Generating Module File
_generate_module_py(web_msgs
  ${CATKIN_DEVEL_PREFIX}/${genpy_INSTALL_DIR}/web_msgs
  "${ALL_GEN_OUTPUT_FILES_py}"
)

add_custom_target(web_msgs_generate_messages_py
  DEPENDS ${ALL_GEN_OUTPUT_FILES_py}
)
add_dependencies(web_msgs_generate_messages web_msgs_generate_messages_py)

# add dependencies to all check dependencies targets
get_filename_component(_filename "/home/master/D2RSR/ROS-driving_control_system/catkin_ws/src/web_msgs/msg/velocity.msg" NAME_WE)
add_dependencies(web_msgs_generate_messages_py _web_msgs_generate_messages_check_deps_${_filename})
get_filename_component(_filename "/home/master/D2RSR/ROS-driving_control_system/catkin_ws/src/web_msgs/msg/web_transfer_pkg.msg" NAME_WE)
add_dependencies(web_msgs_generate_messages_py _web_msgs_generate_messages_check_deps_${_filename})

# target for backward compatibility
add_custom_target(web_msgs_genpy)
add_dependencies(web_msgs_genpy web_msgs_generate_messages_py)

# register target for catkin_package(EXPORTED_TARGETS)
list(APPEND ${PROJECT_NAME}_EXPORTED_TARGETS web_msgs_generate_messages_py)



if(gencpp_INSTALL_DIR AND EXISTS ${CATKIN_DEVEL_PREFIX}/${gencpp_INSTALL_DIR}/web_msgs)
  # install generated code
  install(
    DIRECTORY ${CATKIN_DEVEL_PREFIX}/${gencpp_INSTALL_DIR}/web_msgs
    DESTINATION ${gencpp_INSTALL_DIR}
  )
endif()
if(TARGET nav_msgs_generate_messages_cpp)
  add_dependencies(web_msgs_generate_messages_cpp nav_msgs_generate_messages_cpp)
endif()
if(TARGET std_msgs_generate_messages_cpp)
  add_dependencies(web_msgs_generate_messages_cpp std_msgs_generate_messages_cpp)
endif()
if(TARGET web_msgs_generate_messages_cpp)
  add_dependencies(web_msgs_generate_messages_cpp web_msgs_generate_messages_cpp)
endif()

if(geneus_INSTALL_DIR AND EXISTS ${CATKIN_DEVEL_PREFIX}/${geneus_INSTALL_DIR}/web_msgs)
  # install generated code
  install(
    DIRECTORY ${CATKIN_DEVEL_PREFIX}/${geneus_INSTALL_DIR}/web_msgs
    DESTINATION ${geneus_INSTALL_DIR}
  )
endif()
if(TARGET nav_msgs_generate_messages_eus)
  add_dependencies(web_msgs_generate_messages_eus nav_msgs_generate_messages_eus)
endif()
if(TARGET std_msgs_generate_messages_eus)
  add_dependencies(web_msgs_generate_messages_eus std_msgs_generate_messages_eus)
endif()
if(TARGET web_msgs_generate_messages_eus)
  add_dependencies(web_msgs_generate_messages_eus web_msgs_generate_messages_eus)
endif()

if(genlisp_INSTALL_DIR AND EXISTS ${CATKIN_DEVEL_PREFIX}/${genlisp_INSTALL_DIR}/web_msgs)
  # install generated code
  install(
    DIRECTORY ${CATKIN_DEVEL_PREFIX}/${genlisp_INSTALL_DIR}/web_msgs
    DESTINATION ${genlisp_INSTALL_DIR}
  )
endif()
if(TARGET nav_msgs_generate_messages_lisp)
  add_dependencies(web_msgs_generate_messages_lisp nav_msgs_generate_messages_lisp)
endif()
if(TARGET std_msgs_generate_messages_lisp)
  add_dependencies(web_msgs_generate_messages_lisp std_msgs_generate_messages_lisp)
endif()
if(TARGET web_msgs_generate_messages_lisp)
  add_dependencies(web_msgs_generate_messages_lisp web_msgs_generate_messages_lisp)
endif()

if(gennodejs_INSTALL_DIR AND EXISTS ${CATKIN_DEVEL_PREFIX}/${gennodejs_INSTALL_DIR}/web_msgs)
  # install generated code
  install(
    DIRECTORY ${CATKIN_DEVEL_PREFIX}/${gennodejs_INSTALL_DIR}/web_msgs
    DESTINATION ${gennodejs_INSTALL_DIR}
  )
endif()
if(TARGET nav_msgs_generate_messages_nodejs)
  add_dependencies(web_msgs_generate_messages_nodejs nav_msgs_generate_messages_nodejs)
endif()
if(TARGET std_msgs_generate_messages_nodejs)
  add_dependencies(web_msgs_generate_messages_nodejs std_msgs_generate_messages_nodejs)
endif()
if(TARGET web_msgs_generate_messages_nodejs)
  add_dependencies(web_msgs_generate_messages_nodejs web_msgs_generate_messages_nodejs)
endif()

if(genpy_INSTALL_DIR AND EXISTS ${CATKIN_DEVEL_PREFIX}/${genpy_INSTALL_DIR}/web_msgs)
  install(CODE "execute_process(COMMAND \"/usr/bin/python2\" -m compileall \"${CATKIN_DEVEL_PREFIX}/${genpy_INSTALL_DIR}/web_msgs\")")
  # install generated code
  install(
    DIRECTORY ${CATKIN_DEVEL_PREFIX}/${genpy_INSTALL_DIR}/web_msgs
    DESTINATION ${genpy_INSTALL_DIR}
  )
endif()
if(TARGET nav_msgs_generate_messages_py)
  add_dependencies(web_msgs_generate_messages_py nav_msgs_generate_messages_py)
endif()
if(TARGET std_msgs_generate_messages_py)
  add_dependencies(web_msgs_generate_messages_py std_msgs_generate_messages_py)
endif()
if(TARGET web_msgs_generate_messages_py)
  add_dependencies(web_msgs_generate_messages_py web_msgs_generate_messages_py)
endif()
