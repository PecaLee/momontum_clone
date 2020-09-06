const body = document.querySelector("body"),
  imgWrapper = body.querySelector(".bgImageWrapper");

const IMG_NUMBER = 5;

function paintImg(imgNumber) {
  const image = new Image();
  image.src = `src/img/${
    imgNumber + 1 < 10 ? `0${imgNumber + 1}` : imgNumber + 1
  }.jpg`;
  image.classList.add("bgImage");
  imgWrapper.prepend(image);
}

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = genRandom();
  paintImg(randomNumber);
}

init();
