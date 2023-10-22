var ros_map = new ROSLIB.Ros({
  url: 'ws://localhost:9090'
});

var publisher = new ROSLIB.Topic({
  ros: ros_map,
  name: "/command",
  messageType: "std_msgs/String",
});

var start = new ROSLIB.Message({
  data: "bash ~/rosky_slam.sh",
});

var stop = new ROSLIB.Message({
  data: "stop",
});

var clear = new ROSLIB.Message({
  data: "clear",
});

function init() {
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;

  var viewer = new ROS2D.Viewer({
    divID: 'map',
    width: windowWidth*0.6,
    height: windowHeight*0.9,
    overflows: 'hidden'
  });

  var gridClient = new ROS2D.OccupancyGridClient({
    ros: ros_map,
    rootObject: viewer.scene,
    continuous: true
  });

  gridClient.on('change', function () {
    viewer.scaleToDimensions(gridClient.currentGrid.width * 0.15, gridClient.currentGrid.height * 0.15);
    viewer.shift(gridClient.currentGrid.pose.position.x * 0.15, gridClient.currentGrid.pose.position.y * 0.15);
  });


}




function START() {
  // 先移動 loading 圖片
  document.getElementById("loading").style.transform = "translateX(100vw)";
  console.log("START");
  publisher.publish(start);


  
}

// function START() {
//   console.log("START");
//   publisher.publish(start);

// }

// function STOP() {
//   console.log("STOP");
//   publisher.publish(stop);
// }

function STOP() {
  let loadingElem = document.getElementById("loading");
  loadingElem.style.transition = "none"; // 暫時關閉動畫
  loadingElem.style.transform = "translateX(-100vw)";
  // 恢復動畫轉場效果，並進行動畫
  console.log("STOP");
  setTimeout(function () {
    loadingElem.style.transition = "transform 1s ease-in-out"; // 打開動畫
  }, 10); // 10毫秒後恢復動畫效果並進行動畫
  loadingElem.style.transform = "translateX( 0vw )";
  publisher.publish(stop);
}

document.addEventListener("DOMContentLoaded", function () {
  init();
},);

