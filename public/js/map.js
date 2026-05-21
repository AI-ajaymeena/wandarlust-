mapboxgl.accessToken = map_token;

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: listing.geometry.coordinates,
    zoom: 9
});

const marker1 = new mapboxgl.Marker({
    color: "#98daf7"})
        .setLngLat(listing.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<h4>${listing.location}</h4><p>Your beautiful place here!</p>`))
        .addTo(map);

    console.log(marker1);