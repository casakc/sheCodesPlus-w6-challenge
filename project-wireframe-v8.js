//Clock
let now = new Date();
let timeElement = document.querySelector("#time1");
let dateElement = document.querySelector("#date1");

let hour = now.getHours();
let formattedHour = String(hour).padStart(2, "0");

let minutes = now.getMinutes();
let formattedMinutes = String(minutes).padStart(2, "0");

let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = weekDays[now.getDay()];

let date = now.getDate();
let formattedDate = String(date).padStart(2, "0");

let yearMonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = yearMonths[now.getMonth()];

let year = now.getFullYear();

timeElement.textContent = `${formattedHour}:${formattedMinutes}`;
dateElement.textContent = `${day}, ${formattedDate} ${month} ${year}`;

let btnFooter = document.querySelector(".btn-footer");

btnFooter.onmouseover = function () {
  let hour = now.getHours();
  let ampm = hour >= 12 ? "pm" : "am";
  hour = hour % 12;
  hour = hour ? hour : 12;
  let formattedHour = String(hour).padStart(2, "0");
  timeElement.textContent = `${formattedHour}:${formattedMinutes} ${ampm}`;
  dateElement.textContent = `${day}, ${month} ${formattedDate}, ${year}`;
};

btnFooter.onmouseout = function () {
  timeElement.textContent = `${formattedHour}:${formattedMinutes}`;
  dateElement.textContent = `${day}, ${formattedDate} ${month} ${year}`;
};

//City Search
let form = document.querySelector("#search-city");
let submitted = false;
function searchCity(event) {
  event.preventDefault();
  let searchCityInput = document.querySelector("#search-city-input");
  let city = document.querySelector("#city");
  if (searchCityInput.value) {
    let cityName = searchCityInput.value;
    cityName = cityName.toUpperCase();
    city.innerHTML = cityName;
    submitted = true;
  } else {
    if (submitted) {
      alert(`Please type your city in "Type location to search" field`);
    }
    city.innerHTML = null;
  }
}
form.addEventListener("submit", searchCity);

//City temperature (axios + openweathermap)
function displayCity() {
  let apiKey = "b31489b6a38f5981f00c766b15c5856b";
  let units = "metric";
  let searchCityInput = document.querySelector("#search-city-input");
  let cityName = searchCityInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then((response) => {
    let cityName = response.data.name.toUpperCase();
    let cityElement = document.querySelector("p");
    cityElement.innerHTML = cityName;
    let minTemperature = Math.round(response.data.main.temp_min);
    let maxTemperature = Math.round(response.data.main.temp_max);
    let minToday = document.querySelector("#min-today");
    minToday.innerHTML = `${minTemperature}ºC`;
    let maxToday = document.querySelector("#max-today");
    maxToday.innerHTML = `${maxTemperature}ºC`;
    let winToday = document.querySelector("#wind-today");
    winToday.innerHTML = `${response.data.wind.speed} m/s wind`;
    let humToday = document.querySelector("#humidity-today");
    humToday.innerHTML = `${response.data.main.humidity}% humidity`;
  });
}
let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", displayCity);

//Geolocation
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "5fc80f22e10a8e8324900ac4fe77687f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then((response) => {
    let cityName = response.data.name.toUpperCase();
    let cityElement = document.querySelector("p");
    cityElement.innerHTML = cityName;
    let minTemperature = Math.round(response.data.main.temp_min);
    let maxTemperature = Math.round(response.data.main.temp_max);
    let minToday = document.querySelector("#min-today");
    minToday.innerHTML = `${minTemperature}ºC`;
    let maxToday = document.querySelector("#max-today");
    maxToday.innerHTML = `${maxTemperature}ºC`;
    let winToday = document.querySelector("#wind-today");
    winToday.innerHTML = `${response.data.wind.speed} m/s wind`;
    let humToday = document.querySelector("#humidity-today");
    humToday.innerHTML = `${response.data.main.humidity}% humidity`;
  });
}
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(showPosition);
});

//Temperature
let isCelsius = true;
function displayMinTemperature(temp, unit) {
  if (unit === "C") {
    return "min" + " " + temp + " ºC (ºF)";
  } else if (unit === "F") {
    return "min" + " " + ((temp * 9) / 5 + 32) + " ºF (ºC)";
  }
}

let temp2 = 15;
let minFriday = document.getElementById("min-friday");
minFriday.innerHTML = displayMinTemperature(temp2, "C");
minFriday.addEventListener("click", function () {
  if (isCelsius) {
    minFriday.innerHTML = displayMinTemperature(temp2, "F");
    isCelsius = false;
  } else {
    minFriday.innerHTML = displayMinTemperature(temp2, "C");
    isCelsius = true;
  }
});

let temp3 = 15;
let minSaturday = document.getElementById("min-saturday");
minSaturday.innerHTML = displayMinTemperature(temp3, "C");
minSaturday.addEventListener("click", function () {
  if (isCelsius) {
    minSaturday.innerHTML = displayMinTemperature(temp3, "F");
    isCelsius = false;
  } else {
    minSaturday.innerHTML = displayMinTemperature(temp3, "C");
    isCelsius = true;
  }
});

let temp4 = 17;
let minSunday = document.getElementById("min-sunday");
minSunday.innerHTML = displayMinTemperature(temp4, "C");
minSunday.addEventListener("click", function () {
  if (isCelsius) {
    minSunday.innerHTML = displayMinTemperature(temp4, "F");
    isCelsius = false;
  } else {
    minSunday.innerHTML = displayMinTemperature(temp4, "C");
    isCelsius = true;
  }
});

