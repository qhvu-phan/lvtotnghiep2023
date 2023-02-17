const slider = document.querySelector(".slider");
const sliderMain = document.querySelector(".slider-main");
const sliderItem = document.querySelectorAll(".slider-item");
const nextBtn = document.querySelector(".slider-next");
const prevBtn = document.querySelector(".slider-prev");
const dotItem = document.querySelectorAll(".slider-dot-item");
const sliderItemsWidth = sliderItem[0].offsetWidth;
console.log(sliderItemsWidth);
const sliderLength = sliderItem.length;
let postionX = 0;
let index = 0;
[...dotItem].forEach((item) => {
  item.addEventListener("click", (e) => {
    [...dotItem].forEach((element) => {
      element.classList.remove("active");
    });
    prevBtn.style = `display: hide`;
    nextBtn.style = `display: hide`;
    e.target.classList.add("active");
    const slideIndex = parseInt(e.target.dataset.index);
    index = slideIndex;
    postionX = -1 * index * sliderItemsWidth;
    sliderMain.style = `transform: translateX(${postionX}px)`;
  });
});
nextBtn.addEventListener("click", () => {
  handleChangeSlide(1);
});
prevBtn.addEventListener("click", () => {
  handleChangeSlide(-1);
});
function handleChangeSlide(direction) {
  if (direction === 1) {
    if (index >= sliderLength - 1) {
      index = sliderLength - 1;
      nextBtn.style = `display: none`;
      return;
    }
    prevBtn.style = `display: hide`;
    postionX = postionX - sliderItemsWidth;
    sliderMain.style = `transform: translateX(${postionX}px)`;
    index++;
  } else if (direction === -1) {
    if (index <= 0) {
      index = 0;
      prevBtn.style = `display: none`;
      return;
    }
    nextBtn.style = `display: hide`;
    postionX = postionX + sliderItemsWidth;
    sliderMain.style = `transform: translateX(${postionX}px)`;
    index--;
  }
  [...dotItem].forEach((element) => {
    element.classList.remove("active");
  });
  dotItem[index].classList.add("active");
}
