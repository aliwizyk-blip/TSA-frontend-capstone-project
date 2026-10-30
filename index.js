async function fetchPlanets() {
    const url = 'https://anurella.github.io/json/planets.json';
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const planets = await response.json();

        // log the entire array of planets to the console
        console.log(planets);

        // example: loop through and print each planet's name and type
        planets.forEach(planet => {
            console.log(`Name: ${planet.name}, is a ${planet.type} planet. `);
        });
    } catch (error) {
        console.error('failed to fetch planet data:', error);
    }
}

// call the function
fetchPlanets();

const themeToggle = document.querySelector("#theme-toggle");
const logo = document.querySelector("#site-logo");

const lightLabel = document.querySelector(".theme-switch__icon--sun");
const darkLabel = document.querySelector(".theme-switch__icon--moon");

themeToggle.addEventListener("change", () => {
  const isLight = themeToggle.checked;

  // Toggle the theme
  document.documentElement.classList.toggle("light-theme", isLight);

  // Swap the logo
  logo.src = isLight
    ? "/images/logo_black.png"
    : "/images/logo.png";
});