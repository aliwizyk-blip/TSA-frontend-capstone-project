
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

    // Swap images inside the planet card
    document.querySelectorAll(".mini-stats img").forEach(img => {
        if (img.dataset.light && img.dataset.dark) {
            img.src = isLight ? img.dataset.light : img.dataset.dark;
        }
      });
});

// The API endpoint we're pulling planet data from.
  const API_URL = "https://anurella.github.io/json/planet.json";

  // We'll store the fetched array here once, so we don't re-fetch on every search.
  let planets = [];

   // Grab references to the elements we need to work with.
  const input = document.getElementById("js-planet-input");
  const button = document.getElementById("js-search-btn");
  const resultDiv = document.getElementById("js-result");

  // --- Step 1: fetch the data as soon as the page loads ---
  async function loadPlanets() {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) throw new Error("Network response was not ok");

      // Fetch and store planet data
      planets = await response.json();

      // Display Earth automatically when the page loads
      const defaultPlanet = findPlanet("Earth");

      if (defaultPlanet) {
        renderPlanet(defaultPlanet);
      }

      // Keep the search input empty
      input.value = "";

    } catch (err) {
      resultDiv.innerHTML = `<p class="message">Couldn't load planet data. Please refresh.</p>`;
      console.error(err);
    }
  }

// --- Step 2: find a planet by name (case-insensitive) ---
  function findPlanet(name) {
    const planetName = name.trim().toLowerCase();
    return planets.find(p => p.name.toLowerCase() === planetName);
  }

// --- Step 3: build the card's HTML from a planet object ---
  function renderPlanet(planet) {
    resultDiv.innerHTML = `
      <div class="card">
        <div class="card-header">
          <img class="planet-photo" src="${planet.image}" alt="${planet.name}" />

          <div>
            <p class="planet-name">${planet.name}</p>
            <p class="planet-type">${planet.type}</p>
            
            <p class="planet-desc">${planet.description}</p>

            <div class="stat-box">
              <div>
                <div class="stat-label">Gravity</div>
                <div class="stat-value">${planet.gravity}</div>
              </div>
              <div>
                <div class="stat-label">Mass</div>
                <div class="stat-value">${planet.mass}</div>
              </div>
              <div>
                <div class="stat-label">Period</div>
                <div class="stat-value">${planet.period}</div>
              </div>
            </div>

            <div class="mini-stats">
              <div class="mini-stat">
                <span class="icon">
                  <img 
                    src="/images/temperature.png"
                    data-light="/images/tempB.png"
                    data-dark="/images/temperature.png"
                    alt=""
                  >
                </span> 
                ${planet.temperature}
              </div>
              <div class="mini-stat"><span class="icon">
                 <img 
                  src="/images/moon.png"
                  data-light="/images/moonB.png"
                  data-dark="/images/moon.png"
                  alt=""
                >
                </span> ${planet.moons}
              </div>
              <div class="mini-stat"><span class="icon">&#9679;</span> ${planet.diameter}</div>
              <div class="mini-stat"><span class="icon">
               <img 
                  src="/images/setting.png"
                  data-light="/images/settingB.png"
                  data-dark="/images/setting.png"
                  alt=""
                ></span> ${planet.distanceFromSun}
            </div>
          </div>

          </div>
        </div>
        
      </div>
    `;
  }

  // --- Step 4: what happens when the user searches ---
function handleSearch() {
  const name = input.value.trim();

  if (!name) return;

  const planet = findPlanet(name);

  if (planet) {
    renderPlanet(planet);

    // Clear the input after a successful search
    input.value = "";
  } else {
    resultDiv.innerHTML = `
      <p class="message">
        No planet found called "${name}".
        Try Mercury, Venus, Earth, Mars, Jupiter, Saturn,
        Uranus, Neptune, or Pluto.
      </p>
    `;
  }
}

  // Trigger search on button click...
  button.addEventListener("click", handleSearch);

  // ...or when the user presses Enter inside the input.
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSearch();
  });

  // Kick things off.
  loadPlanets();