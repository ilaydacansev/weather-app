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
const feel = document.getElementById("feel");
const humidity = document.getElementById("humidity");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const min = document.getElementById("min");
const max = document.getElementById("max");
const days = document.getElementById("days");
const days_info = document.getElementById("days-info");
const dayElement = document.getElementById("day");

const key = "6a4d76c560f8c7925b99f1b3acb1c689";

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
function getWeatherData() {
  navigator.geolocation.getCurrentPosition((success) => {
    let { latitude, longitude } = success.coords;

    // fetch(
    //   "https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${key}"
    // )
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //   });
    fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${key}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  });
}
