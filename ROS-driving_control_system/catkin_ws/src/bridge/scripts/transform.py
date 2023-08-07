#! /usr/bin/env python

import rospy
import math
from std_msgs.msg import Float32MultiArray
from geometry_msgs.msg import Twist

# Get the publisher to the appropriate topic
pub = rospy.Publisher('/rosky01/cmd_vel', Twist, queue_size=1 )

def vector_callback(data):
    data_str = str(data.data)
    # print(data_str)
    split(data_str)
    
def split(data_str):
    # define a method can get date_str and split it 
    # print all float with line enter
    
    data_str = data_str.replace('(', '')
    data_str = data_str.replace(')', '')
    # split it by ','
    data_str = data_str.split(',')
    
    list = []
        
    for i in range(0, len(data_str), 2):
        list.append([])
        x = float(data_str[i])
        y = float(data_str[i + 1])
        list[i//2].append(x)
        list[i//2].append(y)

    vector = [] 
    for i in range( 1, len(list)):
        vector.append([])
        vector[i-1].append(list[i][0] - list[i-1][0])
        vector[i-1].append(list[i][1] - list[i-1][1])

    move_robot(vector)
    del vector[:]

def move_robot(vectors):
    '''
    !!! first, we have to rotate the robot to face the direction of the vector !!! 
    '''
    last_index = 0 
    for i in range(len(vectors)):
        
        if i > 0:
            '''
            Calculate the angle using atan2
            atan2 will find the angle between the x axis and 'a vector
            find the angle between the last vector and the current vector
            !!! have to calculate the angular speed by the vector's angle !!!
            '''
            angle = ( math.atan2(vectors[i][1] - vectors[last_index][1], vectors[i][0]) - vectors[last_index][0] ) * 3
            # store the current angle for the next iteration
            last_index = i
            
        else:
            # == 0 
            angle = 0
            last_index = 0
    
        # Create a Twist message for rotation
        rotate_cmd = Twist()
        
        # Assuming the robot is now facing the right direction, 
        # we'll move it forward along the x axis
        '''
        !!! have to calculate the linear speed by the vector's length !!!
        !!! but we also have to consider the minimum speed of ROSKY !!!
        '''
        distance = ( math.sqrt(vectors[i][1]**2 + vectors[i][0]**2) ) / 2

        rotate_cmd.linear.x = distance

        rotate_cmd.angular.z = angle

        # Publish the rotate command
        pub.publish(rotate_cmd)
        
        # distance = ( math.sqrt(vectors[i][1]**2 + vectors[i][0]**2) ) / 2
        # move_cmd = Twist()
        # move_cmd.linear.x = distance
        
        # Publish the move command
        # pub.publish(move_cmd)
        
        '''
        !!! we want to publish rotate and linear at the same time, or we can just publish at once ? !!!
        '''
        
        print( i )
        rospy.sleep(0.5)
        
    final_cmd = Twist()
    final_cmd.linear.x = 0
    final_cmd.angular.z = 0
    


rospy.init_node('vector_subscriber', anonymous=True)

rospy.Subscriber("/vector", Float32MultiArray, vector_callback)

def main():
    rospy.spin()

if __name__ == '__main__':
    main()
