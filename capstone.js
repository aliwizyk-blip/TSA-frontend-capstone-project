const planetSelect = document.getElementById('planet-select');
const planetTableBody = document.getElementById('planet-table-body');
const searchInput = document.getElementById('search-input');


const planetImage = document.getElementById('planet-image');
const planetName = document.getElementById('planet-name');
const planetDescription = document.getElementById('planet-describtion');

let allPlanets = [];

async function fetchPlanets() {
    const url = 'https://anurella.github.io/json/planet.json';
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }


        allPlanets = await response.json();


        renderTable(allPlanets);
        setupDropdownListener();
        setupSearchFilter();

    } catch (error) {
        console.error('Failed to fetch planet data:', error);
    }
}

function renderTable(planetsArray) {

    planetTableBody.InnerHTML = '';

    planetsArray.forEach(Planet => {
        const row = `
    <tr class="hover:bg-slate-900/50 transition-colors>
    <td class="px-4 py-3 text-white font-medium">${planet.name}</td>
 <td class="px-4 py-3 text-state-300">${planet.diameter}</td>
  <td class="px-4 py-3 text-state-300">${planet.distance}</td>
  </tr>
    `;
        planetTableBody.insertAdjacentHTML('beforeend', row);
    });
}

function updatefeatureCard(planet) {
    if (!planet) return;

    planetName.innerText = planet.name;
    planetDescription.innerText = planet.description || `Data details regarding the planet ${planet.name}.`;
    if (planet.image) {
        planetImage.src = planet.image;
        planetImage.alt = `planet ${planet.name}`;
    }

}

function setupDropdownListener() {
    planetSelect.addEventListener('change', (e) => {
        const selectedValue = e.target.value.toLowerCase();

        const chosenPlanet = allPlanets.find(p => p.name.tolowerCase() === selectedValue);

        if (chosenPlanet) {
            updatefeatureCard(chosenPlanet);
        }
    });
}


function setupSearchFilter() {
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();

        const filteredPlanets = allPlanets.filter(planet =>
            planet.name.tolowerCase().includes(searchTerm)
        );


        renderTable(filteredplanets);
    });

}
fetchPlanets();