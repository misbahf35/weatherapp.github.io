  const apiKey = '8c218319d2e14d43dc1328beab1007d1'; 

    window.onload = function () {
      const savedCity = localStorage.getItem('lastCity');
      if (savedCity) {
        document.getElementById('cityInput').value = savedCity;
        getWeather();
      }
    };

    function getWeather() {
      const city = document.getElementById("cityInput").value.trim();
      if (!city) return;

      localStorage.setItem('lastCity', city);

      document.getElementById("spinner").style.display = "block";

      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
          document.getElementById("spinner").style.display = "none";

          if (data.cod !== 200) {
            alert("City not found!");
            return;
          }

          const name = data.name;
          const weather = data.weather[0];
          const icon = getWeatherIcon(weather.main);
          const desc = weather.description;
          const temp = data.main.temp.toFixed(2);
          const humidity = data.main.humidity;
          const windSpeed = data.wind.speed;

          document.getElementById("cityName").innerText = name;
          document.getElementById("weatherIcon").innerText = icon;
          document.getElementById("description").innerText = capitalize(desc);
          document.getElementById("temp").innerHTML = `🌡️ Temperature: ${temp}°C`;
          document.getElementById("humidity").innerHTML = `💧 Humidity: ${humidity}%`;
          document.getElementById("wind").innerHTML = `💨 Wind Speed: ${windSpeed} m/s`;

          document.body.style.backgroundImage = `url('${getBackground(desc)}')`;
        })
        .catch(err => {
          document.getElementById("spinner").style.display = "none";
          alert("Something went wrong!");
        });
    }

    function getBackground(condition) {
      const lower = condition.toLowerCase();
      if (lower.includes("clear")) return "clear.png";
      if (lower.includes("cloud")) return "cloudy.png";
      if (lower.includes("rain")) return "rainy.jpeg";
      if (lower.includes("snow")) return "snow.jpg";

      return "rainbow.jpg";
    }

    function getWeatherIcon(main) {
      switch (main.toLowerCase()) {
        case "clear": return "☀️";
        case "clouds": return "☁️";
        case "rain": return "🌧️";
        case "snow": return "❄️";
        case "thunderstorm": return "⛈️";
        case "drizzle": return "🌦️";
        case "mist": return "🌫️";
        default: return "⛅";
      }
    }

    function capitalize(text) {
      return text.split(" ").map(word => word[0].toUpperCase() + word.slice(1)).join(" ");
    }