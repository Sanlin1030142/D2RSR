const indicator = document.querySelector('.nav-indicator');
const items = document.querySelectorAll('.nav-item');

function handleIndicator(el) {
  items.forEach(item => {
    item.classList.remove('is-active');
    item.removeAttribute('style');
  });

  indicator.style.width = `${el.offsetWidth}px`;
  indicator.style.left = `${el.offsetLeft}px`;
  indicator.style.backgroundColor = el.getAttribute('active-color');

  el.classList.add('is-active');
  el.style.color = el.getAttribute('active-color');
}

window.onload = function () {
  var navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(function (item) {
    if (item.classList.contains('is-active')) {
      handleIndicator(item);
    }
  });
};

items.forEach((item, index) => {
  item.addEventListener('click', (e) => { handleIndicator(e.target); });
  item.classList.contains('is-active') && handleIndicator(item);

});

// 1. 保存原始的图片地址。
var originalSrc = {
  'grid_top': 'http://192.168.0.91:8000/stream?topic=/trace/camera_0',
  'grid_top_right': 'http://192.168.0.91:8000/stream?topic=/trace/camera_1',
  'grid_bottom_right': 'http://192.168.0.91:8000/stream?topic=/trace/camera_2',
  'grid_bottom': 'http://192.168.0.91:8000/stream?topic=/trace/camera_3',
  'grid_bottom_left': 'http://192.168.0.91:8000/stream?topic=/trace/camera_4',
  'grid_top_left': 'http://192.168.0.91:8000/stream?topic=/trace/camera_5',
  'slider_top': 'http://192.168.0.91:8000/stream?topic=/trace/camera_0',
  'slider_top_right': 'http://192.168.0.91:8000/stream?topic=/trace/camera_1',
  'slider_bottom_right': 'http://192.168.0.91:8000/stream?topic=/trace/camera_2',
  'slider_bottom': 'http://192.168.0.91:8000/stream?topic=/trace/camera_3',
  'slider_bottom_left': 'http://192.168.0.91:8000/stream?topic=/trace/camera_4',
  'slider_top_left': 'http://192.168.0.91:8000/stream?topic=/trace/camera_5',
  'camera_car': 'img/D2RSR_car.png',
  'camera_view': 'img/D2RSR_view.png',
  'mjpeg1': 'http://192.168.0.91:8000/stream?topic=/multi/stitched_frame',
  'mjpeg2': 'http://192.168.0.91:8000/stream?topic=/multi/stitched_frame',
  // 'mjpeg1': 'http://192.168.0.91:8090',
  // 'mjpeg2': 'http://192.168.0.91:8090',
  // http://192.168.0.26:8090/
  // http://192.168.0.26:8000/stream?topic=/multi/stitched_frame
  'map_camera': 'http://192.168.0.91:8000/stream?topic=/trace/camera_0',
};

var ros_camera = new ROSLIB.Ros({
  url: 'ws://localhost:9090'
});

var ros_map = new ROSLIB.Ros({
  url: 'ws://localhost:9090'
});

var ros_nav = new ROSLIB.Ros({
  url: 'ws://localhost:9090'
});

var ros_ping = new ROSLIB.Ros({
  url: 'ws://localhost:9090'
});

var publisher = new ROSLIB.Topic({
  ros: ros_map,
  name: "/command",
  messageType: "std_msgs/String",
});

var publisher1 = new ROSLIB.Topic({
  ros: ros_camera,
  name: "/usb_video",
  messageType: "std_msgs/String",
});

var publisher2 = new ROSLIB.Topic({
  ros: ros_nav,
  name: "/nav_signal",
  messageType: "std_msgs/String",
});

var publisher3 = new ROSLIB.Topic({
  ros: ros_ping,
  name: "/goal_update",
  messageType: "std_msgs/String",
});

// to close or open gmapping
var start = new ROSLIB.Message({
  data: "bash ~/rosky_slam.sh",
});

var stop = new ROSLIB.Message({
  data: "stop",
});

var clear = new ROSLIB.Message({
  data: "clear",
});

