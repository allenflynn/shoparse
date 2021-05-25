const btnScroll = document.querySelector(".btn--scroll");
const features = document.querySelector(".features");
btnScroll.addEventListener("click", function (e) {
  const featuresRect = features.getBoundingClientRect();
  window.scroll({
    left: 0,
    top: featuresRect.top + window.pageYOffset,
    behavior: "smooth",
  });
  //   features.scrollIntoView({ behavior: "smooth" });
});

document.querySelector(".nav__items").addEventListener("click", function (e) {
  e.preventDefault();
  console.log(e.target);

  if (e.target.classList.contains("nav__link")) {
    // console.log("link");
    const id = e.target.getAttribute("href");
    // console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});
