#include <geometry_msgs/Twist.h>
#include <nav_msgs/OccupancyGrid.h>
#include <ros/ros.h>
#include <sensor_msgs/LaserScan.h>
#include <std_msgs/Header.h>
#include <std_msgs/Int16MultiArray.h>

#include <algorithm>
#include <iterator>
#include <vector>

#include "web_msgs/web_transfer_pkg.h"

using namespace std;

ros::NodeHandle* nh;

enum Position {
    top,
    top_R,
    top_L,
    bottom,
    bottom_R,
    bottom_L,
    top_slow,
    bottom_slow
};

class Parameters {
   public:
    Parameters() {
        nh->param<int>("publish_rate", publish_rate, 5);
    }

    int publish_rate;
};

class Basic_subscriber {
   public:
    ros::Subscriber subscriber;
};

class Original_lidar_signal : public Basic_subscriber {
   public:
    vector<float> array;

    Original_lidar_signal() {
        subscriber = nh->subscribe<sensor_msgs::LaserScan>("scan", 1, &Original_lidar_signal::store_message, this);
    }

    void store_message(const sensor_msgs::LaserScan::ConstPtr& scan) {
        array.clear();
        if (scan->ranges.size() == 360) {
            array.assign(scan->ranges.begin(), scan->ranges.end());
        } else if (scan->ranges.size() == 720) {
            for (int i = 0; i < 720; i += 2) {
                array.push_back((scan->ranges[i] + scan->ranges[i + 1]) / 2);
            }
        } else {
            ROS_ERROR("unsupported lidar information");
        }
    }

    void get(vector<float>& out) {
        out.assign(array.begin(), array.end());
        reverse(out.begin(), out.end());
    }
};

class Filtered_lidar_signal : public Original_lidar_signal {
   public:
    Filtered_lidar_signal() {
        subscriber = nh->subscribe<sensor_msgs::LaserScan>("scan/noise_filter", 1, &Filtered_lidar_signal::store_message, this);
    }

    void store_message(const sensor_msgs::LaserScan::ConstPtr& scan) {
        array.clear();
        if (scan->ranges.size() == 360) {
            array.assign(scan->ranges.begin(), scan->ranges.end());
        } else if (scan->ranges.size() == 720) {
            for (int i = 0; i < 720; i += 2) {
                array.push_back((scan->ranges[i] + scan->ranges[i + 1]) / 2);
            }
        } else {
            ROS_ERROR("unsupported lidar information");
        }
    }
};

class Joy_signal : public Basic_subscriber {
   public:
    float x, y;
    double max_x, max_y;

    Joy_signal() {
        subscriber = nh->subscribe<geometry_msgs::Twist>("cmd_vel", 1, &Joy_signal::store_message, this);
        nh->param<double>("velocity", max_x, 0.11);
        nh->param<double>("rotational", max_y, 0.45);
    }

    void store_message(const geometry_msgs::Twist::ConstPtr& msg) {
        x = msg->linear.x;
        y = msg->angular.z;  // 反正本來就是二維的，我就喜歡這樣寫，不然你改阿
    }

    void get(float& x, float& y) {
        x = this->x / max_x;
        y = this->y / max_y;
    }
};

class Collision_signal : public Basic_subscriber {
   public:
    vector<int> array;

    Collision_signal() {
        subscriber = nh->subscribe<std_msgs::Int16MultiArray>("collision", 1, &Collision_signal::store_message, this);
    }

    void store_message(const std_msgs::Int16MultiArray::ConstPtr& msg) {
        array.assign(msg->data.begin(), msg->data.end());
    }

    void get(vector<string>& out) {
        if (array.size() != 8) {
            return;
        }

        for (auto position : positions) {
            out.push_back(array[position] == 1 ? "normal" : "stop");
        }

        if (array[top_slow] == 0 && array[top] == 1) {
            out[0] = "slow";
        }

        if (array[bottom_slow] == 0 && array[bottom] == 1) {
            out[1] = "slow";
        }
    }

   private:
    vector<int> positions = {top, bottom, top_R, bottom_R, bottom_L, top_L};
};

class Map : public Basic_subscriber {
    private:
    nav_msgs::OccupancyGrid record;
   public:
    Map() {
        subscriber = nh->subscribe<nav_msgs::OccupancyGrid>("map", 1, &Map::store_message, this);
    }

    void store_message(const nav_msgs::OccupancyGrid::ConstPtr& msg) {
        record = *msg;
    }

    void get(nav_msgs::OccupancyGrid& map) {
        map = record;
    }
};

class Collector {
   private:
    Original_lidar_signal original_lidar_signal;
    Filtered_lidar_signal filtered_lidar_signal;
    Joy_signal joy_signal;
    Collision_signal collision_signal;
    Map map;
    ros::Publisher pub;

   public:
    Collector() {
        pub = nh->advertise<web_msgs::web_transfer_pkg>("web/info", 1);
    }

    void publish(const std_msgs::Header& header) {
        web_msgs::web_transfer_pkg pkg;
        pkg.header = header;
        original_lidar_signal.get(pkg.original_lidar_signal);
        filtered_lidar_signal.get(pkg.filtered_lidar_signal);
        joy_signal.get(pkg.velocity.x, pkg.velocity.y);
        collision_signal.get(pkg.collision);
        map.get(pkg.map);
        pub.publish(pkg);
    }
};

int main(int argc, char** argv) {
    ros::init(argc, argv, "collector");
    nh = new ros::NodeHandle();
    Parameters parameters;
    ros::Rate loop_rate(parameters.publish_rate);
    Collector collector;
    std_msgs::Header header;
    header.frame_id = "frame";
    header.seq = 1;
    while (ros::ok()) {
        ros::spinOnce();
        header.stamp = ros::Time::now();
        collector.publish(header);
        loop_rate.sleep();
    }
}