// to close or open camera
var start1 = new ROSLIB.Message({
  data: "start",
});

var stop1 = new ROSLIB.Message({
  data: "stop",
});

// to close or open run all
var start_runall = new ROSLIB.Message({
  data: "run",
});

var stop_runall = new ROSLIB.Message({
  data: "navigation",
});


// to close or open navigation
var start_navigation = new ROSLIB.Message({
  data: "start_nav",
});

var stop_navigation = new ROSLIB.Message({
  data: "stop_nav",
});

// to ping a location
var pin = new ROSLIB.Message({
  data: "set",
});

function loadImageBatch(images) {
  images.forEach(img => {
    img.src = originalSrc[img.id];
  });
}

function showContent(pageId) {
  // 显示指定的页面
  var pages = ['home', 'camera', 'mapping', 'panorama'];
  pages.forEach(function (page) {
    document.getElementById(page).classList.remove('active');
  });
  document.getElementById(pageId).classList.add('active');

  // 如果是相机页面，加载图片
  if (pageId === 'camera') {
    publisher1.publish(start1);
    console.log("START camera");
    var grid = document.querySelector('.image-grid');
    var slider = document.querySelector('.image-slider');
    var gridImages = Array.from(grid.querySelectorAll("img"));
    var sliderImages = Array.from(slider.querySelectorAll("img"));
    var position = document.querySelector('.position');
    position.classList.add('show');  // show position
    loadImageBatch(gridImages);

    loadImageBatch(sliderImages);
  }

  if ( pageId === 'home' ) {
    console.log("STOP camera");
    publisher1.publish(stop1);
  } // if() 

  if (pageId === 'mapping') {
    publisher1.publish(start1);
    console.log("START camera");
    var map_camera = document.getElementById('map_camera');
    map_camera.src = originalSrc[map_camera.id];
    map_camera.style.display = "block";
    console.log("load at showContent");
    retryLoadImage(map_camera, 5);  // 尝试重新加载5次

    
  }

  if ( pageId === 'panorama' ) {
    publisher1.publish(start1);
    console.log("START camera");
    
    
    window.location.href = 'panorama.html';
  } // if()

  var activeItem = document.querySelector('.nav-item.is-active');
  if (activeItem) {
    handleIndicator(activeItem);
  }
}

function retryLoadImage(img, maxRetries) {
  if (typeof img.retryCount === 'undefined') {
    img.retryCount = 0;
  }

  if (img.retryCount < maxRetries) {
    console.warn('Retrying to load image:', img.src);
    console.warn('Retry count:', img.retryCount);
    img.retryCount++;

    setTimeout(() => {
      img.src = img.src;
    }, 1000 * img.retryCount);  // 延迟时间随重试次数增加
  } else {
    console.error('Failed to load image after', maxRetries, 'tries:', img.src);
    // 你也可以在此设置备用图片或显示错误消息
  }
}

document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', function () {
    retryLoadImage(this, 5);  // 尝试重新加载5次
  });
});

