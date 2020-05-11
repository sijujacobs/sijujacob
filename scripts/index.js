(function () {
  $(".menuButton").click(function () {
    console.log(" MenuButtonClicked :: : ");
    $(this).toggleClass("open");
    $(".navOverlay").toggleClass("open");
  });

  $(".navOverlay li").click(function () {
    $(".menuButton, .navOverlay").removeClass("open");
  });

  //   function setPosition() {
  //     $("#about").css({ "margin-top": "1vh" });
  //   }
  //   setPosition();
  //   $(window).resize(setPosition);

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
        opacity: 1 - pPosition / 20 / 15,
      });
    }
  }
  homeEffect();
  $(window).scroll(homeEffect);

  $(document).ready(function () {
    $(".footerDate").text(new Date().getFullYear());
  });
})();
