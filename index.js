// Sticky navigation
const nav = document.querySelector(".nav");
const stickyNav = (entries) => {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};
const headerAside = document.querySelector(".header__aside");
const navHeight = nav.getBoundingClientRect().height;
const headerAsideObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerAsideObserver.observe(headerAside);

// Scroll into features section
const btnScroll = document.querySelector(".btn--scroll");
const features = document.querySelector(".features");
btnScroll.addEventListener("click", function (e) {
  const featuresRect = features.getBoundingClientRect();
  window.scroll({
    left: 0,
    top: featuresRect.top + window.pageYOffset - navHeight,
    behavior: "smooth",
  });
});

// Scroll into features, clients and testimonials sections
document.querySelector(".nav__items").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    const elRect = document.querySelector(id).getBoundingClientRect();
    window.scroll({
      left: 0,
      top: elRect.top + window.pageYOffset - navHeight,
      behavior: "smooth",
    });
  }
});

// Reveal sections
const revealSection = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  else entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2,
});

const hiddenSections = document.querySelectorAll("section");
hiddenSections.forEach((section) => {
  section.classList.add("section--hidden");
  sectionObserver.observe(section);
});

// Slider - go to slide
const slides = document.querySelectorAll(".slide");
const goToSlide = (position) => {
  // move slides
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - position)}%)`;
  });
  // active dot
  activeDot(position);
};

// Slider - dots
const activeDot = (() => {
  const dotsContainer = document.querySelector(".dots");
  // create dots
  slides.forEach((_, i) => {
    dotsContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
  // go to slide when clicking the dot
  dotsContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
    }
  });
  // active dot
  return (position) => {
    const dots = document.querySelectorAll(".dots__dot");
    dots.forEach((dot) => {
      dot.classList.remove("dots__dot--active");
    });
    const selectedDot = document.querySelector(
      `.dots__dot[data-slide="${position}"]`
    );
    selectedDot.classList.add("dots__dot--active");
  };
})();

// Slider - arrows
const nextSlide = (() => {
  let position = 0;
  goToSlide(position);

  return (next) => {
    if (next) {
      if (position === slides.length - 1) position = 0;
      else position++;
    } else {
      if (position === 0) position = slides.length - 1;
      else position--;
    }
    goToSlide(position);
  };
})();
const btnRight = document.querySelector(".slider__btn--right");
const btnLeft = document.querySelector(".slider__btn--left");
btnRight.addEventListener("click", () => nextSlide(true));
btnLeft.addEventListener("click", () => nextSlide(false));

// Slider - keydown
document.addEventListener("keydown", function (e) {
  e.key === "ArrowLeft" && nextSlide(false);
  e.key === "ArrowRight" && nextSlide(true);
});
