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

items.forEach((item, index) => {
  item.addEventListener('click', (e) => { handleIndicator(e.target); });
  item.classList.contains('is-active') && handleIndicator(item);

});

// 1. 保存原始的图片地址。
var originalSrc = {
  'grid_top': 'http://192.168.0.26:8080/stream?topic=/trace/camera_0',
  'grid_top_right': 'http://192.168.0.26:8080/stream?topic=/trace/camera_1',
  'grid_bottom_right': 'http://192.168.0.26:8080/stream?topic=/trace/camera_2',
  'grid_bottom': 'http://192.168.0.26:8080/stream?topic=/trace/camera_3',
  'grid_bottom_left': 'http://192.168.0.26:8080/stream?topic=/trace/camera_4',
  'grid_top_left': 'http://192.168.0.26:8080/stream?topic=/trace/camera_5',
  'slider_top': 'http://192.168.0.26:8080/stream?topic=/trace/camera_0',
  'slider_top_right': 'http://192.168.0.26:8080/stream?topic=/trace/camera_1',
  'slider_bottom_right': 'http://192.168.0.26:8080/stream?topic=/trace/camera_2',
  'slider_bottom': 'http://192.168.0.26:8080/stream?topic=/trace/camera_3',
  'slider_bottom_left': 'http://192.168.0.26:8080/stream?topic=/trace/camera_4',
  'slider_top_left': 'http://192.168.0.26:8080/stream?topic=/trace/camera_5',
  'camera_car': 'img/D2RSR_car.png',
  'camera_view': 'img/D2RSR_view.png',
  'mjpeg1': 'http://192.168.0.26:8080/stream?topic=/stitched_frame',
  'mjpeg2': 'http://192.168.0.26:8080/stream?topic=/stitched_frame'
};

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
    var grid = document.querySelector('.image-grid');
    var slider = document.querySelector('.image-slider');
    var gridImages = Array.from(grid.querySelectorAll("img"));
    var sliderImages = Array.from(slider.querySelectorAll("img"));

    // 先加载 gridImages 的图片
    loadImageBatch(gridImages);

    // 再加载 sliderImages 的图片
    loadImageBatch(sliderImages);
  }

  // 如果是全景页面，加载图片
  if (pageId === 'panorama') {
    // 加载mjpeg1
    var mjpeg1 = document.getElementById('mjpeg1');
    mjpeg1.src = originalSrc[mjpeg1.id];


    var mjpeg2 = document.getElementById('mjpeg2');
    mjpeg2.src = originalSrc[mjpeg2.id];

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
    retryLoadImage(this, 3);  // 尝试重新加载3次
  });
});