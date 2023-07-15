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
    if (submitted && searchCityInput.value === "") {
      alert(`Please type your city in "Type location to search" field`);
    }
    city.innerHTML = null;
  }
}
form.addEventListener("submit", searchCity);

//City temperature (axios + openweathermap)
function formatDay(timestamp, index) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];
  if (index === 0) {
    return "TODAY";
  } else if (index === 1) {
    return "TOMORROW";
  } else {
    return days[day];
  }
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row gy-3 forecast-day">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 7) {
      forecastHTML =
        forecastHTML +
        `
        <div class="row gy-3 forecast-day">
         <div class="col-2">
          <button class="emoji-today">
            <span class="align" id="weather-today-symbol">🌡️</span
            ><span class="add-label" id="rain-today-symbol">☔</span>
          </button>
        </div>

        <div class="col-10">
          ${formatDay(forecastDay.dt, index)}<br />
          <div class="row">
            <div class="col-6">
              <span class="description-today"
                ><img src="https://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" style="width: 20px; height: 20px;"
                id="icon" />${
                  forecastDay.weather[0].description.charAt(0).toUpperCase() +
                  forecastDay.weather[0].description.slice(1)
                }</span
              >
               <span class="humidity-today">${
                 forecastDay.humidity
               }% humidity</span>
            </div>

            <div class="col-6">
              <span class="temperature-today"
                ><a href="#" id="min-ºC"
                  ><span style="color: blue" id="min-today">${Math.round(
                    forecastDay.temp.min
                  )}ºC (ºF)</span></a
                >
                |
                <a href="#" id="max-ºC"
                  ><span style="color: red" id="max-today">${Math.round(
                    forecastDay.temp.max
                  )}ºC (ºF)</span></a
                ></span
              >
              <span class="wind-today">${Math.round(
                forecastDay.wind_speed
              )} km/h wind</span>
            </div>
          </div>
        </div>
      </div>`;
    }
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
  });

  function showHumidityToday(event) {
    let forecastDayElement = event.target.closest(".forecast-day");
    let humToday = forecastDayElement.querySelector(".humidity-today");
    let tempToday = forecastDayElement.querySelector(".temperature-today");
    let descToday = forecastDayElement.querySelector(".description-today");
    let windToday = forecastDayElement.querySelector(".wind-today");
    humToday.style.display = "block";
    windToday.style.display = "block";
    descToday.style.display = "none";
    tempToday.style.display = "none";
  }

  function hideHumidityToday(event) {
    let forecastDayElement = event.target.closest(".forecast-day");
    let humToday = forecastDayElement.querySelector(".humidity-today");
    let tempToday = forecastDayElement.querySelector(".temperature-today");
    let descToday = forecastDayElement.querySelector(".description-today");
    let windToday = forecastDayElement.querySelector(".wind-today");
    tempToday.style.display = "block";
    descToday.style.display = "block";
    humToday.style.display = "none";
    windToday.style.display = "none";
  }

  let weatherTodaySymbols = document.querySelectorAll("button.emoji-today");
  weatherTodaySymbols.forEach(function (weatherTodaySymbol) {
    weatherTodaySymbol.addEventListener("mouseover", showHumidityToday);
    weatherTodaySymbol.addEventListener("mouseout", hideHumidityToday);
  });
}

function getForecast(coordinates) {
  let apiKey = "84cdb393c35ed430bc2aca35b1f19f8a";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let cityName = response.data.name.toUpperCase();
  let cityElement = document.querySelector("p");

  cityElement.innerHTML = cityName;

  let winToday = document.querySelector(".wind-today");
  winToday.innerHTML = `${Math.round(
    response.data.wind.speed * 3.6
  )} km/h wind`;
  let humToday = document.querySelector(".humidity-today");
  humToday.innerHTML = `${response.data.main.humidity}% humidity`;

  let descToday = document.querySelector(".description-today");
  descToday.innerHTML = `<img src="https://openweathermap.org/img/wn/${
    response.data.weather[0].icon
  }@2x.png" style="width: 20px; height: 20px;"> ${
    response.data.weather[0].description.charAt(0).toUpperCase() +
    response.data.weather[0].description.slice(1)
  }`;

  let minTemperature = Math.round(response.data.main.temp_min);
  let maxTemperature = Math.round(response.data.main.temp_max);
  let minToday = document.querySelector("#min-today");
  minToday.innerHTML = `${minTemperature}ºC`;
  let maxToday = document.querySelector("#max-today");
  maxToday.innerHTML = `${maxTemperature}ºC`;
  minToday.innerHTML = `${minTemperature}ºC (ºF)`;
  maxToday.innerHTML = `${maxTemperature}ºC (ºF)`;
  function displayMinTemperature(temp, unit) {
    if (unit === "C") {
      return `${minTemperature}ºC (ºF)`;
    } else if (unit === "F") {
      return `${Math.round((minTemperature * 9) / 5 + 32)}ºF (ºC)`;
    }
  }
  function displayMaxTemperature(temp, unit) {
    if (unit === "C") {
      return `${maxTemperature}ºC (ºF)`;
    } else if (unit === "F") {
      return `${Math.round((maxTemperature * 9) / 5 + 32)}ºF (ºC)`;
    }
  }
  minToday.addEventListener("click", function () {
    if (isCelsius) {
      minToday.innerHTML = displayMinTemperature(minTemperature, "F");
      isCelsius = false;
    } else {
      minToday.innerHTML = displayMinTemperature(minTemperature, "C");
      isCelsius = true;
    }
  });

  maxToday.addEventListener("click", function () {
    if (isCelsius) {
      maxToday.innerHTML = displayMaxTemperature(maxTemperature, "F");
      isCelsius = false;
    } else {
      maxToday.innerHTML = displayMaxTemperature(maxTemperature, "C");
      isCelsius = true;
    }
  });
  getForecast(response.data.coord);
}

