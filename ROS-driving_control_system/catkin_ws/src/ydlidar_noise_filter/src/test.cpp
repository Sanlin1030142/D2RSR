#include <ros/ros.h>
#include <opencv2/opencv.hpp>
#include <cv_bridge/cv_bridge.h>
#include <sensor_msgs/Image.h>
#include <iostream>
#include <sstream>

using namespace std;

#define rate 30
#define desired_width 352
#define desired_height 288

string video_device;

int main(int argc, char** argv) {
  ros::init(argc, argv, "merged_frame_publisher");
  ros::NodeHandle nh("~");
  
  ros::Publisher pub = nh.advertise<sensor_msgs::Image>("", 0);

  nh.param<string>("video_sequence", video_device, "/dev/video0");



  cv::VideoCapture cap = cv::VideoCapture(video_device);

  cap.set(cv::CAP_PROP_FRAME_WIDTH, desired_width);
  cap.set(cv::CAP_PROP_FRAME_HEIGHT, desired_height);

  cv::Mat frame;

  if (!cap.read(frame)) {
    ROS_ERROR(string("Failed to read frame from " + video_device).c_str());
    return -1;
  }

  ros::Rate loop_rate(rate);
  while (ros::ok()) {
    sensor_msgs::ImagePtr merged_frame_msg = cv_bridge::CvImage(std_msgs::Header(), "bgr8", frame).toImageMsg();
    pub.publish(merged_frame_msg);
    loop_rate.sleep();
  }

  cap.release();

  return 0;
}