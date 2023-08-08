window.onload = function () {
  var img = document.getElementById('cam_status');
  var grid = document.querySelector('.image-grid');
  var slider = document.querySelector('.image-slider');

  img.onclick = function () {
    if (this.src.match('cam_multiple')) {
      this.src = 'img/cam_single.png';
      grid.style.display = 'none';
      slider.style.display = 'block';
    } else {
      this.src = 'img/cam_multiple.png';
      grid.style.display = 'grid';
      slider.style.display = 'none';
    }
  };

  var cards = $('#card-slider .slider-item').toArray();

  startAnim(cards);

  function startAnim(array) {
    TweenMax.fromTo(array[0], 0.5, { x: 0, y: 0, opacity: 1, scale: 1 }, { x: 0, y: -240, opacity: 0, zIndex: 0, delay: 0.03, ease: Cubic.easeInOut, onComplete: sortArray(array) });

    TweenMax.fromTo(array[1], 0.5, { x: 158, y: 250, opacity: 1, zIndex: 1, scale: 1 }, { x: 0, y: 0, opacity: 0.3, zIndex: 0, scale: 1, ease: Cubic.easeInOut });

    TweenMax.to(array[2], 0.5, { bezier: [{ x: 150, y: 500 }, { x: 280, y: 400 }, { x: 308, y: 250 }], zIndex: 1, opacity: 1, scale: 2, ease: Cubic.easeInOut });


    TweenMax.fromTo(array[3], 0.5, { x: 0, y: 800, opacity: 1, zIndex: 0, scale: 1 }, { x: 0, y: 500, opacity: 0.3, zIndex: 0, ease: Cubic.easeInOut });
  }

  function sortArray(array) {
    clearTimeout(delay);
    var delay = setTimeout(function () {
      var firstElem = array.shift();
      array.push(firstElem);
      return startAnim(array);
    }, 3000)
  }


};
