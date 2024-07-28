// script.js

document.getElementById('search-button').addEventListener('click', function() {
    const city = document.getElementById('city-input').value.trim();
    const loadingIndicator = document.getElementById('loading');
    const dataContainer = document.getElementById('data-container');

    if (!city) {
        alert('Por favor, ingresa el nombre de una ciudad.');
        return;
    }

    loadingIndicator.style.display = 'block';
    dataContainer.innerHTML = '';

    const apiKey = '95a9999e17cb154351227878c751ea64'; // Reemplaza con tu clave API de OpenWeatherMap
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=metric&lang=es`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Ciudad no encontrada');
                }
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            loadingIndicator.style.display = 'none';
            dataContainer.innerHTML = `
                <h3>${data.name}, ${data.sys.country}</h3>
                <p>Temperatura: ${data.main.temp.toFixed(1)}°C</p>
                <p>Clima: ${data.weather[0].description}</p>
                <p>Humedad: ${data.main.humidity}%</p>
                <p>Viento: ${data.wind.speed} m/s</p>
            `;
        })
        .catch(error => {
            loadingIndicator.style.display = 'none';
            dataContainer.innerHTML = `<p>No se pudieron obtener los datos. ${error.message}</p>`;
            console.error('Error:', error);
        });
});
