#! /usr/bin/env python

import cv2
import rospy
from sensor_msgs.msg import Image
from cv_bridge import CvBridge

class ImageSubscriber:

    def __init__(self):
        self.bridge = CvBridge()

        # Create a subscriber to subscribe stitched_frame_topic
        self.sub = rospy.Subscriber('stitched_frame_topic', Image, self.callback)

    def callback(self, data):
        try:
            # Convert the Image message to an OpenCV image
            cv_image = self.bridge.imgmsg_to_cv2(data, "bgr8")
        except CvBridgeError as e:
            print(e)

        # show image
        cv2.imshow('Received Image', cv_image)
        cv2.waitKey(3)


def main():
    # Initialize ROS node
    rospy.init_node('stitched_frame_subscriber')

    # Create an instance of the ImageSubscriber class
    image_subscriber = ImageSubscriber()

    # Spin until program is terminated
    rospy.spin()

    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
