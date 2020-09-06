const nameDiv = document.querySelector(".name"),
  nameForm = nameDiv.querySelector(".nameForm"),
  nameInput = nameForm.querySelector("input"),
  greetings = nameDiv.querySelector("h3");

const USER_NAME = "userName",
  SHOW_ELEMENT = "showing";

function saveUser(value) {
  localStorage.setItem(USER_NAME, value);
}

function getTime() {
  const date = new Date();
  const hours = date.getHours();
  return hours;
}

function greetingComents() {
  const hours = getTime();
  let greetingComents;
  if (4 < hours && hours < 12) {
    greetingComents = "Good morning!";
  } else if (12 <= hours && hours < 17) {
    greetingComents = "Good afternoon!";
  } else if (17 <= hours && hours < 21) {
    greetingComents = "Good evening!";
  } else {
    greetingComents = "Good night!";
  }
  return greetingComents;
}

function paintUser() {
  nameForm.classList.remove(SHOW_ELEMENT);
  greetings.classList.add(SHOW_ELEMENT);
  const userName = localStorage.getItem(USER_NAME),
    greetingComent = greetingComents();
  greetings.innerText = `${greetingComent} ${userName}`;
}

function handleSubmit(event) {
  event.preventDefault();
  const userName = nameInput.value;
  saveUser(userName);
  paintUser();
}

function askUserName() {
  nameForm.classList.add(SHOW_ELEMENT);
  nameForm.addEventListener("submit", handleSubmit);
}

function loadName() {
  const userName = localStorage.getItem(USER_NAME);
  if (userName === null) {
    askUserName();
  } else {
    paintUser();
  }
}

function init() {
  loadName();
}

init();
