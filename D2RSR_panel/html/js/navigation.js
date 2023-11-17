document.addEventListener("DOMContentLoaded", function() {
    // 创建 ROS 连接
    var ros = new ROSLIB.Ros({
        url: 'ws://localhost:9090' // 根据您的配置调整 WebSocket 连接地址
    });

    // 监听 ROS 连接事件
    ros.on('connection', function() {
        console.log('已连接到 ROS 的 WebSocket 服务器。');
    });

    ros.on('error', function(error) {
        console.error('连接到 ROS 的 WebSocket 服务器时发生错误：', error);
    });

    ros.on('close', function() {
        console.log('与 ROS 的 WebSocket 服务器的连接已关闭');
    });

    // 创建地图视图
    var viewer = new ROS2D.Viewer({
        divID: 'mapCanvas',
        width: 800,
        height: 600
    });

    // 设置地图客户端
    var gridClient = new ROS2D.OccupancyGridClient({
        ros: ros,
        rootObject: viewer.scene,
        continuous: true
    });

    // 缩放画布以适应地图
    gridClient.on('change', function(){
        viewer.scaleToDimensions(gridClient.currentGrid.width*0.15, gridClient.currentGrid.height*0.15);
        viewer.shift(gridClient.currentGrid.pose.position.x*0.15, gridClient.currentGrid.pose.position.y*0.15);
    });

    var navGoalPublisher = new ROSLIB.Topic({
        ros : ros,
        name : '/move_base_simple/goal',
        messageType : 'geometry_msgs/PoseStamped'
    });

    // 监听地图视图的点击事件
    viewer.scene.addEventListener('click', function(event) {
        // 获取点击位置的地图坐标
        var coords = viewer.scene.globalToRos(event.stageX, event.stageY);
        var pose = new ROSLIB.Pose({
            position : new ROSLIB.Vector3(coords)
        });

        // 创建一个导航目标消息
        var goal = new ROSLIB.Message({
            header : {
                frame_id : 'map'
            },
            pose : pose
        });

        // 发布导航目标
        navGoalPublisher.publish(goal);
        console.log('导航目标已发布到ROS:', coords);
    });
});

function Goback() {
    window.location.href = 'http://192.168.0.91/?active=mapping';
}
