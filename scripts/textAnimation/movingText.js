(() => {
  //   console.log("Moving text :: : ");

  function makeNewPosition($container) {
    var h = $container.height() - 50;
    var w = $container.width() - 100;
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);
    return [nh, nw];
  }

  function animateDiv($target) {
    var newq = makeNewPosition($target.parent());
    var oldq = $target.offset();
    var speed = calcSpeed([oldq.top, oldq.left], newq);
    $target.animate(
      {
        top: newq[0],
        left: newq[1],
      },
      speed,
      function () {
        animateDiv($target);
      }
    );
  }

  function calcSpeed(prev, next) {
    var x = Math.abs(prev[1] - next[1]);
    var y = Math.abs(prev[0] - next[0]);
    var greatest = x > y ? x : y;
    var speedModifier = 0.09;
    var speed = Math.ceil(greatest / speedModifier);
    return speed;
  }
  var elements = $("#techExperience div");
  for (let i = 0; i < elements.length; i++) {
    let thisElement = elements[i];
    // console.log("Animate :: : ", $(thisElement));
    animateDiv($(thisElement));
  }
})();
