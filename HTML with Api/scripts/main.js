// script.js

document.getElementById('search-button').addEventListener('click', handleSearch);

function handleSearch() {
    document.getElementById('data-section').style.display = 'block';
    const city = document.getElementById('city-input').value.trim();
    if (!isValidCity(city)) {
        alert('Por favor, ingresa el nombre de una ciudad válida (solo letras y espacios).');
        return;
    }

    showLoading();
    fetchWeatherData(city)
        .then(data => {
            displayWeatherData(data);
            saveToHistory(city);
            displaySearchHistory();
            return fetchForecastData(city);
        })
        .then(displayForecastData)
        .catch(handleError)
        .finally(hideLoading);
}

function isValidCity(city) {
    return /^[a-zA-Z\s]+$/.test(city);
}

function fetchWeatherData(city) {
    const apiKey = '95a9999e17cb154351227878c751ea64';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=metric&lang=es`;
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Ciudad no encontrada');
                }
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        });
}

function fetchForecastData(city) {
    const apiKey = '95a9999e17cb154351227878c751ea64';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${apiKey}&units=metric&lang=es`;
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        });
}

function displayWeatherData(data) {
    const dataContainer = document.getElementById('data-container');
    dataContainer.innerHTML = `
        <h3>${data.name}, ${data.sys.country}</h3>
        <p>Temperatura: ${data.main.temp.toFixed(1)}°C</p>
        <p>Clima: ${data.weather[0].description}</p>
        <p>Humedad: ${data.main.humidity}%</p>
        <p>Viento: ${data.wind.speed} m/s</p>
    `;
}

function displayForecastData(data) {
    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = data.list
        .filter((_, index) => index % 8 === 0) // Filtra para obtener datos cada 24 horas (8 intervalos de 3 horas)
        .map(forecast => `
            <div class="forecast-item">
                <h4>${new Date(forecast.dt_txt).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'short' })}</h4>
                <p>Temp: ${forecast.main.temp.toFixed(1)}°C</p>
                <p>${forecast.weather[0].description}</p>
            </div>
        `)
        .join('');
}

function handleError(error) {
    const dataContainer = document.getElementById('data-container');
    dataContainer.innerHTML = `<p>No se pudieron obtener los datos. ${error.message}</p>`;
    console.error('Error:', error);
}

function saveToHistory(city) {
    let history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    if (!history.includes(city)) {
        history.push(city);
        localStorage.setItem('searchHistory', JSON.stringify(history));
    }
}

function displaySearchHistory() {
    const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    const historyContainer = document.getElementById('search-history');
    historyContainer.innerHTML = history.map(city => `
        <li>${city}
            <button class="btnHistory" onclick="deleteItem('${city}', this);">Delete</button>
        </li>
        `).join('');
}

function deleteItem(city, buttonElement) {
    buttonElement.parentNode.remove();

    const history = JSON.parse(localStorage.getItem('searchHistory'));
    const index = history.indexOf(city);
    if (index !== -1) {

        history.splice(index, 1);

        localStorage.setItem('searchHistory', JSON.stringify(history));
    }
}

// Mostrar historial al cargar la página
document.addEventListener('DOMContentLoaded', displaySearchHistory);

// JavaScript para manejar autocompletado
const cityInput = document.getElementById('city-input');
const autocompleteContainer = document.getElementById('autocomplete-container');

cityInput.addEventListener('input', handleInput);

function handleInput() {
    const query = cityInput.value.trim().toLowerCase();
    if (query.length < 2) {
        autocompleteContainer.innerHTML = '';
        return;
    }
    fetchAutocompleteSuggestions(query)
        .then(displaySuggestions)
        .catch(error => console.error('Error fetching autocomplete suggestions:', error));
}

function fetchAutocompleteSuggestions(query) {
    const suggestions = ['London', 'Los Angeles', 'Lisbon', 'Lima', 'Lagos', 'Lyon', 'Taxisco', 'Guatemala', 'México', 'Argentina', 'Salvador'].filter(city => city.toLowerCase().includes(query));
    return Promise.resolve(suggestions);
}

function displaySuggestions(suggestions) {
    autocompleteContainer.innerHTML = suggestions.map(city => `<div class="autocomplete-suggestion">${city}</div>`).join('');
    const suggestionElements = document.querySelectorAll('.autocomplete-suggestion');
    suggestionElements.forEach(element => {
        element.addEventListener('click', () => {
            cityInput.value = element.textContent;
            autocompleteContainer.innerHTML = '';
        });
    });
}
