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

const cityName = "Istanbul";
const key = `6a4d76c560f8c7925b99f1b3acb1c689`;
const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&lang=tr`;
console.log(`Fetching weather for: ${url}`);

// const key = `6a4d76c560f8c7925b99f1b3acb1c689`;
// const url =
//   "https://api.openweathermap.org/data/2.5/weather?q=İstanbul&appid=6a4d76c560f8c7925b99f1b3acb1c689&lang=tr";

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => console.error("Error:", error));

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

  const descElement = document.querySelector("#desc");
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
      console.log(data);
      if (data.main && data.main.temp) {
        temp.innerHTML = ` ${Math.round(data.main.temp)} °C`;

        const humidity = data.main.humidity;
        const feels_like = data.main.feels_like;
        const temp_max = data.main.temp_max;
        const temp_min = data.main.temp_min;

        // descElement.innerHTML = `<div>${data.weather[0].description}</div>`;

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

        const descElement = document.querySelector("#desc");
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

  const descElement = document.querySelector("#desc");
  descElement.innerHTML = `<div>${data.weather[0].description}</div>`;

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

// const cities = [
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

let cities = [];

// city.list.json dosyasını al
fetch("path/to/city.list.json") // Dosya yolunu buraya yaz
  .then((response) => response.json())
  .then((data) => {
    // Şehir isimlerini al
    cities = data.map((city) => city.name);
  })
  .catch((error) => console.error("Hata:", error));

const input = document.getElementById("searchBar");
const searchList = document.getElementById("search-list");

input.addEventListener("input", function () {
  const query = this.value.toLowerCase();
  searchList.innerHTML = "";

  if (query.length > 0) {
    const filteredCities = cities.filter((city) =>
      city.toLowerCase().startsWith(query)
    );

    filteredCities.forEach((city) => {
      const listItem = document.createElement("li");
      listItem.textContent = city;
      listItem.onclick = () => {
        input.value = city;
        searchList.innerHTML = "";
      };
      searchList.appendChild(listItem);
    });

    searchList.style.display = filteredCities.length > 0 ? "block" : "none";
  } else {
    searchList.style.display = "none";
  }
});

// !
// const input = document.getElementById("searchBar");
// const searchList = document.getElementById("search-list");

// input.addEventListener("input", function () {
//   const query = this.value;

//   if (query.length > 0) {
//     fetch(
//       `http://api.openweathermap.org/geo/1.0/direct?q=${input},${stateCode},${countryCode}&limit=${limit}&appid=${apiKey}&lang=tr`
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         searchList.innerHTML = "";
//         data.forEach((city) => {
//           const listItem = document.createElement("li");
//           listItem.textContent = `${city.name}, ${city.country}`;
//           listItem.onclick = () => {
//             input.value = listItem.textContent;
//             searchList.innerHTML = "";
//             searchList.style.display = "none";
//           };
//           searchList.appendChild(listItem);
//         });
//         searchList.style.display = data.length > 0 ? "block" : "none";
//       })
//       .catch((error) => console.error("Error:", error));
//   } else {
//     searchList.style.display = "none";
//   }
// });

// input.addEventListener("blur", function () {
//   setTimeout(() => {
//     searchList.style.display = "none";
//   }, 100);
// });
