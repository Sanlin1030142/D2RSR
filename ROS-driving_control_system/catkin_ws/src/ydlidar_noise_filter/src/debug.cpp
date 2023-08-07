#include <ros/ros.h>
#include <sensor_msgs/LaserScan.h>
#include <string.h>
#include <fstream>
#include <iostream>

using namespace std;


void scanCallback(const sensor_msgs::LaserScan::ConstPtr& scan) {
    static fstream file("/home/ros/Multi_car_mapping/catkin_ws/src/ydlidar_noise_filter/origin.csv_2", ios::out);
    static int counter = 0;
    counter ++ ;
    file << counter;
    for (int i = 0 ; i < 720 ; i++) {
        file << ", " << scan->ranges[i];
    }

    file << endl;
}

void scanCallback_2(const sensor_msgs::LaserScan::ConstPtr& scan) {
    static fstream file("/home/ros/Multi_car_mapping/catkin_ws/src/ydlidar_noise_filter/filter(neighboring_only)_2.csv", ios::out);
    static int counter = 0;
    counter ++ ;
    file << counter;
    for (int i = 0 ; i < 720 ; i++) {
        file << ", " << scan->ranges[i];
    }

    file << endl;
}

void scanCallback_3(const sensor_msgs::LaserScan::ConstPtr& scan) {
    static fstream file("/home/ros/Multi_car_mapping/catkin_ws/src/ydlidar_noise_filter/filter.csv_2", ios::out);
    static int counter = 0;
    counter ++ ;
    file << counter;
    for (int i = 0 ; i < 720 ; i++) {
        file << ", " << scan->ranges[i];
    }

    file << endl;
}

int main(int argc, char** argv) {
    ros::init(argc, argv, "noise_filter_debug");
    ros::NodeHandle node_handle;
    ros::Subscriber sub, sub2, sub3;
    sub = node_handle.subscribe<sensor_msgs::LaserScan>("/scan", 1, scanCallback);
    sub2 = node_handle.subscribe<sensor_msgs::LaserScan>("/scan/noise_filter_neighboring_only", 1, scanCallback_2);
    sub3 = node_handle.subscribe<sensor_msgs::LaserScan>("/scan/noise_filter", 1, scanCallback_3);
    ros::spin();
    return 0;
}