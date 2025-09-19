// Footer dynamic year and last modified
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
const lastModified = document.getElementById('lastModified');
if (lastModified) {
  lastModified.textContent = document.lastModified;
}

// WeatherAPI integration
const API_KEY = 'c4c2fff789fb4114a37200405251909';
const CITY = 'Caracas'; // Puedes cambiar la ciudad
const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${CITY}&aqi=no`;

function calculateWindChill(tempC, windKmh) {
  // Wind chill formula for Celsius
  return (
    13.12 + 0.6215 * tempC - 11.37 * Math.pow(windKmh, 0.16) + 0.3965 * tempC * Math.pow(windKmh, 0.16)
  ).toFixed(1);
}

async function updateWeather() {
  try {
    const response = await fetch(weatherUrl);
    if (!response.ok) throw new Error('Weather API error');
    const data = await response.json();
    const temp = data.current.temp_c;
    const wind = data.current.wind_kph;
    document.getElementById('temperature').textContent = temp;
    document.getElementById('windSpeed').textContent = wind;
    const windChillSpan = document.getElementById('windChill');
    if (temp <= 10 && wind > 4.8) {
      windChillSpan.textContent = calculateWindChill(temp, wind) + ' °C';
    } else {
      windChillSpan.textContent = 'N/A';
    }
  } catch (err) {
    console.error('Weather update failed:', err);
  }
}

updateWeather();
setInterval(updateWeather, 60000); // Actualiza cada minuto
