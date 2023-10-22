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
    width: windowWidth * 0.6,
    height: windowHeight,
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
  document.getElementById('start').style.display = 'none';
  document.getElementById('stop').style.display = 'inline';
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
  publisher.publish(stop);
  setTimeout(function () {
    let loadingElem = document.getElementById("loading");
    console.log("STOP");
    setTimeout(function () {
      loadingElem.style.transition = "transform 5s ease-in-out"; // 打開動畫
    }, 10); // 10毫秒後恢復動畫效果並進行動畫
    loadingElem.style.transform = "translateX( 0vw )";
    document.getElementById('stop').style.display = 'none';
    document.getElementById('start').style.display = 'inline';
  }, 2000);
}

document.addEventListener("DOMContentLoaded", function () {
  init();
},);

window.addEventListener('DOMContentLoaded', (event) => {
  let icon = document.getElementById("icon");

  icon.addEventListener("click", function () {
    let mapCamera = document.getElementById("map_camera");
    let icon = document.getElementById("icon");

    let computedStyle = window.getComputedStyle(mapCamera);

    if (computedStyle.display === "block") {
      mapCamera.style.display = "none";
      icon.classList.remove("fa-video");
      icon.classList.add("fa-video-slash");
    } else {
      mapCamera.style.display = "block";
      icon.classList.remove("fa-video-slash");
      icon.classList.add("fa-video");
    }
  });
});
