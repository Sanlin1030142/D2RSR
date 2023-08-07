#include <random>
#include <ros/ros.h>
#include <sensor_msgs/LaserScan.h>

class ParticleFilter {
   private:
    std::default_random_engine generator;
    std::normal_distribution<double> distribution;
    std::vector<double> particles;
    const int num_particles = 1000;

   public:
    ParticleFilter(double initial_estimate = 0, double initial_error = 1)
        : distribution(initial_estimate, initial_error) {
        // Initialize particles with a normal distribution
        for (int i = 0; i < num_particles; i++) {
            particles.push_back(distribution(generator));
        }
    }

    void predict(double movement = 0, double movement_error = 0.5) {
        // Move each particle and add noise
        for (double& particle : particles) {
            std::normal_distribution<double> move_distribution(movement, movement_error);
            particle += move_distribution(generator);
        }
    }

    void update(double measurement, double measurement_error = 0.1) {
        // Update weights based on the likelihood of the measurement
        std::vector<double> weights;
        for (const double& particle : particles) {
            double weight = std::exp(-(particle - measurement) * (particle - measurement) / (2 * measurement_error * measurement_error));
            weights.push_back(weight);
        }

        // Resample particles based on weights
        std::discrete_distribution<> dist(weights.begin(), weights.end());
        std::vector<double> resampled_particles;
        for (int i = 0; i < num_particles; i++) {
            resampled_particles.push_back(particles[dist(generator)]);
        }
        particles = std::move(resampled_particles);
    }

    double getEstimate() const {
        // Return the mean of the particles as the estimate
        double sum = std::accumulate(particles.begin(), particles.end(), 0.0);
        return sum / num_particles;
    }
};

class ParticleFilterNode {
   private:
    ros::NodeHandle nh;
    ros::Publisher pub;
    ros::Subscriber sub;
    std::vector<ParticleFilter> filters;

    void scanCallback(const sensor_msgs::LaserScan::ConstPtr& msg) {
        sensor_msgs::LaserScan filtered_scan = *msg;
        if (filters.size() != msg->ranges.size()) {
            filters.resize(msg->ranges.size());
        }
        for (size_t i = 0; i < msg->ranges.size(); ++i) {
            if (std::isinf(msg->ranges[i])) {
                continue;
            }
            filters[i].predict();
            filters[i].update(msg->ranges[i]);
            filtered_scan.ranges[i] = filters[i].getEstimate();
        }
        pub.publish(filtered_scan);
    }

   public:
    ParticleFilterNode() {
        sub = nh.subscribe("scan", 1, &ParticleFilterNode::scanCallback, this);
        pub = nh.advertise<sensor_msgs::LaserScan>("scan/noise_filter", 1);
    }
};

int main(int argc, char** argv) {
    ros::init(argc, argv, "particle_filter");
    ParticleFilterNode pf_node;
    ros::spin();
    return 0;
}
