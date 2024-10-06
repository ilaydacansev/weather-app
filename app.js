function toggleDropdown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      dropdowns[i].classList.remove("show");
    }
  }
};

// const url = "https://api.openweathermap.org/data/2.5/";

// const key = "6a4d76c560f8c7925b99f1b3acb1c689";

// const setQuery = (e) => {
//   if (e.keyCode == "13") getResult(searchBar.value);
// };

// const getResult = (cityName) => {
//   let query = `${url}weather?q=${cityName}&appid=${key}&units=metric&lang=tr`;
//   fetch(query)
//     .then((weather) => {
//       return weather.json();
//     })
//     .then(displayResult);
// };

// const displayResult = (result) => {
//   let city = document.querySelector(".city");
//   city.innerText = `${result.name}, ${result.sys.country}   Hava Durumu`;

//   let temp = document.querySelector(".temp");
//   temp.innerText = `${Math.round(result.main.temp)}°C`;

//   let desc = document.querySelector(".desc");
//   desc.innerText = result.weather[0].description;

//   let minmax = document.querySelector(".minmax");
//   minmax.innerText = `En yüksek sıcaklık ${Math.round(
//     result.main.temp_min
//   )}°C    ⚫︎    En düşük sıcaklık ${Math.round(result.main.temp_max)}°C`;

//   let feel = document.querySelector(".feel");
//   feel.innerText = `Hissedilen ${Math.round(result.main.feels_like)}°C`;

//   let time = document.querySelector(".time");
//   time.innerText = `Bugün: ${result.weather[0].description}`;

//   let icon = document.querySelector(".weather-icon");
//   const weatherIconCode = result.weather[0].icon;
//   icon.src = `http://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;
// };

// const searchBar = document.getElementById("searchBar");
// searchBar.addEventListener("keypress", setQuery);

// function setActive(element) {
//   const guns = document.querySelectorAll(".day");
//   guns.forEach((day) => {
//     day.classList.remove("active"); // Diğer günlerden 'active' sınıfını kaldır
//   });
//   element.classList.add("active"); // Tıklanan elemana 'active' sınıfını ekle
// }

// !

const timeElement = document.getElementById("time");
const dateElement = document.getElementById("date");
const cityElement = document.getElementById("city");
const tempElement = document.getElementById("temp");
const descElement = document.getElementById("desc");
const more_info = document.getElementById("more_info");
const info = document.getElementById("information");

const key = `6a4d76c560f8c7925b99f1b3acb1c689`;
const url = "https://api.openweathermap.org/data/2.5/";

const setQuery = (e) => {
  if (e.key === "Enter") getResult(searchBar.value);
};

const getResult = (cityName) => {
  let query = `${url}weather?q=${cityName}&appid=${key}&units=metric&lang=tr`;
  fetch(query)
    .then((weather) => {
      if (!weather.ok) throw new Error("Şehir bulunamadı");
      return weather.json();
    })
    .then(displayResult)
    .catch((error) => {
      console.error(error);
      alert(error.message);
    });
};

const displayResult = (result) => {
  cityElement.innerText = `${result.name}, ${result.sys.country}   Hava Durumu`;
  tempElement.innerText = `${Math.round(result.main.temp)}°C`;
  descElement.innerText = result.weather[0].description;

  let icon = document.querySelector(".weather-icon");
  const forecast = result.weather[0];
  icon.src = `https://openweathermap.org/img/wn/${forecast.icon}@2x.png`;

  showWeatherData(result);
};

const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("keypress", setQuery);

const monthsOfYear = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];

const daysOfWeek = [
  "Pazar",
  "Pazartesi",
  "Salı",
  "Çarşamba",
  "Perşembe",
  "Cuma",
  "Cumartesi",
];