let temp5 = 18;
let minMonday = document.getElementById("min-monday");
minMonday.innerHTML = displayMinTemperature(temp5, "C");
minMonday.addEventListener("click", function () {
  if (isCelsius) {
    minMonday.innerHTML = displayMinTemperature(temp5, "F");
    isCelsius = false;
  } else {
    minMonday.innerHTML = displayMinTemperature(temp5, "C");
    isCelsius = true;
  }
});

let temp6 = 16;
let minTuesday = document.getElementById("min-tuesday");
minTuesday.innerHTML = displayMinTemperature(temp6, "C");
minTuesday.addEventListener("click", function () {
  if (isCelsius) {
    minTuesday.innerHTML = displayMinTemperature(temp6, "F");
    isCelsius = false;
  } else {
    minTuesday.innerHTML = displayMinTemperature(temp6, "C");
    isCelsius = true;
  }
});

let temp7 = 17;
let minWednesday = document.getElementById("min-wednesday");
minWednesday.innerHTML = displayMinTemperature(temp7, "C");
minWednesday.addEventListener("click", function () {
  if (isCelsius) {
    minWednesday.innerHTML = displayMinTemperature(temp7, "F");
    isCelsius = false;
  } else {
    minWednesday.innerHTML = displayMinTemperature(temp7, "C");
    isCelsius = true;
  }
});

function displayMaxTemperature(temp, unit) {
  if (unit === "C") {
    return "max" + " " + temp + " ºC (ºF)";
  } else if (unit === "F") {
    return "max" + " " + ((temp * 9) / 5 + 32) + " ºF (ºC)";
  }
}

let temp21 = 29;
let maxFriday = document.getElementById("max-friday");
maxFriday.innerHTML = displayMaxTemperature(temp21, "C");
maxFriday.addEventListener("click", function () {
  if (isCelsius) {
    maxFriday.innerHTML = displayMaxTemperature(temp21, "F");
    isCelsius = false;
  } else {
    maxFriday.innerHTML = displayMaxTemperature(temp21, "C");
    isCelsius = true;
  }
});

let temp31 = 30;
let maxSaturday = document.getElementById("max-saturday");
maxSaturday.innerHTML = displayMaxTemperature(temp31, "C");
maxSaturday.addEventListener("click", function () {
  if (isCelsius) {
    maxSaturday.innerHTML = displayMaxTemperature(temp31, "F");
    isCelsius = false;
  } else {
    maxSaturday.innerHTML = displayMaxTemperature(temp31, "C");
    isCelsius = true;
  }
});

let temp41 = 29;
let maxSunday = document.getElementById("max-sunday");
maxSunday.innerHTML = displayMaxTemperature(temp41, "C");
maxSunday.addEventListener("click", function () {
  if (isCelsius) {
    maxSunday.innerHTML = displayMaxTemperature(temp41, "F");
    isCelsius = false;
  } else {
    maxSunday.innerHTML = displayMaxTemperature(temp41, "C");
    isCelsius = true;
  }
});

let temp51 = 27;
let maxMonday = document.getElementById("max-monday");
maxMonday.innerHTML = displayMaxTemperature(temp51, "C");
maxMonday.addEventListener("click", function () {
  if (isCelsius) {
    maxMonday.innerHTML = displayMaxTemperature(temp51, "F");
    isCelsius = false;
  } else {
    maxMonday.innerHTML = displayMaxTemperature(temp51, "C");
    isCelsius = true;
  }
});

let temp61 = 27;
let maxTuesday = document.getElementById("max-tuesday");
maxTuesday.innerHTML = displayMaxTemperature(temp61, "C");
maxTuesday.addEventListener("click", function () {
  if (isCelsius) {
    maxTuesday.innerHTML = displayMaxTemperature(temp61, "F");
    isCelsius = false;
  } else {
    maxTuesday.innerHTML = displayMaxTemperature(temp61, "C");
    isCelsius = true;
  }
});

let temp71 = 27;
let maxWednesday = document.getElementById("max-wednesday");
maxWednesday.innerHTML = displayMaxTemperature(temp71, "C");
maxWednesday.addEventListener("click", function () {
  if (isCelsius) {
    maxWednesday.innerHTML = displayMaxTemperature(temp71, "F");
    isCelsius = false;
  } else {
    maxWednesday.innerHTML = displayMaxTemperature(temp71, "C");
    isCelsius = true;
  }
});

//Rain
function showHumidityToday() {
  let humToday = document.querySelector("#humidity-today");
  let tempToday = document.querySelector("#temperature-today");
  let windToday = document.querySelector("#wind-today");
  humToday.style.display = "block";
  tempToday.style.display = "none";
  windToday.style.display = "none";
}

function hideHumidityToday() {
  let humToday = document.querySelector("#humidity-today");
  let tempToday = document.querySelector("#temperature-today");
  let windToday = document.querySelector("#wind-today");
  humToday.style.display = "none";
  tempToday.style.display = "block";
  windToday.style.display = "block";
}

let weatherTodaySymbol = document.querySelector("button.emoji-today");
weatherTodaySymbol.addEventListener("mouseover", showHumidityToday);
weatherTodaySymbol.addEventListener("mouseout", hideHumidityToday);
