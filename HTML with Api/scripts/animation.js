// Animaciones

function showLoading() {
    const loading = document.getElementById('loading');
    loading.classList.add('visible');
    document.getElementById('data-container').innerHTML = '';
    document.getElementById('forecast-container').innerHTML = '';
}

function hideLoading() {
    const loading = document.getElementById('loading');
    loading.classList.remove('visible');
}

// Enter a Click
const input = document.getElementById('city-input');
const button = document.getElementById('search-button');

input.addEventListener('keydown', function(event) {
if (event.key === 'Enter') {
    button.focus();
    button.click(); // Activa el botón
}
});