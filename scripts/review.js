// scripts/review.js
// Increment and display review counter using localStorage

document.addEventListener("DOMContentLoaded", () => {
  let count = Number(localStorage.getItem("reviewCount")) || 0;
  count++;
  localStorage.setItem("reviewCount", count);
  const countSpan = document.getElementById("reviewCount");
  if (countSpan) {
    countSpan.textContent = count;
  }
});
