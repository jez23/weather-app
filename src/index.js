let apiKey = "";
let day = new Date();

let daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesady",
  "Thursday",
  "Friday",
  "Saturday",
];

let dayOfWeek = daysOfWeek[day.getDay()];
let hours = day.getHours();
let minutes = day.getMinutes();
let name;
let temperature = 18;

function showCurrentCity(evt) {
  evt.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let h1 = document.querySelector(".h1");

function greetings() {
  name = prompt("Hello! What's your name?");
  if (name === null || name === "") {
    greetings();
  } else {
    showKyiv();
  }
}

const addEventListeners = () => {
  let temperatureCelsium = document.querySelector("#celsius");
  let temperatureFahrenheit = document.querySelector("#fahrenheit");
  temperatureCelsium.addEventListener("click", convertToCelsium);
  temperatureFahrenheit.addEventListener("click", convertToFahrenheit);
};

function showKyiv() {
  h1.innerHTML = `<h1>
  ${name},
  <br />
  Welcome to
  <br />
  <span id='currentCity'>Kyiv</span>
  <br />
  </h1>
  <h2>
  ${temperature}
  </h2>
  <button id='celsius'>°C</button>
  / <button id='fahrenheit'>°F</button>
  `;

  addEventListeners();
}

function getTemperature(response) {
  temperature = Math.round(response.data.main.temp);
  convertToCelsium();
  let celsiumDegree = document.querySelector("h2");
  celsiumDegree.innerHTML = temperature;
  currentCity.innerHTML = response.data.name;
}

function convertToCelsium() {
  let tempDegree = document.querySelector("h2");
  tempDegree.innerHTML = temperature;
}

function convertToFahrenheit() {
  let tempDegree = document.querySelector("h2");
  tempDegree.innerHTML = 65;
}

function showNewCity(evt) {
  evt.preventDefault();
  if (searchInput.value === "") {
    alert("Write city please");
  } else {
    currentCity.innerHTML = `
  ${searchInput.value}
  `;
    getWeatherByCity(searchInput.value);
  }
}

function getWeatherByCity(city) {
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(weatherUrl).then(getTemperature);
}

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  axios.get(weatherUrl).then(getTemperature);
}

let currentDay = document.querySelector(".current h3");
currentDay.innerHTML = `${dayOfWeek} ${hours}:${minutes}<br />Sunny`;

let searchInput = document.querySelector("#searchInput");
let form = document.querySelector("form");
let btnSearch = document.querySelector(".btns .btn-search");
let btnCurrent = document.querySelector(".btns .btn-current");
btnSearch.addEventListener("click", showNewCity);
btnCurrent.addEventListener("click", showCurrentCity);

greetings();