document.addEventListener('DOMContentLoaded', function () {
  // 解析URL以獲取active選項
  var queryParams = new URLSearchParams(window.location.search);
  var activeMenu = queryParams.get('active');
  console.log(activeMenu);
  // 設定導航指示器的位置
  var pages = ['home', 'camera', 'mapping', 'panorama'];
  pages.forEach(function (page) {
    document.getElementById(page).classList.remove('active');
  });

  if ( activeMenu === null ) {
    pageId = 'home';
    document.getElementById(pageId).classList.add('active');
  } 
  
  else if ( activeMenu === 'mapping' ) {
    pageId = 'mapping';
    console.log("load at listener");
    document.getElementById(pageId).classList.add('active');
    // var map_camera = document.getElementById('map_camera');
    // map_camera.src = originalSrc[map_camera.id];
    // map_camera.style.display = "block";
    // retryLoadImage(map_camera, 5);
    // setTimeout(function () {
    publisher2.publish( stop_navigation );

    setTimeout(function () {
      publisher1.publish( start_runall );
      console.log("START run all");
    }, 6000); // 6秒後再開啟run all
    // }, 8000);

    

    

  } // else if()

  else if ( activeMenu === 'camera' ) {
    pageId = 'camera';
    document.getElementById(pageId).classList.add('active');
    var grid = document.querySelector('.image-grid');
    var slider = document.querySelector('.image-slider');
    var gridImages = Array.from(grid.querySelectorAll("img"));
    var sliderImages = Array.from(slider.querySelectorAll("img"));

    loadImageBatch(gridImages);
    loadImageBatch(sliderImages);
  } // else if()

  else {
    document.getElementById(activeMenu).classList.add('active');
  } 

  var navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(function (item) {
    item.classList.remove('is-active'); // 移除所有active類
    if (item.getAttribute('onclick') === 'showContent(\'' + activeMenu + '\')') {
      item.classList.add('is-active'); // 為當前頁面的導航項目添加active類
      // 更新導航指示器的位置
      var indicator = document.querySelector('.nav-indicator');
      indicator.style.backgroundColor = item.getAttribute('active-color');
    }
  });
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
  console.log("START map");
  document.getElementById('start').style.display = 'none';
  document.getElementById('stop').style.display = 'inline';
  document.getElementById('list_bubble_pin').style.display = 'inline';
  publisher.publish(start);

}

function STOP() {
  publisher1.publish(stop_runall);
  setTimeout(function () {
    publisher.publish(stop);
    setTimeout(function () {
      let loadingElem = document.getElementById("loading");
      console.log("STOP map");
      setTimeout(function () {
        loadingElem.style.transition = "transform 5s ease-in-out"; // 打開動畫
      }, 10); // 10毫秒後恢復動畫效果並進行動畫
      loadingElem.style.transform = "translateX( 0vw )";
      document.getElementById('stop').style.display = 'none';
      document.getElementById('start').style.display = 'inline';
      document.getElementById('list_bubble_pin').style.display = 'none';
    }, 2000);
  }, 2000);
  
}

function Secret() {
  console.log("secretly stop run all");
  publisher1.publish(stop_runall);

}

function Pin() {
  console.log("Pin");
  publisher3.publish(pin);
  console.log("modal appear");
  var modal = document.getElementById('Pop-ups');
  modal.style.animation = ''; // 清除之前的動畫
  modal.classList.add('slide-in'); // 添加進入動畫類別

  setTimeout(function() {
    modal.style.animation = ''; // 清除之前的動畫
    modal.classList.remove('slide-in'); // 移除進入動畫類別
    modal.classList.add('slide-out'); // 添加退出動畫類別
    setTimeout(function() {
        modal.classList.remove("slide-in", "slide-out");
    }, 800); // 等待的時間應與CSS過渡時間相同
  }, 3000); // 這裡的 5000 是彈窗顯示持續的時間（毫秒）   

  
  
  // setTimeout(function () {
  //   modal.classList.add("modal-hide");
  //   console.log("modal disappear");
  //   setTimeout(function() {
  //       modal.classList.remove("modal-show", "modal-hide");
  //   }, 600); // 等待的時間應與CSS過渡時間相同
  // }, 1500); // 6秒後再收起彈窗
}

function Navigation() {
  publisher1.publish(stop1);
  publisher2.publish( start_navigation );

  window.location.href = 'navigation.html';
  console.log("Navigation");
}

function Start_runall() {
  console.log("START run all");
  publisher1.publish(start_runall);
}

document.addEventListener("DOMContentLoaded", function () {
  init();
},);

// window.addEventListener('DOMContentLoaded', (event) => {
//   let icon = document.getElementById("icon");

//   icon.addEventListener("click", function () {
//     let mapCamera = document.getElementById("map_camera");
//     let icon = document.getElementById("icon");

//     let computedStyle = window.getComputedStyle(mapCamera);

//     if (computedStyle.display === "block") {
//       mapCamera.style.display = "none";
//       icon.classList.remove("fa-video");
//       icon.classList.add("fa-video-slash");
//     } else {
//       mapCamera.style.display = "block";
//       icon.classList.remove("fa-video-slash");
//       icon.classList.add("fa-video");
//     }
//   });
// });
