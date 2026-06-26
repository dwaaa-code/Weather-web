const tempDisplay = document.querySelector(".temp-display");
const weatherDisplay = document.querySelector(".weather-display");

const celBtn = document.getElementById("cel");
const fahBtn = document.getElementById("fah");

const inputBox = document.querySelector(".input-area");
const searchBtn = document.querySelector(".search-btn");


let currentTempInCelcius = 0;


searchBtn.addEventListener("click", async () => {
  const namaKota = inputBox.value.trim();
  
  console.log(namaKota)
  
  
  //fetching the geocode api
  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${namaKota}&count=1`;
  
  const geoRespon = await fetch(geoUrl);
  const geoData = await geoRespon.json();
  
  if (!geoData.results) {
    weatherDisplay.textContent = "kota tidak ditemukan";
    return;
  };
  
  const lat = geoData.results[0].latitude;
  const lon = geoData.results[0].longitude;
  
  
  //fetching the weather api
  const weatherUrl =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode`;
  
  
  const weatherRespon = await fetch(weatherUrl);
  const weatherData = await weatherRespon.json();
  
  
  //temp display
  currentTempInCelcius = weatherData.current.temperature_2m;
  tempDisplay.textContent = currentTempInCelcius + "°C";
  
  
  //convert the tempcode > text
  const code = weatherData.current.weathercode;
  weatherDisplay.textContent = getWeatherDesc(code);
});

//func convert weather code
function getWeatherDesc(code) {
  if (code === 0) return "Cerah ☀️";
  if (code <= 3) return "Berawan ⛅";
  if (code <= 48) return "Berkabut 🌫️";
  if (code <= 67) return "Hujan 🌧️";
  if (code <= 77) return "Salju ❄️";
  if (code <= 82) return "Hujan Deras 🌊";
  if (code <= 99) return "Badai ⛈️";
  return "Tidak diketahui";
}


//logic btn cel&fah

celBtn.addEventListener("change", () => {
  tempDisplay.textContent = currentTempInCelcius + "°C";
});

fahBtn.addEventListener("click", () => {
  const fahrenheit = (currentTempInCelcius * 9 / 5) + 32;
  tempDisplay.textContent = fahrenheit.toFixed(1) + "°F";
});