#!/usr/bin/env python
import rospy
from std_msgs.msg import String


def callback(data):
    rospy.loginfo("get messege: %s", data.data)

def listener():
    rospy.init_node('listener', anonymous=True)


    rospy.Subscriber("/your_topic_name", String, callback)

    # loop waiting for callback
    rospy.spin()

if __name__ == '__main__':
    listener()
