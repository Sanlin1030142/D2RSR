// this code is been banned
#include <opencv2/opencv.hpp>
#include <iostream>

int main() {
  // 固定的URL
  std::string url = "http://192.168.0.48:8080/stream?topic=stitched_frame_topic";

  // 嘗試打開視頻流
  cv::VideoCapture cap(url);
  if(!cap.isOpened()) {
    std::cerr << "Error: Could not open stream!" << std::endl;
    return -1;
  }

  cv::namedWindow("Video Stream", cv::WINDOW_NORMAL);

  cv::Mat frame;
  while(true) {
    // 讀取一幀
    if(!cap.read(frame)) {
      std::cerr << "Error: Could not read frame!" << std::endl;
      break;
    }

    // 顯示幀
    cv::imshow("Video Stream", frame);

    // 按下'q'退出
    if(cv::waitKey(1) == 'q') {
      break;
    }
  }

  return 0;
}
