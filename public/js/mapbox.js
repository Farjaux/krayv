/* eslint-disable */
const front = JSON.parse(document.getElementById('map').dataset.locations);
console.log(front);

mapboxgl.accessToken =
  'pk.eyJ1IjoibXR0bWNjYSIsImEiOiJja3VoMDg4ZHEwZGdsMnBteG1pZGJoeGFxIn0.NRnMD0o_j4xAAGPfHegSCQ';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
});
