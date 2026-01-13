// Initialize the map
const MAP_CENTER = [32.8801, -117.2340]; // Approx UCSD center coords
const map = L.map('map').setView(MAP_CENTER, 15);

// Add tile layer (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Load toilet data and add markers
fetch('data/toilets.json')
  .then(response => response.json())
  .then(data => {
    data.toilets.forEach(toilet => {
      L.marker([toilet.lat, toilet.lng], {
        title: toilet.name
      })
      .addTo(map)
      .bindPopup(`
        <strong>${toilet.name}</strong><br>
        ${toilet.building}<br>
        Opening hours: ${toilet.hours}
      `);
    });
  })
  .catch(err => {
    console.error('Error loading toilet data', err);
  });
