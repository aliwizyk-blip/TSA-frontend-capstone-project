# 🪐 Planet Dashboard Project Assignments

## 🎨 Member 1: Frontend & Layout Designer (@Hadiyah-max)
*Role Focus:* Building the visual structure, layout containers, and styling using HTML & Tailwind CSS to match the UI mockup.

### Tasks:
- [ ] *Global Container:* Set up the main page wrapper with dark-mode styling (Slate/Zinc backgrounds) and responsive margins.
- [ ] *Search Header:* Build the navigation bar containing the logo placeholder, the text search bar input element, and the theme toggle alignment.
- [ ] *Feature Card Layout:* Program the single-card display container with the circular image slot, text hierarchies, and the highlighted metrics block.
- [ ] *Data Table Structure:* Create the responsive HTML <table> layout under "Planetary Facts at a Glance," including the multi-level row headers grouping Terrestrial/Gas planets.

---

## ⚙️ Member 2: JavaScript & Integration Engineer (@aliwizyk-blip)
*Role Focus:* Hooking up the Fetch API logic, dynamically feeding the UI elements from planet.json, and writing functional interactive features.

### Tasks:
- [ ] *API Telemetry:* Write the async/await fetch() function targeting the live GitHub Pages planet.json file.
- [ ] *Dynamic Card Rendering:* Program JavaScript to automatically swap out the image, title, and statistics in the main "Earth" feature card based on which planet is selected or loaded.
- [ ] *Live Search Filter:* Connect an event listener to the search input field so typing a planet name instantly filters down the data elements.
- [ ] *Table Loop Injection:* Map over the JSON data array to dynamically inject <tr> (table rows) into the data view container, ensuring statistics map cleanly to their columns.

---

## 📊 Member 3: Data Manager & Asset Controller (@Charzy-1)
*Role Focus:* Structuring the JSON database array, compiling proper cosmic telemetry metrics, and ensuring reliable image asset hosting.

### Tasks:
- [ ] *JSON Data Verification:* Audit planet.json to ensure it contains all metrics required by the table (classification, mass, diameter, gravity, temperature).
- [ ] *Asset Management:* Source high-quality, transparent, or uniform planet images, uploading them to the repository or a reliable CDN.
- [ ] *Link Validation:* Ensure every image link embedded in the JSON works flawlessly without breaking or throwing 404 errors.
- [ ] *Fallback Validation:* Implement or provide a bulletproof universal space placeholder image string to handle edge-case loading errors in production.