setInterval(() => {
  const time = new Date();
  const month = monthsOfYear[time.getMonth()];
  const date = time.getDate();
  const day = daysOfWeek[time.getDay()];
  const hour = time.getHours();
  const minutes = time.getMinutes();

  timeElement.innerHTML = `${hour < 10 ? "0" + hour : hour}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;
  dateElement.innerHTML = `${day}, ${date} ${month}`;
}, 500);

// !

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success, error);
} else {
  temp.innerHTML = "Geolocation desteği yok.";
}

function success(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ağ yanıtı hatalı.");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data); // API'den gelen yanıtı kontrol et
      if (data.main && data.main.temp) {
        temp.innerHTML = ` ${Math.round(data.main.temp)} °C`;

        const humidity = data.main.humidity;
        const feels_like = data.main.feels_like;
        const temp_max = data.main.temp_max;
        const temp_min = data.main.temp_min;

        // descElement.innerText = result.weather[0].description;

        const sunriseTimestamp = data.sys.sunrise;
        const sunsetTimestamp = data.sys.sunset;

        const sunriseTime = sunriseTimestamp
          ? new Date(sunriseTimestamp * 1000).toLocaleTimeString("tr-TR", {
              timeZone: "Europe/Istanbul",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "Geçersiz zaman";

        const sunsetTime = sunsetTimestamp
          ? new Date(sunsetTimestamp * 1000).toLocaleTimeString("tr-TR", {
              timeZone: "Europe/Istanbul",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "Geçersiz zaman";

        descElement.innerHTML = `<div>${data.weather[0].description}</div>`;

        let icon = document.querySelector(".weather-icon");
        const forecast = data.weather[0];
        icon.src = `https://openweathermap.org/img/wn/${forecast.icon}@2x.png`;

        more_info.innerHTML = `
          <div class="weather-item">Hissedilen <span>${Math.round(
            feels_like
          )}°C</span></div>
          <div class="weather-item">Ortalama Nem <span>${Math.round(
            humidity
          )}%</span></div>
          <div class="weather-item">Gün Doğumu <span>${sunriseTime}</span></div>
          <div class="weather-item">Gün Batımı <span>${sunsetTime}</span></div>
          <div class="weather-item">En yüksek sıcaklık <span>${Math.round(
            temp_max
          )}°C</span></div>
          <div class="weather-item">En düşük sıcaklık <span>${Math.round(
            temp_min
          )}°C</span></div>
        `;
      } else {
        temp.innerHTML = "Sıcaklık bilgisi alınamadı.";
      }
    })
    .catch((err) => {
      temp.innerHTML = "Hava durumu verileri alınamadı.";
      console.error(err);
    });
}

function error(err) {
  console.error(err);
  temp.innerHTML = "Konum alınamadı.";
}

// !

