const API_KEY = "89f082f83e2e7abb7598a7a6a78182b3";
const COORDS = "coords";

const weatherDiv = document.querySelector(".weather"),
    weather = weatherDiv.querySelector(".weatherSpan");

function weatherImg(iconName) {
    const img = new Image();
    img.src = `http://openweathermap.org/img/wn/${iconName}@2x.png`;
    img.classList.add("weatherIcon");
    weatherDiv.prepend(img);
}

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        .then(function (Response) {
            return Response.json();
        })
        .then(function (json) {
            const temp = json.main.temp;
            const location = json.name;
            const locWeather = json.weather[0].main;
            const icon = json.weather[0].icon;
            weatherImg(icon);
            weather.innerText = `${temp}°C, @${location}, ${locWeather}`;
        });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude,
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("Cant access geo location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();
