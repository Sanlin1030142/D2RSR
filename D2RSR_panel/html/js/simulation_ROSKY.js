var delay = 100;

var ros_car = new ROSLIB.Ros({
  url: "ws://localhost:9090",
});

var ros_car_listener = new ROSLIB.Topic({
  ros: ros_car,
  name: "/rosky01/web/info",
  messageType: "web_msgs/web_transfer_pkg",
});

var simlist = [
  "top",
  "bottom",
  "top-right",
  "bottom-right",
  "bottom-left",
  "top-left",
];
ros_car_listener.subscribe(function (message) {
  if (message.collision.length != 0) {
    for (var i = 0; i < 2; i++) {
      var corner = document.getElementById(simlist[i]);
      if (message.collision[i] === "stop") {
        corner.style.stroke = "#ff4646ed";
      }
      if (message.collision[i] === "slow") {
        corner.style.stroke = "#f6ff4ced";
      }
      if (message.collision[i] === "normal") {
        corner.style.stroke = "#c7ca6e00";
      }
    }

    for (var i = 2; i < 6; i++) {
      var corner = document.getElementById(simlist[i]);
      if (message.collision[i] === "stop") {
        corner.style.backgroundColor = "#ff4646ed";
      }
      if (message.collision[i] === "normal") {
        corner.style.backgroundColor = "#c7ca6e00";
      }
    }
  }
  var left = document.getElementById("tireleft");
  var right = document.getElementById("tireright");
  if (message.velocity.y > 0) {
    left.style.transform = "rotate(" + (80 - 10 * message.velocity.y) + "deg)";
    right.style.transform = "rotate(" + (80 - 10 * message.velocity.y) + "deg)";
  }
  if (message.velocity.y < 0) {
    left.style.transform = "rotate(" + (100 - 10 * message.velocity.y) + "deg)";
    right.style.transform =
      "rotate(" + (100 - 10 * message.velocity.y) + "deg)";
  }

  if (message.velocity.y === 0) {
    left.style.transform = "rotate(" + 90 + "deg)";
    right.style.transform = "rotate(" + 90 + "deg)";
  }

  if (message.velocity.x > 0) {
    delay = 100 - 50 * message.velocity.x;
    forward(delay);
  }
  if (message.velocity.x < 0) {
    delay = 100 + 50 * message.velocity.x;
    backward(delay);
  }

  if (message.velocity.x === 0) {
  }
});

function backward(time) {
  $("#wall li:first-child").slideUp(time, function () {
    $(this).appendTo($("#wall")).slideDown(time);
  });
}

function forward(time) {
  $("#wall li:last-child").slideUp(time, function () {
    $(this).prependTo($("#wall")).slideDown(time);
  });
}

function Camera() {
  var Camera = document.getElementById("Graph");
  if (Camera.style.opacity == 0) {
    Camera.style.opacity = 1;
  } else {
    Camera.style.opacity = 0;
  }
}

function Slidecamera() {
  $("#Graph").slideToggle(1000);
}
