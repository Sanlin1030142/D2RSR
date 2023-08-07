#include <geometry_msgs/Twist.h>
#include <ros/ros.h>
#include <std_msgs/Header.h>
#include <std_msgs/Int16MultiArray.h>
#include <nav_msgs/OccupancyGrid.h>

#include <algorithm>
#include <iterator>
#include <vector>

using namespace std;

ros::NodeHandle* nh;

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

    ros::Publisher pub;
    Map map ;

   public:
    Collector() {
        pub = nh->advertise<nav_msgs::OccupancyGrid>("/screen_map", 1) ;
    }

    void publish(const std_msgs::Header& header) {
        nav_msgs::OccupancyGrid pkg;
        map.get( pkg ) ;
        pub.publish( pkg );
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