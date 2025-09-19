// Footer dynamic year and last modified
const yearSpan = document.getElementById('currentyear');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
const lastModified = document.getElementById('lastModified');
if (lastModified) {
  lastModified.textContent = document.lastModified;
}
// Weather windchill calculation
function calculateWindChill(tempC, windKmh) {
  // Wind chill formula for Celsius
  return (
    13.12 + 0.6215 * tempC - 11.37 * Math.pow(windKmh, 0.16) + 0.3965 * tempC * Math.pow(windKmh, 0.16)
  ).toFixed(1);
}
const temp = 30; // static value in °C (Venezuela)
const wind = 8; // static value in km/h (Venezuela)
const windchillSpan = document.getElementById('windchill');
if (temp <= 10 && wind > 4.8) {
  windchillSpan.textContent = calculateWindChill(temp, wind) + ' °C';
} else {
  windchillSpan.textContent = 'N/A';
}
