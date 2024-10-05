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

const timeElement = document.getElementById("time");
const dateElement = document.getElementById("date");
const city = document.getElementById("city");
const temp = document.getElementById("temp");
const desc = document.getElementById("desc");
const days = document.getElementById("days");
const days_info = document.getElementById("days-info");
const dayElement = document.getElementById("day");

const key = "6a4d76c560f8c7925b99f1b3acb1c689";
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

const getForecast = (latitude, longitude) => {
  let query = `${url}forecast?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric&lang=tr`;
  fetch(query)
    .then((response) => {
      if (!response.ok) throw new Error("Veri alınamadı");
      return response.json();
    })
    .then(displayForecastResult)
    .catch((error) => {
      console.error(error);
      alert(error.message);
    });
};

const displayResult = (result) => {
  let city = document.querySelector(".city");
  city.innerText = `${result.name}, ${result.sys.country}   Hava Durumu`;

  let temp = document.querySelector(".temp");
  temp.innerText = `${Math.round(result.main.temp)}°C`;

  let desc = document.querySelector(".desc");
  desc.innerText = result.weather[0].description;

  let icon = document.querySelector(".weather-icon");
  const weatherIconCode = result.weather[0].icon;
  icon.src = `http://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;
};

const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("keypress", setQuery);

function setActive(element) {
  const guns = document.querySelectorAll(".day");
  guns.forEach((day) => {
    day.classList.remove("active");
  });
  element.classList.add("active");
}

const daysOfWeek = [
  "Pazar",
  "Pazartesi",
  "Salı",
  "Çarşamba",
  "Perşembe",
  "Cuma",
  "Cumartesi",
];

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

getWeatherData();

const more_info = document.getElementById("more_info");

// getWeatherData();

function getWeatherData() {
  navigator.geolocation.getCurrentPosition((success) => {
    let { latitude, longitude } = success.coords;

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${key}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        showWeatherData(data);
      })
      .catch((error) => {
        console.error("Fetch işlemi sırasında bir sorun oluştu:", error);
      });
  });
}

// function showWeatherData(data) {
//   const item = data.list[0];

//   const temp = (item.main.temp - 273.15).toFixed(1);
//   const humidity = item.main.humidity;
//   const feels_like = (item.main.feels_like - 273.15).toFixed(1);

//   const temp_max = (item.main.temp_max - 273.15).toFixed(1);
//   const temp_min = (item.main.temp_min - 273.15).toFixed(1);

//   more_info.innerHTML = `

//         <div class="weather-item">Hissedilen <span>${Math.round(
//           feels_like
//         )}°C</span> </div>
//         <div class="weather-item">Ortalama Nem <span>${Math.round(
//           humidity
//         )}%</span></div>
//         <div class="weather-item">Gün Doğumu <span>${sunriseTime}</span></div>
//         <div class="weather-item">Gün Batımı <span>${sunsetTime}</span></div>
//         <div class="weather-item">En yüksek sıcaklık <span>${Math.round(
//           temp_max
//         )}%</span></div>
//         <div class="weather-item">En düşük sıcaklık <span>${Math.round(
//           temp_min
//         )}%</span></div>
//     `;
// }

function showWeatherData(data) {
  if (!data || !data.list || !data.city || !data.city.coord) {
    console.error("Geçersiz veri:", data);
    return;
  }

  const item = data.list[0];

  const temp = (item.main.temp - 273.15).toFixed(1);
  // const desc = (item.main.desc - 273.15).toFixed(1);
  const humidity = item.main.humidity;
  const feels_like = (item.main.feels_like - 273.15).toFixed(1);
  const temp_max = (item.main.temp_max - 273.15).toFixed(1);
  const temp_min = (item.main.temp_min - 273.15).toFixed(1);

  // Gün doğumu ve batımı bilgilerini alın
  const sunriseTimestamp = data.city.sunrise;
  const sunsetTimestamp = data.city.sunset;

  // Zamanları dönüştür
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
