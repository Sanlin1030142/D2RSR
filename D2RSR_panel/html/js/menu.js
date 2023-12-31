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
  'mjpeg3': 'http://192.168.0.91:8000/stream?topic=/multi1/stitched_frame',
  'mjpeg4': 'http://192.168.0.91:8000/stream?topic=/multi1/stitched_frame',
  // 'mjpeg1': 'http://192.168.0.91:8090',
  // 'mjpeg2': 'http://192.168.0.91:8090',
  // http://192.168.0.26:8090/
  // http://192.168.0.26:8000/stream?topic=/multi/stitched_frame
  'map_camera': 'http://192.168.0.91:8000/stream?topic=/trace/camera_0'
};

var ros_camera = new ROSLIB.Ros({
  url: 'ws://localhost:9090'
});

var ros_test = new ROSLIB.Ros({
  url: 'ws://localhost:9090'
});

// 儲存ros的傳輸訊息
var publisher = new ROSLIB.Topic({
  ros: ros_camera,
  name: "/usb_video",
  messageType: "std_msgs/String",
});

var publisher1 = new ROSLIB.Topic({
  ros: ros_test,
  name: "/test",
  messageType: "std_msgs/String",
});

var start1 = new ROSLIB.Message({
  data: "start",
});

var start_runall = new ROSLIB.Message({
  data: "run",
});

var stop1 = new ROSLIB.Message({
  data: "stop",
});

var stop_runall = new ROSLIB.Message({
  data: "navigation",
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
    publisher.publish(start1);
    console.log("START camera");
    var grid = document.querySelector('.image-grid');
    var slider = document.querySelector('.image-slider');
    var gridImages = Array.from(grid.querySelectorAll("img"));
    var sliderImages = Array.from(slider.querySelectorAll("img"));

    loadImageBatch(gridImages);

    loadImageBatch(sliderImages);
  }

  if ( pageId === 'home' ) {
    publisher.publish(start_runall);
    publisher1.publish(start1); // for testing
    console.log("STOP camera");
  } // if() 

  if (pageId === 'mapping') {
    publisher.publish(stop1);
    console.log("STOP camera");
    //var map_camera = document.getElementById('map_camera');
    //map_camera.src = originalSrc[map_camera.id];
  }

  if ( pageId === 'panorama' ) {
    publisher.publish(start1);
    console.log("START camera");
    
    window.location.href = 'http://192.168.0.91/panorama.html';
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
  } else {
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

