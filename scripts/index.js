(function () {
  $(".menuButton").click(function () {
    $(this).toggleClass("open");
    $(".navOverlay").toggleClass("open");
  });

  $(".navOverlay li").click(function () {
    $(".menuButton, .navOverlay").removeClass("open");
  });

  //   --------------------
  var $w = $(window);
  var $circ = $(".animated-circle");
  var $progCount = $(".progress-count");
  var $prog2 = $(".progress-indicator-2");

  var wh, h, sHeight;

  function setSizes() {
    wh = $w.height();
    h = $("body").height();
    sHeight = h - wh;
  }

  setSizes();
  function updateProgress(perc) {
    var circle_offset = 126 * perc;
    $circ.css({
      "stroke-dashoffset": 126 - circle_offset,
    });
    $progCount.html(Math.round(perc * 100) + "%");

    $prog2.css({ width: perc * 100 + "%" });
  }
  // -----------------------

  function homeEffect() {
    var pPosition = window.pageYOffset || document.documentElement.scrollTop;
    var homeSection = $("#home");
    if ($(window).width() > 481) {
      homeSection.css({
        transform: "scale(" + (100 - pPosition / 100) / 98 + ")",
        opacity: 1 - pPosition / 20 / 30,
      });
    } else {
      homeSection.css({
        transform: "scale(" + (100 - pPosition / 100) / 99 + ")",
        opacity: 1 - pPosition / 25 / 30,
      });
    }

    // START New Code
    var perc = Math.max(0, Math.min(1, $w.scrollTop() / sHeight));
    updateProgress(perc);
    // END New Code
  }
  homeEffect();
  $(window).scroll(homeEffect);
  $(window).on("resize", () => {
    setSizes();
    $w.trigger("scroll");
  });

  $(document).ready(function () {
    $(".footerDate").text(new Date().getFullYear());
  });
})();
