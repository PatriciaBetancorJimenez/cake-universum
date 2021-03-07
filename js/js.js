"use strict";

//*****************************NAVBAR Animation
//opacity changes
$(document).scroll(function () {
  var $nav = $("#navbar");
  $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
});
//navbar fixed top
$('a[href*="#"]:not(.carousel-control-prev, .carousel-control-next)').on(
  "click",
  function (event) {
    let hash = this.hash;

    if (hash) {
      event.preventDefault();
      $("html, body").animate({ scrollTop: $(hash).offset().top - 50 }, 800);
    }
  }
);

//*****************************HEADER ANIMATED TEXT

var TxtRotate = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("txt-rotate");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-rotate");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // inject css
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};

//*****************************GALLERY ANIMATION

const buttons = document.querySelectorAll(".gallery");
const overlay = document.querySelector(".gallery__modal");
const overlayImage = document.querySelector(".gallery__modal--inner img");

function gallery() {
  buttons.forEach((button) => button.addEventListener("click", open));

  overlay.addEventListener("click", close);

  function open(e) {
    if (window.innerWidth > 767.98) {
      overlay.classList.add("open");
      const src = e.currentTarget.querySelector("img").src;
      overlayImage.src = src;
    }
  }

  function close() {
    overlay.classList.remove("open");
  }
}

window.addEventListener("load", function () {
  gallery();
});
window.addEventListener("resize", function () {
  gallery();
});

//*****************************BOOTSTRAP FORM VALIDATION

window.addEventListener(
  "load",
  function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName("needs-validation");
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add("was-validated");
        },
        false
      );
    });
  },
  false
);
