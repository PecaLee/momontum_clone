const clockDiv = document.querySelector(".clock"),
    clock = clockDiv.querySelector("h1");

function getTime() {
    const date = new Date();
    const mHours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds();
    let amPm, hours;
    if (mHours < 12) {
        amPm = "AM";
    } else {
        amPm = "PM";
    }
    if (mHours > 12) {
        hours = mHours - 12;
    } else {
        hours = mHours;
    }

    const zHours = `${hours < 10 ? `0${hours}` : hours}`,
        zMinutes = `${minutes < 10 ? `0${minutes}` : minutes}`,
        zSeconds = `${seconds < 10 ? `0${seconds}` : seconds}`;
    clock.innerText = `${amPm} ${zHours}:${zMinutes}:${zSeconds}`;
}

function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();
