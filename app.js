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

const url = "https://api.openweathermap.org/data/2.5/";

const key = "6a4d76c560f8c7925b99f1b3acb1c689";

const setQuery = (e) => {
  if (e.keyCode == "13") getResult(searchBar.value);
};

const getResult = (cityName) => {
  let query = `${url}weather?q=${cityName}&appid=${key}&units=metric&lang=tr`;
  fetch(query)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResult);
};

const displayResult = (result) => {
  let city = document.querySelector(".city");
  city.innerText = `${result.name}, ${result.sys.country}   Hava Durumu`;

  let temp = document.querySelector(".temp");
  temp.innerText = `${Math.round(result.main.temp)}°C`;

  let desc = document.querySelector(".desc");
  desc.innerText = result.weather[0].description;

  let minmax = document.querySelector(".minmax");
  minmax.innerText = `En yüksek sıcaklık ${Math.round(
    result.main.temp_min
  )}°C    ⚫︎    En düşük sıcaklık ${Math.round(result.main.temp_max)}°C`;

  let feel = document.querySelector(".feel");
  feel.innerText = `Hissedilen ${Math.round(result.main.feels_like)}°C`;

  let time = document.querySelector(".time");
  time.innerText = `Bugün: ${result.weather[0].description}`;

  let icon = document.querySelector(".weather-icon");
  const weatherIconCode = result.weather[0].icon;
  icon.src = `http://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;
};

const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("keypress", setQuery);

function setActive(element) {
  const guns = document.querySelectorAll(".day");
  guns.forEach((day) => {
    day.classList.remove("active"); // Diğer günlerden 'active' sınıfını kaldır
  });
  element.classList.add("active"); // Tıklanan elemana 'active' sınıfını ekle
}

// let searchBar = document.getElementById(".searchbar"),
// api_key = "6a4d76c560f8c7925b99f1b3acb1c689";

// function

// searchBar.addEventListener('click', getCityCoordinates);
