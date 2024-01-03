#!/usr/bin/env python

import rospy
import tf

if __name__ == '__main__':
    rospy.init_node('robot_position_listener')

    listener = tf.TransformListener()

    rate = rospy.Rate(10.0)
    while not rospy.is_shutdown():
        try:
            (trans, rot) = listener.lookupTransform('/map', '/base_link', rospy.Time(0))
            rospy.loginfo("Robot Position : x=%f, y=%f, z=%f" % (trans[0], trans[1], trans[2]))
        except (tf.LookupException, tf.ConnectivityException, tf.ExtrapolationException):
            continue

        rate.sleep()
