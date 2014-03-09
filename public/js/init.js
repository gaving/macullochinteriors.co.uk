$(document).ready(function(){

  var navbarHeight = 80;

  $(window).scroll(function() {
    var top = $(window).scrollTop();
    $(".slide-in").each(function () {
      var thisTop = $(this).offset().top;
      var height = $(this).height();
      if ((top > (thisTop - (height * 1.5))) && !$(this).hasClass("slid")) {
        $(this).addClass("slid");
      }
    });
    $('body').scrollspy({ offset: navbarHeight+10, target: '#navbar' });
  });

  $('.carousel').carousel({
    pause: false,
    interval: 8000
  });

  $('#navbar').affix({
    offset: {
      top: function () {
        return (this.top = $(window).height() - navbarHeight)
      }
    }
  })

  // Parallax Scripts
  function updateParallax() {
    if ($(window).width() > 768) {
      $(".parallax").each(function () {
        var bottom = $(this).offset().top + $(this).height();
        var top = $(this).offset().top;
        var windowHeight = $(window).height();
        var scrollTop = $(window).scrollTop() + windowHeight;
        var fromTop = 0;
        var isHome = true;
        if (top === 0) {
          fromTop = $(window).scrollTop() - top;
          isHome = true;
        }
        else {
          fromTop = $(window).scrollTop() - top + windowHeight;
          isHome = false;
        }
        if ((bottom > $(window).scrollTop()) && (top < scrollTop)) {
          var parallax = -1 * (fromTop / 3);
          var revParallax = parallax;
          var percent = 1 - 1.3 *($(window).scrollTop() / $(window).height());
          if (isHome) {
            revParallax += navbarHeight;
            $("#home .logo").css('marginTop', parallax + "px");
            $("#home .logo, #home .welcome, #home .call-to-action, #home .macbook-preview").css('opacity', percent);
          }
          $(this).children("img").first().css('bottom', revParallax + "px");
        }
      });
    }
  }
  updateParallax();

  $(window).scroll(function() {
    updateParallax();
  });

  // Contact Form Icon
  $("form .form-control").focus(function() {
    $(this).siblings("label").first().children("i").first().css({"color": "#aaa", "left": 0});
  });
  $("form .form-control").blur(function() {
    $(this).siblings("label").first().children("i").first().css({"color": "transparent", "left": "-20px"});
  });

  // Blog Masonry
  var $container = $('.masonry-grid');

  $container.imagesLoaded(function(){
    new AnimOnScroll( document.getElementById( 'grid' ), {
      minDuration : 0.4,
      maxDuration : 0.7,
      viewportFactor : 0.2
    } );

    // Smooth Scrolling
    $("a.scroll").click(function(e) {
      e.preventDefault();
      var offset = $(this.hash).offset().top - (navbarHeight/2);
      $('html, body').animate({ scrollTop: offset }, 600);
    });
  });

  function initialize() {
    var myLatLong = new google.maps.LatLng(55.8750993,-4.3976475);
    var mapOptions = {
      center: myLatLong,
      scrollwheel: false,
      zoom: 13
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    var marker = new google.maps.Marker({
      position: myLatLong,
      map: map
    });
  }
  google.maps.event.addDomListener(window, 'load', initialize);
});
