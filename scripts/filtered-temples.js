/* filtered-temples.js - dynamically generates and filters temple cards */

const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  // Additional temples
  {
    templeName: "Bern Switzerland",
    location: "Bern, Switzerland",
    dedicated: "1955, September, 11",
    area: 35455,
    imageUrl:
      "https://www.churchofjesuschrist.org/imgs/a2c415301c7991e2e10059b5ec588a28785917b0/full/500%2C/0/default"
  },
  {
    templeName: "Concepción Chile",
    location: "Concepción, Chile",
    dedicated: "2018, October, 28",
    area: 23300,
    imageUrl:
      "https://www.churchofjesuschrist.org/imgs/7873102ba98c0c2b6f45ca655d737cf5a5e7f7c2/full/500%2C/0/default"
  },
  {
    templeName: "Barranquilla Colombia",
    location: "Barranquilla, Colombia",
    dedicated: "2018, December, 9",
    area: 24600,
    imageUrl:
      "https://www.churchofjesuschrist.org/imgs/7e68e3b2ed30f817f91392968737f45a07e17e79/full/500%2C/0/default"
  }
];

function createTempleCard(temple) {
  const card = document.createElement('section');
  card.className = 'temple-card';

  card.innerHTML = `
    <h2>${temple.templeName}</h2>
    <img src="${temple.imageUrl}" alt="${temple.templeName}" loading="lazy">
    <p><strong>Location:</strong> ${temple.location}</p>
    <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
    <p><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</p>
  `;
  return card;
}

function displayTemples(filteredTemples) {
  const container = document.getElementById('temples-container');
  container.innerHTML = '';
  filteredTemples.forEach(temple => {
    container.appendChild(createTempleCard(temple));
  });
}

function filterTemples(criteria) {
  let filtered = temples;
  switch(criteria) {
    case 'old':
      filtered = temples.filter(t => parseInt(t.dedicated.split(',')[0]) < 1900);
      break;
    case 'new':
      filtered = temples.filter(t => parseInt(t.dedicated.split(',')[0]) > 2000);
      break;
    case 'large':
      filtered = temples.filter(t => t.area > 90000);
      break;
    case 'small':
      filtered = temples.filter(t => t.area < 10000);
      break;
    default:
      filtered = temples;
  }
  displayTemples(filtered);
}

document.addEventListener('DOMContentLoaded', () => {
  displayTemples(temples);

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterTemples(e.target.dataset.filter);
    });
  });

  // Footer year and last modified
  document.getElementById('year').textContent = new Date().getFullYear();
  document.getElementById('lastModified').textContent = document.lastModified;
});
