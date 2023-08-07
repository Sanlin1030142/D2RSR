#include <ros/ros.h>
#include <sensor_msgs/LaserScan.h>

#include <vector>

class KalmanFilter {
   private:
    double estimate;  // The estimate of the range
    double error;     // The error of the estimate

   public:
    // Initialize the filter with an initial estimate and error
    KalmanFilter(double initial_estimate = 0, double initial_error = 1)
        : estimate(initial_estimate), error(initial_error) {}

    // The predict step of the Kalman filter
    void predict(double movement = 0, double movement_error = 0.5) {
        // Update the estimate and error based on the movement
        estimate += movement;
        error += movement_error;
    }

    // The update step of the Kalman filter
    void update(double measurement, double measurement_error = 0.1) {
        // Calculate the Kalman gain
        double gain = error / (error + measurement_error);

        // Update the estimate and error based on the measurement
        estimate = estimate + gain * (measurement - estimate);
        error = (1 - gain) * error;
    }

    // Get the current estimate
    double getEstimate() const {
        return estimate;
    }
};

class KalmanFilterNode {
   private:
    ros::NodeHandle nh;
    ros::Publisher pub;
    ros::Subscriber sub;
    std::vector<KalmanFilter> filters;

    void scanCallback(const sensor_msgs::LaserScan::ConstPtr& msg) {
        sensor_msgs::LaserScan filtered_scan = *msg;
        if (filters.size() != msg->ranges.size()) {
            filters.resize(msg->ranges.size());
        }
        for (size_t i = 0; i < msg->ranges.size(); ++i) {
            if (std::isinf(msg->ranges[i])) {
                // if the reading is infinity, we skip it
                continue;
            }
            filters[i].predict();
            filters[i].update(msg->ranges[i]);
            filtered_scan.ranges[i] = filters[i].getEstimate();
        }
        pub.publish(filtered_scan);
    }

   public:
    KalmanFilterNode() {
        sub = nh.subscribe("scan", 1, &KalmanFilterNode::scanCallback, this);
        pub = nh.advertise<sensor_msgs::LaserScan>("scan/noise_filter", 1);
    }
};

int main(int argc, char** argv) {
    ros::init(argc, argv, "kalman_filter");
    KalmanFilterNode kf_node;
    ros::spin();
    return 0;
}
