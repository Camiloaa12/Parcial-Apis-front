const container = document.querySelector('.container');
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherBox = document.getElementById('weather-box');
const notFound = document.getElementById('not-found');
const loader = document.getElementById('loader');

// Elements to update
const cityName = document.getElementById('city-name');
const countryCode = document.getElementById('country-code');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');

searchBtn.addEventListener('click', () => {
    checkWeather(cityInput.value);
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkWeather(cityInput.value);
    }
});

async function checkWeather(city) {
    if (city === '') return;

    // Reset UI
    weatherBox.style.display = 'none';
    notFound.style.display = 'none';
    loader.style.display = 'block';

    try {
        // Fetch from local backend
        const response = await fetch(`http://localhost:3000/api/weather?city=${city}`);
        const data = await response.json();

        loader.style.display = 'none';

        if (response.status === 404) {
            notFound.style.display = 'block';
            return;
        }

        if (!response.ok) {
            alert(data.error || 'Error al obtener el clima');
            return;
        }

        // Update UI with data
        cityName.textContent = data.city;
        countryCode.textContent = data.country;
        temperature.textContent = Math.round(data.temp);
        description.textContent = data.description;
        humidity.textContent = `${data.humidity}%`;
        windSpeed.textContent = `${data.wind} km/h`;
        weatherIcon.src = data.icon;

        weatherBox.style.display = 'flex';

    } catch (error) {
        loader.style.display = 'none';
        console.error('Error:', error);
        alert('Error de conexión. Asegúrate de que el servidor backend esté corriendo en el puerto 3000.');
    }
}
