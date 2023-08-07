#! /usr/bin/env python

import rospy
import math
from std_msgs.msg import Float32MultiArray
from geometry_msgs.msg import Twist

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

    calculate_cmd_vel(vector)
    del vector[:]

def calculate_cmd_vel(points):

    for i in range(len(points) - 1):
        start_point = points[i]
        end_point = points[i+1]

        # 計算向量
        vector_x = end_point[0] - start_point[0]
        vector_y = end_point[1] - start_point[1]

        # 計算方向角度
        angle = math.atan2(vector_y, vector_x)

        # 填充cmd_vel消息用於旋轉
        move = Twist()
        move.angular.z = angle * angular_speed # 需要考慮當前方向

        # 填充cmd_vel消息用於直線移動
        linear_cmd_vel = Twist()
        move.linear.x = linear_speed


if __name__ == '__main__':
  rospy.init_node('vector_subscriber', anonymous=True)
  rospy.Subscriber("/vector", Float32MultiArray, vector_callback)
  
      
  rospy.spin()