#include <ros/ros.h>
#include <tf/transform_listener.h>
#include <std_msgs/String.h>
#include <geometry_msgs/PoseStamped.h>

class SetGoal {
public:
    SetGoal() {
        goal_update_sub = nh.subscribe("/goal_update", 10, &SetGoal::goalUpdateCallback, this);
        get_goal_sub = nh.subscribe("/get_goal", 10, &SetGoal::getGoalCallback, this);
        goal_pub = nh.advertise<geometry_msgs::PoseStamped>("/move_base_simple/goal", 10);
    }

    void goalUpdateCallback(const std_msgs::String::ConstPtr& msg) {
        if (msg->data == "set") {
            try {
                ROS_INFO("Setting goal...");
                tf_listener.waitForTransform("/map", "/base_link", ros::Time(0), ros::Duration(3.0));
                tf_listener.lookupTransform("/map", "/base_link", ros::Time(0), current_transform);
            } catch (tf::TransformException &ex) {
                ROS_ERROR("%s", ex.what());
                ros::Duration(1.0).sleep();
            }
        }
    }

    void getGoalCallback(const std_msgs::String::ConstPtr& msg) {
        if (msg->data == "get") {
            ROS_INFO("Sending goal...");
            geometry_msgs::PoseStamped goal;
            goal.header.frame_id = "map";
            goal.header.stamp = ros::Time::now();
            goal.pose.position.x = current_transform.getOrigin().x();
            goal.pose.position.y = current_transform.getOrigin().y();
            goal.pose.position.z = current_transform.getOrigin().z();
            goal.pose.orientation.x = current_transform.getRotation().x();
            goal.pose.orientation.y = current_transform.getRotation().y();
            goal.pose.orientation.z = current_transform.getRotation().z();
            goal.pose.orientation.w = current_transform.getRotation().w();

            goal_pub.publish(goal);
        }
    }

private:
    ros::NodeHandle nh;
    ros::Subscriber goal_update_sub, get_goal_sub;
    ros::Publisher goal_pub;
    tf::TransformListener tf_listener;  // 使用對象而非指針
    tf::StampedTransform current_transform;
};

int main(int argc, char** argv) {
    ros::init(argc, argv, "set_goal");
    SetGoal set_goal;
    ros::spin();
    return 0;
}
