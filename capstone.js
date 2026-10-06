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