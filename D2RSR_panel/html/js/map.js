function init() {
  var ros = new ROSLIB.Ros({
    url: 'ws://localhost:9090'
  });

  var viewer = new ROS2D.Viewer({
    divID: 'map',
    width: 800,
    height: 600
  });

  var gridClient = new ROS2D.OccupancyGridClient({
    ros: ros,
    rootObject: viewer.scene,
    continuous: true
  });

  gridClient.on('change', function () {
    viewer.scaleToDimensions(gridClient.currentGrid.width, gridClient.currentGrid.height);
    viewer.shift(gridClient.currentGrid.pose.position.x, gridClient.currentGrid.pose.position.y);
  });
}

document.addEventListener("DOMContentLoaded", function() {
  init();
});