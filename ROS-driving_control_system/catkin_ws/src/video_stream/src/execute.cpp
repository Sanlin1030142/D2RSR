#include <ros/ros.h>
#include <std_msgs/String.h>
#include <cstdlib> // for system() function
#include <signal.h>
#include <sys/types.h>
#include <sys/wait.h>

pid_t current_process_pid = -1;

void commandCallback(const std_msgs::String::ConstPtr& msg)
{
    ROS_INFO("Received command: %s", msg->data.c_str());

    // 如果收到的命令是 "stop"
    if (msg->data == "stop" && current_process_pid != -1)
    {
        ROS_INFO("Stopping current process.");
        kill(current_process_pid, SIGTERM);
        waitpid(current_process_pid, NULL, 0); // 等待子進程終止
        current_process_pid = -1;
        return;
    }

    // 如果沒有進程正在運行，則執行新命令
    if (current_process_pid == -1)
    {
        pid_t pid = fork();

        if (pid == 0) // 子進程
        {
            system(msg->data.c_str());
            exit(0);
        }
        else if (pid > 0) // 主進程
        {
            current_process_pid = pid;
        }
        else
        {
            ROS_ERROR("Fork failed.");
        }
    }
    else
    {
        ROS_INFO("Command ignored as another process is running.");
    }
}

int main(int argc, char **argv)
{
    ros::init(argc, argv, "command_listener");
    ros::NodeHandle n;

    ros::Subscriber sub = n.subscribe("command", 1000, commandCallback);
    ros::spin();

    return 0;
}
