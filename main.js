// Center of campus (example: UCSD)
const CAMPUS_CENTER = [32.8801, -117.2340];

// Initialize map
const map = L.map('map').setView(CAMPUS_CENTER, 15);

// Base map tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Custom toilet icon (optional)
const toiletIcon = L.icon({
  iconUrl: 'assets/icons/toilet-marker.png',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30]
});

// Load toilet data
fetch('data/toilets.json')
  .then(res => res.json())
  .then(data => {
    data.toilets.forEach(t => {
      L.marker([t.lat, t.lng], { icon: toiletIcon })
        .addTo(map)
        .bindPopup(`
          <strong>${t.name}</strong><br>
          ${t.building}<br>
          Hours: ${t.hours}
        `);
    });
  })
  .catch(err => console.error(err));
