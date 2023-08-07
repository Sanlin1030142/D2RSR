#include <ros/ros.h>
#include <opencv2/opencv.hpp>
#include <cv_bridge/cv_bridge.h>
#include <sensor_msgs/Image.h>
#include <iostream>
#include <vector>

using namespace std;

std::vector<cv::Mat> frames(6);
cv::VideoWriter writer;


void frameCallback(const sensor_msgs::ImageConstPtr& msg, int index) {
  frames[index] = cv_bridge::toCvCopy(msg, "bgr8")->image;
}

cv::Mat Merge_frames() {
  // Ensure all frames have been received and have the same size
  for (size_t i = 0; i < frames.size(); ++i) {
    if (frames[i].empty() || frames[i].size() != frames[0].size()) {
      return cv::Mat(); // Return an empty Mat if frames are not consistent
    }
  }
  cv::Mat merged_frame;
  cv::hconcat(frames, merged_frame);
  return merged_frame;
}

int main(int argc, char** argv) {
  ros::init(argc, argv, "merged_frame");
  ros::NodeHandle nh;
  ros::Publisher pub = nh.advertise<sensor_msgs::Image>("merged_frame", 1);

  ros::Subscriber sub0 = nh.subscribe<sensor_msgs::Image>("/trace/camera_0", 1, boost::bind(frameCallback, _1, 0));
  ros::Subscriber sub1 = nh.subscribe<sensor_msgs::Image>("/trace/camera_1", 1, boost::bind(frameCallback, _1, 1));
  ros::Subscriber sub2 = nh.subscribe<sensor_msgs::Image>("/trace/camera_2", 1, boost::bind(frameCallback, _1, 2));
  ros::Subscriber sub3 = nh.subscribe<sensor_msgs::Image>("/trace/camera_3", 1, boost::bind(frameCallback, _1, 3));
  ros::Subscriber sub4 = nh.subscribe<sensor_msgs::Image>("/trace/camera_4", 1, boost::bind(frameCallback, _1, 4));
  ros::Subscriber sub5 = nh.subscribe<sensor_msgs::Image>("/trace/camera_5", 1, boost::bind(frameCallback, _1, 5));

  // Initialize the VideoWriter - Replace the dimensions with your merged frame dimensions
  writer.open("/home/ros/D2RSR_panel/html/video/output.mp4", cv::VideoWriter::fourcc('m', 'p', '4', 'v'), 40.0, cv::Size(1760, 288));

  if (!writer.isOpened())
  {
    std::cout << "Error! Video writer not opened." << std::endl;
    return -1;
  }

  ros::Rate loop_rate(40);

  while (ros::ok()) {
    ros::spinOnce();
    cv::Mat merged_frame_cv = Merge_frames();
    if (!merged_frame_cv.empty()) {
      // Publish merged frame
      sensor_msgs::ImagePtr msg = cv_bridge::CvImage(std_msgs::Header(), "bgr8", merged_frame_cv).toImageMsg();
      pub.publish(msg);

      // Write the merged frame to video file
      writer.write(merged_frame_cv);
    }

    loop_rate.sleep();
  }

  // Release the VideoWriter
  writer.release();

  return 0;
}
