#include <ros/ros.h>
#include <opencv2/opencv.hpp>
#include <cv_bridge/cv_bridge.h>
#include <sensor_msgs/Image.h>
#include <iostream>
#include <sstream>
#include <string>
#include <cmath>

using namespace std;

string video_device;
string input_topic;

void initUndistortMaps(const cv::Mat &K, const cv::Mat &D, cv::Mat &map1, cv::Mat &map2, cv::Size size) {
  cv::fisheye::initUndistortRectifyMap(K, D, cv::Mat::eye(3, 3, CV_64F), K, size, CV_16SC2, map1, map2);
}

void undistortFrame(const cv::Mat &frame, const cv::Mat &map1, const cv::Mat &map2, cv::Mat &undistorted_frame) {
  cv::remap(frame, undistorted_frame, map1, map2, cv::INTER_LINEAR, cv::BORDER_CONSTANT);
}

cv::Mat fisheye_to_equirectangular(const cv::Mat& inputImage, int width_out, int height_out) {
    int width = inputImage.cols;
    int height = inputImage.rows;

    // 創建輸出影像
    cv::Mat outputImage(height, width, inputImage.type());

    // 定義投影的參數
    double fovY = M_PI; // 垂直視野，例如180度
    double fovX = 2 * M_PI; // 水平視野，例如360度

    // 創建映射矩陣
    cv::Mat map_x = cv::Mat::zeros(height, width, CV_32FC1);
    cv::Mat map_y = cv::Mat::zeros(height, width, CV_32FC1);

    // 計算映射
    for (int y = 0; y < height; y++) {
        for (int x = 0; x < width; x++) {
            // 計算等距柱投影的坐標
            double theta = (double(x) / width - 0.5) * fovX;
            double phi = (0.5 - double(y) / height) * fovY;

            // 計算源影像的坐標
            float srcX = (theta / fovX + 0.5) * width;
            float srcY = (0.5 - phi / fovY) * height;

            // 存儲映射
            map_x.at<float>(y, x) = srcX;
            map_y.at<float>(y, x) = srcY;
        }
    }

    // 應用映射
    cv::remap(inputImage, outputImage, map_x, map_y, cv::INTER_LINEAR, cv::BORDER_CONSTANT);
    return outputImage;
}

int main(int argc, char** argv) {
  // Initialize ROS
  // make a callback function for the subscriber
  ros::init(argc, argv, "video_adjust");
  ros::NodeHandle nh;
  ros::NodeHandle nh_private("~");
  
  // Get parameters from launch file
  // this param is for the input topic
  nh_private.param<string>("video_device", video_device, "camera_0");
  // // this param is for the output topic
  // nh_private.param<string>("input_topic", input_topic, "/trace0");
  // this param get the data 

  // Create a publisher object 

  string output_topic = "/trace/" + video_device ;
  ros::Publisher pub = nh.advertise<sensor_msgs::Image>(output_topic, 1);

  // get the video from url
  std::string url = "http://192.168.0.48:8080/stream?topic=" + video_device ;
  cv::VideoCapture cap(url);

  // check if the video is opened
  if (!cap.isOpened()) {
    std::cerr << "Error: Could not open stream!" << std::endl;
    return -1;
  }

  // find the high and width of the video
  cv::Mat frame;
  cv::Size frame_size;
  int width_size;
  int height_size;

  // Read the first frame to get the size
  if (cap.read(frame)) {
    frame_size = frame.size();
    width_size = frame.cols;
    height_size = frame.rows;
  } else {
    std::cerr << "Error: Could not read the initial frame!" << std::endl;
    return -1;
  }

  // Define matrices for mapping
  cv::Mat map1_0, map2_0 ;

  if ( video_device == "camera_0" )
    initUndistortMaps((cv::Mat_<double>(3, 3) << 168.19216897420833, 0.0, 176.04973217028822, 0.0, 181.9350229894558, 161.4269293849933, 0.0, 0.0, 1.0), (cv::Mat_<double>(4, 1) << 0.06782275086416847, -0.06258975750579947, 0.09512631911423383, -0.06275513295938873), map1_0, map2_0, cv::Size(frame.cols, frame.rows));
  else if ( video_device == "camera_1" )
    initUndistortMaps((cv::Mat_<double>(3, 3) << 214.5391713842507, 0.0, 178.23253483074944, 0.0, 231.53126123588154, 153.22620329020256, 0.0, 0.0, 1.0), (cv::Mat_<double>(4, 1) << -0.10513968785733593, -0.03353485522851365, 0.15827780593419993, -0.15857085787437566), map1_0, map2_0, cv::Size(frame.cols, frame.rows));
  else if ( video_device == "camera_2" )
    initUndistortMaps((cv::Mat_<double>(3, 3) << 189.60081739071146, 0.0, 188.53516052876736, 0.0, 204.96170008133225, 157.0968034779354, 0.0, 0.0, 1.0), (cv::Mat_<double>(4, 1) << -0.008674362616852985, -0.04668514407852883, 0.07039130740621466, -0.042250907300091456), map1_0, map2_0, cv::Size(frame.cols, frame.rows));
  else if ( video_device == "camera_3" )
    initUndistortMaps((cv::Mat_<double>(3, 3) << 164.5787573465405, 0.0, 178.48427673727969, 0.0, 178.07969980137977, 171.39089365082057, 0.0, 0.0, 1.0), (cv::Mat_<double>(4, 1) << 0.06360336362778317, -0.003603393672077915, 3.024971328101932e-05, -0.009886993964494656), map1_0, map2_0, cv::Size(frame.cols, frame.rows));
  else if ( video_device == "camera_4" )
    initUndistortMaps((cv::Mat_<double>(3, 3) << 198.18588883433972, 0.0, 170.77584005294972, 0.0, 213.92018375648396, 176.14082863542012, 0.0, 0.0, 1.0), (cv::Mat_<double>(4, 1) << -0.06513826860815179, 0.08309874511329655, -0.12285179073943621, 0.05565258011210733), map1_0, map2_0, cv::Size(frame.cols, frame.rows));
  else if ( video_device == "camera_5" )
    initUndistortMaps((cv::Mat_<double>(3, 3) << 197.75428715003994, 0.0, 182.59775061229732, 0.0, 215.07031467827278, 173.07574286730647, 0.0, 0.0, 1.0), (cv::Mat_<double>(4, 1) << -0.044297851227703466, 0.04471044140646071, -0.07818255431351712, 0.04237777000076718), map1_0, map2_0, cv::Size(frame.cols, frame.rows));
    

  ros::Rate loop_rate(40);
  while (ros::ok()) {
    cv::Mat final_frame;
    cv::Mat und_frame;

    // read now frame
    if (!cap.read(frame)) {
      std::cerr << "Error: Could not read frame!" << std::endl;
      break;
    }

    // remap the frame
    undistortFrame(frame, map1_0, map2_0, und_frame);

    // convert the frame to equirectangular
    // final_frame = fisheye_to_equirectangular(und_frame, width_size, height_size);

    sensor_msgs::ImagePtr traced = cv_bridge::CvImage(std_msgs::Header(), "bgr8", und_frame).toImageMsg();
    pub.publish(traced);

    if (cv::waitKey(1) == 'q') {
      break;
    }

    loop_rate.sleep();
  }
  

  
}