function showWeatherData(data) {
  const humidity = data.main.humidity;
  const feels_like = data.main.feels_like;
  const temp_max = data.main.temp_max;
  const temp_min = data.main.temp_min;

  const sunriseTimestamp = data.sys.sunrise;
  const sunsetTimestamp = data.sys.sunset;

  const sunriseTime = sunriseTimestamp
    ? new Date(sunriseTimestamp * 1000).toLocaleTimeString("tr-TR", {
        timeZone: "Europe/Istanbul",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Geçersiz zaman";

  const sunsetTime = sunsetTimestamp
    ? new Date(sunsetTimestamp * 1000).toLocaleTimeString("tr-TR", {
        timeZone: "Europe/Istanbul",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Geçersiz zaman";

  more_info.innerHTML = `
        <div class="weather-item">Hissedilen <span>${Math.round(
          feels_like
        )}°C</span></div>
        <div class="weather-item">Ortalama Nem <span>${Math.round(
          humidity
        )}%</span></div>
        <div class="weather-item">Gün Doğumu <span>${sunriseTime}</span></div>
        <div class="weather-item">Gün Batımı <span>${sunsetTime}</span></div>
        <div class="weather-item">En yüksek sıcaklık <span>${Math.round(
          temp_max
        )}°C</span></div>
        <div class="weather-item">En düşük sıcaklık <span>${Math.round(
          temp_min
        )}°C</span></div>
    `;
}

// const timeElement = document.getElementById("time");
// const dateElement = document.getElementById("date");
// const city = document.getElementById("city");
// const temp = document.getElementById("temp");
// const desc = document.getElementById("desc");
// const days = document.getElementById("days");
// const days_info = document.getElementById("days-info");
// const dayElement = document.getElementById("day");

// const key = "6a4d76c560f8c7925b99f1b3acb1c689";
// const url = "https://api.openweathermap.org/data/2.5/";

// const setQuery = (e) => {
//   if (e.key === "Enter") getResult(searchBar.value);
// };

// const getResult = (cityName) => {
//   let query = `${url}weather?q=${cityName}&appid=${key}&units=metric&lang=tr`;
//   fetch(query)
//     .then((weather) => {
//       if (!weather.ok) throw new Error("Şehir bulunamadı");
//       return weather.json();
//     })
//     .then(displayResult)
//     .catch((error) => {
//       console.error(error);
//       alert(error.message);
//     });
// };

// const getForecast = (latitude, longitude) => {
//   let query = `${url}forecast?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric&lang=tr`;
//   fetch(query)
//     .then((response) => {
//       if (!response.ok) throw new Error("Veri alınamadı");
//       return response.json();
//     })
//     .then(displayForecastResult)
//     .catch((error) => {
//       console.error(error);
//       alert(error.message);
//     });
// };

// const displayResult = (result) => {
//   let city = document.querySelector(".city");
//   city.innerText = `${result.name}, ${result.sys.country}   Hava Durumu`;

//   let temp = document.querySelector(".temp");
//   temp.innerText = `${Math.round(result.main.temp)}°C`;

//   let desc = document.querySelector(".desc");
//   desc.innerText = result.weather[0].description;

//   let icon = document.querySelector(".weather-icon");
//   const forecast = result.weather[0];
//   icon.src = `https://openweathermap.org/img/wn/${forecast.icon}@2x.png`;
// };

// const searchBar = document.getElementById("searchBar");
// searchBar.addEventListener("keypress", setQuery);

// function setActive(element) {
//   const guns = document.querySelectorAll(".day");
//   guns.forEach((day) => {
//     day.classList.remove("active");
//   });
//   element.classList.add("active");
// }

// const daysOfWeek = [
//   "Pazar",
//   "Pazartesi",
//   "Salı",
//   "Çarşamba",
//   "Perşembe",
//   "Cuma",
//   "Cumartesi",
// ];

// const monthsOfYear = [
//   "Ocak",
//   "Şubat",
//   "Mart",
//   "Nisan",
//   "Mayıs",
//   "Haziran",
//   "Temmuz",
//   "Ağustos",
//   "Eylül",
//   "Ekim",
//   "Kasım",
//   "Aralık",
// ];

// setInterval(() => {
//   const time = new Date();
//   const month = monthsOfYear[time.getMonth()];
//   const date = time.getDate();
//   const day = daysOfWeek[time.getDay()];
//   const hour = time.getHours();
//   const minutes = time.getMinutes();

//   timeElement.innerHTML = `${hour < 10 ? "0" + hour : hour}:${
//     minutes < 10 ? "0" + minutes : minutes
//   }`;

//   dateElement.innerHTML = `${day}, ${date} ${month}`;
// }, 500);

// getWeatherData();

// const more_info = document.getElementById("more_info");

// function getWeatherData() {
//   navigator.geolocation.getCurrentPosition((success) => {
//     let { latitude, longitude } = success.coords;

//     fetch(
//       `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${key}`
//     )
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         console.log(data);
//         showWeatherData(data);
//       })
//       .catch((error) => {
//         console.error("Fetch işlemi sırasında bir sorun oluştu:", error);
//       });
//   });
// }

// function showWeatherData(data) {
//   if (!data || !data.list || !data.city || !data.city.coord) {
//     console.error("Geçersiz veri:", data);
//     return;
//   }

//   const item = data.list[0];

//   const temp = (item.main.temp - 273.15).toFixed(1);
//   const humidity = item.main.humidity;
//   const feels_like = (item.main.feels_like - 273.15).toFixed(1);
//   const temp_max = (item.main.temp_max - 273.15).toFixed(1);
//   const temp_min = (item.main.temp_min - 273.15).toFixed(1);

//   const sunriseTimestamp = data.city.sunrise;
//   const sunsetTimestamp = data.city.sunset;

//   const sunriseTime = sunriseTimestamp
//     ? new Date(sunriseTimestamp * 1000).toLocaleTimeString("tr-TR", {
//         timeZone: "Europe/Istanbul",
//         hour: "2-digit",
//         minute: "2-digit",
//       })
//     : "Geçersiz zaman";

//   const sunsetTime = sunsetTimestamp
//     ? new Date(sunsetTimestamp * 1000).toLocaleTimeString("tr-TR", {
//         timeZone: "Europe/Istanbul",
//         hour: "2-digit",
//         minute: "2-digit",
//       })
//     : "Geçersiz zaman";

//   more_info.innerHTML = `
//         <div class="weather-item">Hissedilen <span>${Math.round(
//           feels_like
//         )}°C</span></div>
//         <div class="weather-item">Ortalama Nem <span>${Math.round(
//           humidity
//         )}%</span></div>
//         <div class="weather-item">Gün Doğumu <span>${sunriseTime}</span></div>
//         <div class="weather-item">Gün Batımı <span>${sunsetTime}</span></div>
//         <div class="weather-item">En yüksek sıcaklık <span>${Math.round(
//           temp_max
//         )}°C</span></div>
//         <div class="weather-item">En düşük sıcaklık <span>${Math.round(
//           temp_min
//         )}°C</span></div>
//     `;
// }
