import rospy
import numpy as np
import zlib
from sensor_msgs.msg import CompressedImage

def talker():

    rospy.init_node('compressed_array_talker', anonymous=True)

    pub = rospy.Publisher('/compressed_array', CompressedImage, queue_size=10)

    rate = rospy.Rate(10)

    while not rospy.is_shutdown():

        array = np.random.random(36).astype(np.float32)

        array_bytes = array.tobytes()

        compressed_array = zlib.compress(array_bytes)

        msg = CompressedImage()
        msg.header.stamp = rospy.Time.now()
        msg.format = "compressed"
        msg.data = np.frombuffer(compressed_array, dtype=np.uint8).tolist()
 
        pub.publish(msg)

        rate.sleep()

if __name__ == '__main__':
    try:
        talker()
    except rospy.ROSInterruptException:
        pass
