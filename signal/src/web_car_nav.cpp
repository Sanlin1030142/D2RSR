#include "ros/ros.h"                 // ROS 主要功能
#include "std_msgs/String.h"         // 用于接收字符串消息
#include <sys/types.h>               // 包含 pid_t 定义
#include <signal.h>                  // SIGTERM 信号的定义
#include <sys/wait.h>                // waitpid() 函数的定义
#include <unistd.h>                  // fork() 和 execlp() 函数的定义
#include <cstdlib>                   // exit() 函数的定义
#include <unistd.h>
#include <nav_msgs/OccupancyGrid.h>

pid_t nav_process_pid = -1;
ros::Publisher pub;

void createOccupancyGrid()
{
    int width = 1984;
    int height = 1984;
    int8_t value = 100;

    nav_msgs::OccupancyGrid grid;
    
    // 设置地图的大小
    grid.info.width = width;
    grid.info.height = height;

    // 设置地图的分辨率（你可能需要设置为适当的值，这里只是示例）
    grid.info.resolution = 0.05;  // 5cm per cell

    // 分配足够的空间并将所有值设置为-1
    grid.data.resize(width * height, value);


    pub.publish(grid);
    ros::spinOnce();  // 处理任何等待的回调函数
    ros::Rate rate(10);  // 10Hz
    rate.sleep();  // 等待足够的时间确保消息已被发送
}

void commandCallback(const std_msgs::String::ConstPtr& msg)
{
    ROS_INFO("Received command: %s", msg->data.c_str());

    if (msg->data == "start_nav" && nav_process_pid == -1)
    {
        // 收到開始還沒開
        ROS_INFO("Starting navigation process.");
        pid_t pid = fork();
        if (pid == 0) {
            execlp("roslaunch", "roslaunch", "rosky_navigation", "navigation.launch", "map:=kdMap.yaml", "ominibotcar:=true", "local_planner:=teb", (char *)NULL);
            ROS_ERROR("Failed to start navigation.");
            exit(EXIT_FAILURE);
        } else if (pid > 0) {
            nav_process_pid = pid;
        } else {
            ROS_ERROR("Fork failed to create new process.");
        }
    }
    else if (msg->data == "stop_nav" && nav_process_pid != -1)
    {
        // 收到關閉且已經開啟
        ROS_INFO("Stopping navigation process.");
        kill(nav_process_pid, SIGTERM);
        waitpid(nav_process_pid, NULL, 0);
        nav_process_pid = -1;
        createOccupancyGrid() ;
    }
    else
    {
        ROS_INFO("Command ignored: navigation.");
    }
}

int main(int argc, char **argv)
{
    ros::init(argc, argv, "nav_switch");
    ros::NodeHandle n;

    ros::Subscriber sub = n.subscribe("/nav_signal", 1000, commandCallback);
    pub = n.advertise<nav_msgs::OccupancyGrid>("/map", 1);
    ros::spin();

    return 0;
}
