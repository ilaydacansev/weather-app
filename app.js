function toggleDropdown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    document.getElementById("searchBar").value = "";
    for (var i = 0; i < dropdowns.length; i++) {
      dropdowns[i].classList.remove("show");
    }
  }
};

const app = document.getElementById("app");
const timeElement = document.getElementById("time");
const dateElement = document.getElementById("date");
const cityElement = document.getElementById("city");
const tempElement = document.getElementById("temp");
const descElement = document.getElementById("desc");
const more_info = document.getElementById("more_info");
const input = document.getElementById("searchBar");
const searchList = document.getElementById("search-list");
const day_info = document.getElementById("days-info");
let currentIndex = -1;

const key = "6a4d76c560f8c7925b99f1b3acb1c689";

const months = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
];

const daysOfWeek = [
  "Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe",
  "Cuma", "Cumartesi"
];

const getWeather = (cityName) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=metric&lang=tr`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${key}&units=metric&lang=tr`;

  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error("Şehir bulunamadı");
      return response.json();
    })
    .then((result) => {
      displayResult(result);
      return fetch(forecastUrl);
    })
    .then((response) => {
      if (!response.ok) throw new Error("Hava durumu tahmini alınamadı");
      return response.json();
    })
    .then((data) => showWeatherData(data))
    // .catch((error) => {
    //   console.error(error);
    //   alert(`Hata: ${error.message}`);
    //   const errorMessageElement = document.getElementById('error-message');
    //   errorMessageElement.innerText = `Bir hata oluştu: ${error.message}`;
    //   errorMessageElement.style.display = 'block';
    // });
};

const displayResult = (result) => {
  cityElement.innerText = `${result.name}, ${result.sys.country} Hava Durumu`;
  tempElement.innerText = `${Math.round(result.main.temp)}°C`;
  descElement.innerText = result.weather[0].description;
  document.querySelector(
    ".weather-icon"
  ).src = `https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`;
};

const showWeatherData = (forecast) => {
  if (!forecast || !forecast.list || forecast.list.length === 0) {
    console.error("Hava durumu verisi alınamadı.");
    return;
  }

  const firstDay = forecast.list[0];
  const initialDate = new Date(firstDay.dt * 1000);
  const initialIconUrl = `https://openweathermap.org/img/wn/${firstDay.weather[0].icon}@2x.png`;

  displayInitialWeather(initialDate, initialIconUrl, Math.round(firstDay.main.temp), firstDay.weather[0].description);

  day_info.innerHTML = ''; 
  for (let i = 0; i < 5; i++) {
    let date = new Date(forecast.list[i * 8].dt * 1000);
    if (forecast.list[i * 8] && forecast.list[i * 8].weather) {
      const iconUrl = `https://openweathermap.org/img/wn/${forecast.list[i * 8].weather[0].icon}@2x.png`;
      const temp = Math.round(forecast.list[i * 8].main.temp);
      const today = new Date();
      const isToday = date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
      
      day_info.innerHTML += `
          <div id="day" class="day ${isToday ? 'active' : ''}" onclick="setActive(this, '${isToday ? 'Bugün' : date.getDate() + ' ' + months[date.getMonth()]}', '${timeElement.innerHTML}', '${temp}°C', '${forecast.list[i * 8].weather[0].description}', '${iconUrl}', '${Math.round(forecast.list[i * 8].main.feels_like)}', '${Math.round(forecast.list[i * 8].main.humidity)}', '${new Date(forecast.city.sunrise * 1000).toLocaleTimeString("tr-TR")}', '${new Date(forecast.city.sunset * 1000).toLocaleTimeString("tr-TR")}', '${Math.round(forecast.list[i * 8].main.temp_max)}°C', '${Math.round(forecast.list[i * 8].main.temp_min)}°C')">
              <div class="dday">${isToday ? 'Bugün' : date.getDate() + ' ' + months[date.getMonth()]}</div>
              <img class="img-day" src="${iconUrl}" alt="hava durumu simgesi" />
              <span>${temp} °C</span>
          </div>
      `;
    } else {
      console.error("Bu indeks için hava durumu verisi mevcut değil.");
    }
  }

  const activeDay = document.querySelector('.day.active');
  if (activeDay) {
    activeDay.click();
  }
};

function displayInitialWeather(date, iconUrl, temp, desc) {
  document.getElementById('date').innerText = `${date.getDate()} ${months[date.getMonth()]}`;
  document.getElementById('time').innerText = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}); 
  document.getElementById('temp').innerText = `${temp}°C`;
  document.getElementById('desc').innerText = desc;
  document.querySelector('.weather-icon').src = iconUrl;
}

