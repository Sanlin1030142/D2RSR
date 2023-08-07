
// this code is been banned
#include <opencv2/opencv.hpp>
#include <cv_bridge/cv_bridge.h>
#include <iostream>
#include <ros/ros.h>
#include <sensor_msgs/Image.h>

void initUndistortMaps(const cv::Mat &K, const cv::Mat &D, cv::Mat &map1, cv::Mat &map2, cv::Size size) {
  cv::fisheye::initUndistortRectifyMap(K, D, cv::Mat::eye(3, 3, CV_64F), K, size, CV_16SC2, map1, map2);
}

void undistortFrame(const cv::Mat &frame, const cv::Mat &map1, const cv::Mat &map2, cv::Mat &undistorted_frame) {
  cv::remap(frame, undistorted_frame, map1, map2, cv::INTER_LINEAR, cv::BORDER_CONSTANT);
}

int main(int argc, char **argv) {
  ros::init(argc, argv, "stitched_frame");
  ros::NodeHandle nh;
  ros::Publisher pub = nh.advertise<sensor_msgs::Image>("calibration_frame", 1);

  std::string url = "http://192.168.0.48:8080/stream?topic=merged_frame_topic";
  cv::VideoCapture cap(url);
  if (!cap.isOpened()) {
    std::cerr << "Error: Could not open stream!" << std::endl;
    return -1;
  }

  cv::Mat frame;
  cap.read(frame);
  cv::Size frame_size = frame.size();
  int width_quarter = frame.cols / 4;

  // Define matrices for mapping
  cv::Mat map1_0, map2_0, map1_1, map2_1, map1_2, map2_2, map1_3, map2_3;

  // Initialize the mappings
  initUndistortMaps((cv::Mat_<double>(3, 3) << 339.94983668649667, 0.0, 313.51323774033034, 0.0, 338.559255378892, 265.57752144550284, 0.0, 0.0, 1.0), (cv::Mat_<double>(4, 1) << -0.022562697866270857, 0.019841725844171796, -0.026474489579166156, 0.0030526227815419705), map1_0, map2_0, cv::Size(width_quarter, frame.rows));
  initUndistortMaps((cv::Mat_<double>(3, 3) << 332.5703157467705, 0.0, 341.3216370399803, 0.0, 331.84942133892974, 263.4052184779787, 0.0, 0.0, 1.0), (cv::Mat_<double>(4, 1) << -0.054961170187674324, -0.0565393452164267, 0.19172051729916142, -0.17426705462470113), map1_1, map2_1, cv::Size(width_quarter, frame.rows));
  initUndistortMaps((cv::Mat_<double>(3, 3) << 332.5703157467705, 0.0, 341.3216370399803, 0.0, 331.84942133892974, 263.4052184779787, 0.0, 0.0, 1.0), (cv::Mat_<double>(4, 1) << 0.008592389750170699, -0.06235816508905597, 0.10565927984893587, -0.0694359881012726), map1_2, map2_2, cv::Size(width_quarter, frame.rows));
  initUndistortMaps((cv::Mat_<double>(3, 3) << 377.1016511294628, 0.0, 323.1222883033018, 0.0, 375.52668465664055, 286.8078674299489, 0.0, 0.0, 1.0), (cv::Mat_<double>(4, 1) << -0.04112120133009539, -0.07124785006697013, 0.13000353909917411, -0.0908903114922694), map1_3, map2_3, cv::Size(width_quarter, frame.rows));

  ros::Rate loop_rate(24);
  while (ros::ok()) {
    if (!cap.read(frame)) {
      std::cerr << "Error: Could not read frame!" << std::endl;
      break;
    }

    cv::Mat sub_frames[4], undistorted_frames[4];

    for (int i = 0; i < 4; i++) {
      sub_frames[i] = frame(cv::Rect(i * width_quarter, 0, width_quarter, frame.rows));
    }

    undistortFrame(sub_frames[0], map1_0, map2_0, undistorted_frames[0]);
    undistortFrame(sub_frames[1], map1_1, map2_1, undistorted_frames[1]);
    undistortFrame(sub_frames[2], map1_2, map2_2, undistorted_frames[2]);
    undistortFrame(sub_frames[3], map1_3, map2_3, undistorted_frames[3]);

    cv::Mat final_frame;
    cv::hconcat(undistorted_frames, 4, final_frame);

    sensor_msgs::ImagePtr merged_frame_msg = cv_bridge::CvImage(std_msgs::Header(), "bgr8", final_frame).toImageMsg();
    pub.publish(merged_frame_msg);

    if (cv::waitKey(1) == 'q') {
      break;
    }

    loop_rate.sleep();
  }

  return 0;
}
