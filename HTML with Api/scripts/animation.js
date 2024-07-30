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