fetch("https://raw.githubusercontent.com/lutangar/cities.json/master/cities.json")
  .then((response) => {
    if (!response.ok) throw new Error("Ağ isteği başarısız");
    return response.json();
  })
  .then((data) => {
    input.addEventListener("input", function () {
      const query = this.value.trim();
      searchList.innerHTML = "";
      currentIndex = -1;

      if (query) {
        const results = data
          .filter((city) => city.name.toLowerCase().startsWith(query.toLowerCase()))
          .slice(0, 5);
        results.forEach((city, index) => {
          const listItem = document.createElement("li");
          listItem.textContent = `${city.name}, ${city.country}`;
          listItem.onclick = () => selectCity(city.name);
          listItem.onmouseover = () => (currentIndex = index);
          searchList.appendChild(listItem);
        });
        searchList.style.display = results.length > 0 ? "block" : "none";
      } else {
        searchList.style.display = "none";
      }
    });

    input.addEventListener("keydown", function (event) {
      const items = searchList.getElementsByTagName("li");
      if (event.key === "ArrowDown") {
        currentIndex = (currentIndex + 1) % items.length;
      } else if (event.key === "ArrowUp") {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
      } else if (event.key === "Enter" && currentIndex > -1) {
        selectCity(items[currentIndex].textContent.split(",")[0]);
      }
      updateSelection(items);
    });

    function updateSelection(items) {
      Array.from(items).forEach((item, index) => {
        item.className = index === currentIndex ? "active" : "";
      });
    }

    function selectCity(cityName) {
      input.value = cityName;
      searchList.innerHTML = "";
      currentIndex = -1;
      getWeather(cityName);
    }
  })
  .catch((error) => console.error("Bir hata oluştu:", error));

// setInterval(() => {
  // const time = new Date();
  // timeElement.innerHTML = `${time.getHours().toString().padStart(2, "0")}:${time.getMinutes().toString().padStart(2, "0")}`;
  // dateElement.innerHTML = `${daysOfWeek[time.getDay()]}, ${time.getDate()} ${months[time.getMonth()]}`;
// }, 100);

function success(position) {
  const { latitude: lat, longitude: lon } = position.coords;
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric&lang=tr`)
    .then((response) => {
      if (!response.ok) throw new Error("Konum için hava durumu verisi alınamadı");
      return response.json();
    })
    .then((data) => {
      displayResult(data);
      return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric&lang=tr`);
    })
    .then((response) => {
      if (!response.ok) throw new Error("Konum için hava durumu tahmini alınamadı");
      return response.json();
    })
    .then((data) => showWeatherData(data))
    .catch((err) => {
      tempElement.innerHTML = "Hava durumu verileri alınamadı.";
      console.error(err);
      alert(`Hata: ${err.message}`);
    });
}

function handleError(message) {
  console.error(message);
  alert(`Hata: ${message}`);
}


function error() {
  tempElement.innerHTML = "Konum alınamadı.";
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success, error);
} else {
  tempElement.innerHTML = "Konum desteği yok";
}

function setActive(element, date, time, temp, desc, icon, feels_like, humidity, sunrise, sunset, temp_max, temp_min) {
  const days = document.querySelectorAll('.day');
  days.forEach(day => day.classList.remove('active'));
  element.classList.add('active');
  element.focus();

  const content = document.getElementById('content'); 
  const timeElement = document.getElementById('time');

  const isToday = date === 'Bugün';
  timeElement.style.display = isToday ? 'block' : 'none';
  
  if (date && time && temp && desc && icon)  {
    content.innerHTML = `
      <div id="information" class="information w-100">
        <img class="weather-icon text-left" src="${icon}" alt="${desc}" />
        <div id="date" class="date">${date}</div>
        <div id="time" class="time">${time}</div>
        <div id="temp" class="temp">${temp}</div>
        <div id="desc" class="desc">${desc}</div>
      </div>
    `;


    
    function formatTime(timeString) {
      return timeString.split(':').slice(0, 2).join(':'); 
    }

    const sunriseFormatted = formatTime(sunrise); 
    const sunsetFormatted = formatTime(sunset);

    const weatherInfo = `
      <div class="weather-item">Hissedilen <span>${Math.round(feels_like)}°C</span></div>
      <div class="weather-item">Ortalama Nem <span>${Math.round(humidity)}%</span></div>
      <div class="weather-item">Gün Doğumu <span>${sunriseFormatted}</span></div>
      <div class="weather-item">Gün Batımı <span>${sunsetFormatted}</span></div>
      <div class="weather-item">En yüksek sıcaklık <span>${temp_max}</span></div>
      <div class="weather-item">En düşük sıcaklık <span>${temp_min}</span></div>
    `;
    
    more_info.innerHTML = weatherInfo;
  }
}

