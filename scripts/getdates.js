// Obtén el año actual y colócalo en el span con id="currentyear"
document.addEventListener("DOMContentLoaded", () => {
    const yearSpan = document.getElementById('currentyear');
    const lastModified = document.getElementById('lastModified');

    // Año actual
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;

    // Fecha de última modificación
    lastModified.textContent = `Last Modified: ${document.lastModified}`;
});
