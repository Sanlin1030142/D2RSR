
#include <cv_bridge/cv_bridge.h>
#include <ros/ros.h>
#include <sensor_msgs/Image.h>

#include <iostream>
#include <opencv2/core.hpp>
#include <opencv2/highgui.hpp>
#include <opencv2/imgproc.hpp>
#include <opencv2/opencv.hpp>
#include <opencv2/photo.hpp>
#include <vector>

using namespace std;
using namespace cv;

std::vector<cv::Mat> frames(6);

void frameCallback(const sensor_msgs::ImageConstPtr& msg, int index) {
    // cout << index << endl;
    frames[index] = cv_bridge::toCvCopy(msg, "bgr8")->image;
}

int main(int argc, char** argv) {
    // Read the images, assuming images to be of same size

    ros::init(argc, argv, "fixed_frame");
    ros::NodeHandle nh("~");
    ros::Publisher pub = nh.advertise<sensor_msgs::Image>("fixed_frame", 1);

    ros::Subscriber sub0 = nh.subscribe<sensor_msgs::Image>("/trace/camera_0", 1, boost::bind(frameCallback, _1, 0));
    ros::Subscriber sub1 = nh.subscribe<sensor_msgs::Image>("/trace/camera_1", 1, boost::bind(frameCallback, _1, 1));
    ros::Subscriber sub2 = nh.subscribe<sensor_msgs::Image>("/trace/camera_2", 1, boost::bind(frameCallback, _1, 2));
    ros::Subscriber sub3 = nh.subscribe<sensor_msgs::Image>("/trace/camera_3", 1, boost::bind(frameCallback, _1, 3));
    ros::Subscriber sub4 = nh.subscribe<sensor_msgs::Image>("/trace/camera_4", 1, boost::bind(frameCallback, _1, 4));
    ros::Subscriber sub5 = nh.subscribe<sensor_msgs::Image>("/trace/camera_5", 1, boost::bind(frameCallback, _1, 5));

    ros::Rate loop_rate(40);

    while (ros::ok()) {
        ros::spinOnce();

        if (frames[0].empty() || frames[1].empty()|| frames[2].empty()|| frames[3].empty()|| frames[4].empty()|| frames[5].empty()) {
            continue;
        }

        // Single frame size
        Mat panorama(288, 2700, frames[0].type(), cv::Scalar::all(0));
        // create a black image, that width = frame[0].width, height = frame[0].height
        Mat mask = Mat::zeros(frames[0].rows, frames[0].cols/20, CV_8UC3);

        panorama = frames[0](cv::Rect(0, 0, frames[0].cols , frames[0].rows));
        cv::hconcat(panorama, mask, panorama);
        cv::hconcat(panorama, frames[1], panorama);
        cv::hconcat(panorama, mask, panorama);
        cv::hconcat(panorama, frames[2], panorama);
        cv::hconcat(panorama, mask, panorama);
        cv::hconcat(panorama, frames[3], panorama);
        cv::hconcat(panorama, mask, panorama);
        cv::hconcat(panorama, frames[4], panorama);
        cv::hconcat(panorama, mask, panorama);
        cv::hconcat(panorama, frames[5], panorama);
        
        if (!panorama.empty()) {
            // Publish merged frame
            sensor_msgs::ImagePtr msg = cv_bridge::CvImage(std_msgs::Header(), "bgr8", panorama).toImageMsg();
            pub.publish(msg);
        }

        loop_rate.sleep();
    }

    return 0;
}