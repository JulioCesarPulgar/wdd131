// Set current year in the footer
const yearSpan = document.getElementById('currentyear');
if (yearSpan) {
	yearSpan.textContent = new Date().getFullYear();
}

// Set last modified date in the footer
const lastModified = document.getElementById('lastModified');
if (lastModified) {
	lastModified.textContent = document.lastModified;
}