const dayPart = document.querySelectorAll('.day'); 
const initialActiveDay = dayPart[0];
dayPart.forEach(day => day.classList.remove('active')); 
initialActiveDay.classList.add('active'); 
initialActiveDay.focus(); 

dayPart.forEach(day => {
  day.addEventListener('click', () => {
    dayPart.forEach(d => d.classList.remove('active'));
    day.classList.add('active'); 
    day.focus(); 
  });
});



function load(url, vars) {
  const loader = document.getElementById('loader');
  const loaderPart = document.getElementById('loader-part');
 
 
  loader.style.display = 'flex';
  loaderPart.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
 
 
  setTimeout(function() {
      var req = new XMLHttpRequest();
      req.open("POST", url, true);
 
 
      req.onreadystatechange = function () {
          if (req.readyState == 4) {
              if (req.status == 200) {
                  document.getElementById('content').innerHTML = req.responseText;
              } else {
                  console.error('Error loading content:', req.status);
              }
             
              loader.style.display = 'none';
              loaderPart.style.backgroundColor = 'transparent';
          }
      };
 
 
      req.send(vars);
  }, 2800);
 }
 
 
 load('https://jsonplaceholder.typicode.com/posts/1', null);



//  const cities = [
//   "Adana",
//   "Adıyaman",
//   "Afyonkarahisar",
//   "Ağrı",
//   "Aksaray",
//   "Amasya",
//   "Ankara",
//   "Antalya",
//   "Ardahan",
//   "Artvin",
//   "Aydın",
//   "Balıkesir",
//   "Bartın",
//   "Batman",
//   "Bayburt",
//   "Bilecik",
//   "Bingöl",
//   "Bitlis",
//   "Bolu",
//   "Burdur",
//   "Bursa",
//   "Çanakkale",
//   "Çankırı",
//   "Çorum",
//   "Denizli",
//   "Diyarbakır",
//   "Edirne",
//   "Elazığ",
//   "Erzincan",
//   "Erzurum",
//   "Eskişehir",
//   "Gaziantep",
//   "Giresun",
//   "Gümüşhane",
//   "Hakkari",
//   "Hatay",
//   "Iğdır",
//   "Isparta",
//   "İstanbul",
//   "İzmir",
//   "Kahramanmaraş",
//   "Karabük",
//   "Karamanoğlu",
//   "Kars",
//   "Kastamonu",
//   "Kayseri",
//   "Kırıkkale",
//   "Kırklareli",
//   "Kırşehir",
//   "Konya",
//   "Kütahya",
//   "Malatya",
//   "Manisa",
//   "Mardin",
//   "Mersin",
//   "Muğla",
//   "Muş",
//   "Nevşehir",
//   "Niğde",
//   "Ordu",
//   "Osmaniye",
//   "Rize",
//   "Sakarya",
//   "Samsun",
//   "Siirt",
//   "Sinop",
//   "Sivas",
//   "Tekirdağ",
//   "Tokat",
//   "Trabzon",
//   "Tunceli",
//   "Şanlıurfa",
//   "Uşak",
//   "Van",
//   "Yalova",
//   "Yozgat",
//   "Zonguldak",
// ];

// const input = document.getElementById("searchBar");
// const searchList = document.getElementById("search-list");

// input.addEventListener("input", function () {
//   const query = this.value.toLowerCase();
//   searchList.innerHTML = "";

//   if (query.length > 0) {
//     const filteredCities = cities.filter((city) =>
//       city.toLowerCase().startsWith(query)
//     );

//     filteredCities.forEach((city) => {
//       const listItem = document.createElement("li");
//       listItem.textContent = city;
//       listItem.onclick = () => {
//         input.value = city;
//         searchList.innerHTML = "";
//       };
//       searchList.appendChild(listItem);
//     });

//     searchList.style.display = filteredCities.length > 0 ? "block" : "none";
//   } else {
//     searchList.style.display = "none";
//   }
// });
