const apikey = "02af08d2fa1a002056554dc3ea31eb0a";
const apiURL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input"); // tag selector
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  try {
    const response = await fetch(apiURL + city + `&appid=${apikey}`);

    if (!response.ok) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
      return;
    }

    const data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";

    // Weather condition mapping
    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "weather/clowdy.jpg";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "weather/sunny.jpg";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "weather/rainy.jpg";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "weather/rainy.jpg";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "weather/rainy.jpg";
    } else if (data.weather[0].main == "Snow") {
      weatherIcon.src = "weather/snowy.jpg";
    }

   } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

// Handle button click
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

// Handle "Enter" key press
searchBox.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    checkWeather(searchBox.value);
  }
});
