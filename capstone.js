// ==========================================================================
// 1. API Telemetry Setup - Matching Your Provided Live Endpoint Link
// ==========================================================================
const API_URL = "https://github.io";
let cachedPlanets = [];

/**
 * Downloads live data package using asynchronous async/await routines
 */
async function fetchPlanetTelemetry() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(HTTP network error: ${ response.status });

        cachedPlanets = await response.json();

        // Initialize the interface layouts using fresh data
        renderTableLoop(cachedPlanets);
        updateDynamicCard("Earth");

    } catch (error) {
        console.error("Telemetry pipeline execution error event:", error);
        displayOfflineFallback();
    }
}

// ==========================================================================
// 2. Table Loop Injection - Mapping Your Exact JSON Properties
// ==========================================================================
function renderTableLoop(planetsArray) {
    const tableBody = document.getElementById('planet-table-body');
    if (!tableBody) return;

    // Purge old dynamic rows to prepare for clean rendering
    const activeRows = tableBody.querySelectorAll('.planet-data-item');
    activeRows.forEach(row => row.remove());

    // Loop through the data to construct and inject HTML elements
    planetsArray.forEach(planet => {
        const tr = document.createElement('tr');
        tr.className = 'planet-data-item';
        tr.setAttribute('data-name', planet.name.toLowerCase());

        // Maps column cells to exact matching object property keys from your API text stream
        tr.innerHTML = `
            <td><strong>${planet.name}</strong></td>
            <td>${planet.mass !== undefined ? planet.mass : 'N/A'}</td>
            <td>${planet.diameter ? planet.diameter.toLocaleString() : 'N/A'}</td>
        `;

        // Classification routing blocks connecting items to structural row sections
        const pType = planet.type ? planet.type.toLowerCase() : '';
        let targetGroupHeader = null;

        if (pType === 'terrestrial') {
            targetGroupHeader = document.getElementById('row-terrestrial');
        } else if (pType.includes('gas') || pType.includes('giant')) {
            targetGroupHeader = document.getElementById('row-gas-giants');
        } else if (pType.includes('ice')) {
            targetGroupHeader = document.getElementById('row-ice-giants');
        } else if (pType.includes('dwarf') || planet.name.toLowerCase() === 'pluto') {
            targetGroupHeader = document.getElementById('row-dwarf');
        }

        // Insert row directly after the corresponding category header row if it exists
        if (targetGroupHeader) {
            targetGroupHeader.after(tr);
        } else {
            tableBody.appendChild(tr);
        }
    });
}

// ==========================================================================
// 3. Dynamic Card Showcase Integration
// ==========================================================================
function updateDynamicCard(planetName) {
    const target = cachedPlanets.find(p => p.name.toLowerCase() === planetName.toLowerCase());
    if (!target) return;

    const imgElement = document.getElementById('planet-image');
    const nameElement = document.getElementById('planet-name');
    const descElement = document.getElementById('planet-description');

    if (nameElement) nameElement.textContent = target.name;
    if (descElement) descElement.textContent = target.description || "Information profile descriptive text currently unavailable.";

    // Updates image pathway endpoints from your asset host pipelines
    if (imgElement && target.image) {
        imgElement.src = target.image;
        imgElement.alt = Photography presentation layer: ${ target.name };
    }

    // Secondary stats mapping layers (e.g., Mass, Distance, Gravity, Temperature)
    const massLabel = document.getElementById('stat-mass');
    const gravityLabel = document.getElementById('stat-gravity');
    const distanceLabel = document.getElementById('stat-distance');

    if (massLabel) massLabel.textContent = target.mass !== undefined ? target.mass : '--';
    if (gravityLabel) gravityLabel.textContent = target.gravity !== undefined ? target.gravity : '--';
    if (distanceLabel) distanceLabel.textContent = target.distanceFromSun !== undefined ? target.distanceFromSun : '--';
}

// ==========================================================================
// 4. Live Text Filtering Execution Engines
// ==========================================================================
function applyLiveFilter(searchString) {
    const query = searchString.toLowerCase().trim();

    // Limits the operational data array objects to matching entries
    const matchedPlanets = cachedPlanets.filter(planet =>
        planet.name.toLowerCase().includes(query)
    );

    renderTableLoop(matchedPlanets);

    // If typing results point directly to an exact target match, focus showcase panel
    if (matchedPlanets.length === 1) {
        updateDynamicCard(matchedPlanets[0].name);
    }
}

// ==========================================================================
// 5. System Execution Triggers & Core Interfacing Connections
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    // Initiate automatic background network ingestion immediately upon thread entry
    fetchPlanetTelemetry();

    const searchInput = document.getElementById('planet-search');
    const searchButton = document.getElementById('search-btn');

    // Automatically filters table records live on every keystroke
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            applyLiveFilter(e.target.value);
        });
    }

    // Triggers full showcase card replacement upon formal button engagement events
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', () => {
            const queryVal = searchInput.value.trim();
            if (queryVal) {
                updateDynamicCard(queryVal);
            }
        });
    }
});

// Fallback backup system mirroring the structural schemas observed in your browser capture
function displayOfflineFallback() {
    cachedPlanets = [
        { name: "Mercury", type: "Terrestrial", distanceFromSun: 57.9, mass: 0.000174, diameter: 4879, description: "The smallest planet and closest to the Sun...", image: "https://anurella.github.io/images/planets/mercury.webp" },
        { name: "Venus", type: "Terrestrial", distanceFromSun: 108.2, mass: 0.00256, diameter: 12104, description: "The hottest planet, covered in thick clouds...", image: "https://anurella.github.io/images/planets/venus.webp" },
        { name: "Earth", type: "Terrestrial", distanceFromSun: 149.6, mass: 0.00315, diameter: 12742, description: "Our home world planet supporting life...", image: "https://anurella.github.io/images/planets/earth.jpg" }
    ];
    renderTableLoop(cachedPlanets);
    updateDynamicCard("Earth");
}