"use strict";

const searchBtn = document.querySelector(".search");
const inputLocation = document.getElementById("location");
const elements = document.querySelector(".elements");
const sideimg = document.querySelector(".side-img img");
const apiKey = "21d9bcad2b2079b2c7e9be9fb2e8e803";
const body = document.querySelector("body");
const loadWeather = function () {
  if (inputLocation.value !== "") {
    const city = inputLocation.value.toLowerCase();
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    inputLocation.value = "";
    fetch(apiURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error status :${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        document.querySelector(".temp").textContent = Math.trunc(
          data.main.temp - 273.15
        );
        const weatherDesc = data.weather[0].main;
        let iconName;
        switch (weatherDesc.toLowerCase()) {
          case "drizzle":
            iconName = "drizzle.gif";
            body.className = "";
            body.classList.add("rain");
            sideimg.src = "weather-img/rain.jpg";
            break;
          case "mist":
            iconName = "mist.gif";
            body.className = "";
            body.classList.add("haze");
            sideimg.src = "weather-img/mist.jpg";
            break;
          case "clear":
            iconName = "sunny.gif";
            body.className = "";
            body.classList.add("orange");
            sideimg.src = "weather-img/clear.jpg";
            break;
          case "clouds":
            iconName = "clouds.png";
            body.className = "";
            body.classList.add("blue");
            sideimg.src = "weather-img/clouds.jpg";
            break;
          case "rain":
            iconName = "rain.gif";
            body.className = "";
            body.classList.add("rain");
            sideimg.src = "weather-img/rain.jpg";
            break;
          case "snow":
            iconName = "snow.gif";
            body.className = "";
            body.classList.add("snow");
            sideimg.src = "weather-img/snow.jpg";
            break;
          case "haze":
            iconName = "haze.gif";
            body.className = "";
            body.classList.add("haze");
            sideimg.src = "weather-img/haze.jpg";
            break;
          case "thunderstorm":
            iconName = "thunderstorm.gif";
            body.className = "";
            body.classList.add("haze");
            sideimg.src = "weather-img/thunderstorm.jpg";
            break;
          // ... add more cases for other weather conditions
          default:
            iconName = "unknown.png";
            sideimg.src = "weather-img/mist.jpg"; // Default icon if no match found
        }
        document.querySelector("#wth-icon").src = `icons/${iconName}`;

        document.querySelector(".wth-desc").textContent = weatherDesc;

        document.querySelector(".city").textContent = data.name;
        document.querySelector(
          ".humidity-desc"
        ).textContent = `${data.main.humidity}%`;
        document.querySelector(
          ".pressure-desc"
        ).textContent = `${data.main.pressure} hPa`;
        document.querySelector(
          ".sea-level-desc"
        ).textContent = `${data.main.sea_level} hPa`;
        document.querySelector(".feels-like-desc").textContent = `${Math.trunc(
          data.main.feels_like - 273.15
        )} ºC`;
      })
      .catch((error) => {
        document.querySelector(".wth-desc").textContent = "";

        document.querySelector(".city").textContent = "";
        document.querySelector(".humidity-desc").textContent = "";
        document.querySelector(".pressure-desc").textContent = "";
        document.querySelector(".sea-level-desc").textContent = "";
        document.querySelector(".feels-like-desc").textContent = "";
        document.querySelector(".temp").textContent = "";
        document.querySelector("#wth-icon").src = "";
      });
  }
};

searchBtn.addEventListener("click", () => {
  loadWeather();
});

inputLocation.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.keyCode === 13) {
    // Corrected condition
    loadWeather();
  }
});