function displayCity() {
  let apiKey = "b31489b6a38f5981f00c766b15c5856b";
  let units = "metric";
  let searchCityInput = document.querySelector("#search-city-input");
  let cityName = searchCityInput.value;

  if (cityName === "") {
    alert(`Please type your city in "Type location to search" field`);
    return;
  }

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);
}

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", displayCity);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "b31489b6a38f5981f00c766b15c5856b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(showPosition);
});

window.addEventListener("load", () => {
  navigator.geolocation.getCurrentPosition(showPosition);
});

//Geolocation

/*function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "b31489b6a38f5981f00c766b15c5856b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then((response) => {
    let cityName = response.data.name.toUpperCase();
    let cityElement = document.querySelector("p");
    cityElement.innerHTML = cityName;

    let winToday = document.querySelector(".wind-today");
    winToday.innerHTML = `${Math.round(
      response.data.wind.speed * 3.6
    )} km/h wind`;
    let humToday = document.querySelector(".humidity-today");
    humToday.innerHTML = `${response.data.main.humidity}% humidity`;

    let descToday = document.querySelector(".description-today");
    descToday.innerHTML = `<img src="https://openweathermap.org/img/wn/${
      response.data.weather[0].icon
    }@2x.png" style="width: 20px; height: 20px;"> ${
      response.data.weather[0].description.charAt(0).toUpperCase() +
      response.data.weather[0].description.slice(1)
    }`;

    let isCelsius = true;
    let minTemperature = Math.round(response.data.main.temp_min);
    let maxTemperature = Math.round(response.data.main.temp_max);
    let minToday = document.querySelector("#min-today");
    let maxToday = document.querySelector("#max-today");
    minToday.innerHTML = `${minTemperature}ºC (ºF)`;
    maxToday.innerHTML = `${maxTemperature}ºC (ºF)`;

    function displayMinTemperature(temp, unit) {
      if (unit === "C") {
        return `${minTemperature}ºC (ºF)`;
      } else if (unit === "F") {
        return `${Math.round((minTemperature * 9) / 5 + 32)}ºF (ºC)`;
      }
    }
    function displayMaxTemperature(temp, unit) {
      if (unit === "C") {
        return `${maxTemperature}ºC (ºF)`;
      } else if (unit === "F") {
        return `${Math.round((maxTemperature * 9) / 5 + 32)}ºF (ºC)`;
      }
    }
    minToday.addEventListener("click", function () {
      if (isCelsius) {
        minToday.innerHTML = displayMinTemperature(minTemperature, "F");
        isCelsius = false;
      } else {
        minToday.innerHTML = displayMinTemperature(minTemperature, "C");
        isCelsius = true;
      }
    });

    maxToday.addEventListener("click", function () {
      if (isCelsius) {
        maxToday.innerHTML = displayMaxTemperature(maxTemperature, "F");
        isCelsius = false;
      } else {
        maxToday.innerHTML = displayMaxTemperature(maxTemperature, "C");
        isCelsius = true;
      }
    });
    function showHumidityToday() {
      let humToday = document.querySelector(".humidity-today");
      let tempToday = document.querySelector(".temperature-today");
      let descToday = document.querySelector(".description-today");
      let windToday = document.querySelector(".wind-today");
      humToday.style.display = "block";
      windToday.style.display = "block";
      descToday.style.display = "none";
      tempToday.style.display = "none";
    }

    function hideHumidityToday() {
      let humToday = document.querySelector(".humidity-today");
      let tempToday = document.querySelector(".temperature-today");
      let descToday = document.querySelector(".description-today");
      let windToday = document.querySelector(".wind-today");
      tempToday.style.display = "block";
      descToday.style.display = "block";
      humToday.style.display = "none";
      windToday.style.display = "none";
    }

    let weatherTodaySymbol = document.querySelector("button.emoji-today");
    weatherTodaySymbol.addEventListener("mouseover", showHumidityToday);
    weatherTodaySymbol.addEventListener("mouseout", hideHumidityToday);
  });
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(showPosition);
});

window.addEventListener("load", () => {
  navigator.geolocation.getCurrentPosition(showPosition);
});*/

//Humidity
/*function showHumidityToday() {
  let humToday = document.querySelector("#humidity-today");
  let tempToday = document.querySelector("#temperature-today");
  let descToday = document.querySelector("#description-today");
  let windToday = document.querySelector("#wind-today");
  humToday.style.display = "block";
  windToday.style.display = "block";
  descToday.style.display = "none";
  tempToday.style.display = "none";
}

function hideHumidityToday() {
  let humToday = document.querySelector("#humidity-today");
  let tempToday = document.querySelector("#temperature-today");
  let descToday = document.querySelector("#description-today");
  let windToday = document.querySelector("#wind-today");
  tempToday.style.display = "block";
  descToday.style.display = "block";
  humToday.style.display = "none";
  windToday.style.display = "none";
}

let weatherTodaySymbol = document.querySelector("button.emoji-today");
weatherTodaySymbol.addEventListener("mouseover", showHumidityToday);
weatherTodaySymbol.addEventListener("mouseout", hideHumidityToday);*/
