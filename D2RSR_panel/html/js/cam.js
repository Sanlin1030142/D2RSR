// 連接至ROS伺服器
let ros = new ROSLIB.Ros({ url: "ws://localhost:9090" });

ros.on("connection", () => console.log("Connected to websocket server."));
ros.on("error", (error) => console.log("Error connecting to websocket server: ", error));
ros.on("close", () => console.log("Connection to websocket server closed."));

// 建立一個主題監聽器
let listener = new ROSLIB.Topic({
  ros: ros,
  name: "/joy",
  messageType: "sensor_msgs/Joy",
});

// buttom6
window.onload = function () {
  var cam_status = document.getElementById('cam_status');
  var grid = document.querySelector('.image-grid');
  var slider = document.querySelector('.image-slider');
  var prevAxisValue = 0;
  var rotationAngle = 0; // 默認旋轉角度
  var cards = $('#card-slider .slider-item').toArray();


  cam_status.onclick = function () {
    if (this.src.match('cam_multiple')) {
      this.src = 'img/cam_single.png';
      grid.classList.remove('show'); // hide grid
      slider.classList.add('show');  // show slider
      var index = cards.findIndex(card => $(card).find('img').attr('id') === 'slider_top')

      while (index != 2) {

        const firstElem = cards.shift();
        cards.push(firstElem);
        index = cards.findIndex(card => $(card).find('img').attr('id') === 'slider_top')

      }
      startAnim(cards);

    } else {
      this.src = 'img/cam_multiple.png';
      grid.classList.add('show');    // show grid
      slider.classList.remove('show'); // hide slider
    }


  };

  const idToAngle = {
    "grid_top": 0,
    "grid_top_right": 60,
    "grid_bottom_right": 120,
    "grid_bottom": 180,
    "grid_bottom_left": 240,
    "grid_top_left": 300,
    "slider_top": 0,
    "slider_top_right": 60,
    "slider_bottom_right": 120,
    "slider_bottom": 180,
    "slider_bottom_left": 240,
    "slider_top_left": 300
  };

  const angleToId = {};
  for (let id in idToAngle) {
    angleToId[idToAngle[id]] = id;
  }

  // 為 grid 中的所有圖片添加點擊事件
  grid.querySelectorAll("img").forEach(img => {
    img.addEventListener("click", function () {
      // 根據id查找rotationAngle
      rotationAngle = idToAngle[this.id] || 0;
      targetID = angleToId[rotationAngle];

      var cards = $('#card-slider .slider-item').toArray();

      var index = cards.findIndex(card => $(card).find('img').attr('id') === targetID)


      while (index != 2) {

        const firstElem = cards.shift();
        cards.push(firstElem);
        index = cards.findIndex(card => $(card).find('img').attr('id') === targetID)

      }
      startAnim(cards);
      // 變更camera_view的rotate
      const viewImg = document.getElementById('camera_view');
      if (viewImg) {
        viewImg.style.transform = `rotate(${rotationAngle}deg)`;
      } else {
        console.error('Element with id "camera_view" not found!');
      }

      // 切換cam_status的src並更改顯示狀態
      cam_status.src = 'img/cam_single.png';
      grid.classList.remove('show'); // hide grid
      slider.classList.add('show');  // show slider

    });
  });




  function startAnim(array) {
    TweenMax.fromTo(array[0], 0.5, { x: 0, y: 0, opacity: 0.3, scale: 1 }, { x: 0, y: -240, opacity: 0, zIndex: 0, delay: 0.03, ease: Cubic.easeInOut });
    TweenMax.fromTo(array[1], 0.5, { x: 158, y: 250, opacity: 1, zIndex: 1, scale: 1 }, { x: 0, y: 0, opacity: 0.3, zIndex: 0, scale: 1, ease: Cubic.easeInOut });
    TweenMax.to(array[2], 0.5, { bezier: [{ x: 150, y: 500 }, { x: 280, y: 400 }, { x: 400, y: 450 }], zIndex: 1, opacity: 1, scale: 2, ease: Cubic.easeInOut });
    TweenMax.fromTo(array[3], 0.5, { x: 0, y: 1000, opacity: 0, zIndex: 0, scale: 1 }, { x: 0, y: 800, opacity: 0.3, zIndex: 0, ease: Cubic.easeInOut });
    if (array[4]) {
      TweenMax.to(array[4], 0.5, { opacity: 0 });
    }
    if (array[5]) {
      TweenMax.to(array[5], 0.5, { opacity: 0 });
    }


    const viewImg = document.getElementById('camera_view');
    if (viewImg) {
      viewImg.style.transform = `rotate(${rotationAngle}deg)`;
    } else {
      console.error('Element with id "view" not found!');
    }
  }

  function reverseAnim(array) {

    TweenMax.fromTo(array[1], 0.5, { x: 0, y: -240, opacity: 0, scale: 1 }, { x: 0, y: 0, opacity: 0.3, zIndex: 0, delay: 0.03, ease: Cubic.easeInOut });
    TweenMax.to(array[2], 0.5, { bezier: [{ x: 0, y: 0 }, { x: 280, y: 100 }, { x: 400, y: 450 }], zIndex: 1, opacity: 1, scale: 2, ease: Cubic.easeInOut });
    TweenMax.fromTo(array[3], 0.5, { x: 150, y: 300, opacity: 1, zIndex: 0, scale: 1 }, { x: 0, y: 800, opacity: 0.3, zIndex: 0, ease: Cubic.easeInOut });
    TweenMax.fromTo(array[4], 0.5, { x: 0, y: 600, opacity: 0.3, zIndex: 1, scale: 1 }, { x: 0, y: 900, opacity: 0, zIndex: 0, scale: 1, ease: Cubic.easeInOut });
    if (array[0]) {
      TweenMax.to(array[4], 0.5, { opacity: 0 });
    }
    if (array[5]) {
      TweenMax.to(array[5], 0.5, { opacity: 0 });
    }

    const viewImg = document.getElementById('camera_view');
    if (viewImg) {
      viewImg.style.transform = `rotate(${rotationAngle}deg)`;
    } else {
      console.error('Element with id "view" not found!');
    }
  }


  listener.subscribe((message) => {
    handleslider(message)
    prevAxisValue = message.axes[6];  // 更新 prevAxisValue 的值
  });

  function handleslider(message) {
    if (prevAxisValue === 0 && message.axes[6] === -1) {
      rotationAngle += 60;
      const firstElem = cards.shift();
      cards.push(firstElem);
      startAnim(cards);
    } else if (prevAxisValue === 0 && message.axes[6] === 1) {
      rotationAngle -= 60;
      const lastElem = cards.pop();
      cards.unshift(lastElem);
      reverseAnim(cards);
    }
  }


  document.addEventListener('keydown', function (event) {
    switch (event.key) {
      case 'ArrowRight':
        rotationAngle += 60;
        const firstElem = cards.shift();
        cards.push(firstElem);
        startAnim(cards);
        break;
      case 'ArrowLeft':
        rotationAngle -= 60;
        const lastElem = cards.pop();
        cards.unshift(lastElem);
        reverseAnim(cards);
        break;
    }
  });

};

