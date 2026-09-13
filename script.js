const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const condition = document.getElementById('condition');
const humidity = document.getElementById('humidity');
const weatherIcon = document.getElementById('weatherIcon');
const errorMessage = document.getElementById('errorMessage');

// When Search button is clicked
searchBtn.addEventListener('click', getWeather);
cityInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        getWeather();
    }
});

// Function to get weather
async function getWeather() {

    const city = cityInput.value.trim();

    // Check if city input is empty
    if (city === '') {
        errorMessage.textContent = 'Please enter a city name.';
        return;
    }

    errorMessage.textContent = "";

    // Put your actual OpenWeatherMap API key here
    const apiKey = "a41596d517a4fb5a21263b4229e8de15";

    const apiUrl =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {

        const response = await fetch(apiUrl);

        // Check if city was not found
        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();


        // -----------------------------
        // Display weather information
        // -----------------------------

        cityName.textContent = data.name;

        temperature.textContent =
            `${Math.round(data.main.temp)}°C`;

        condition.textContent =
            data.weather[0].description;

        humidity.textContent =
            data.main.humidity;


        // -----------------------------
        // Get weather condition
        // -----------------------------

        const weatherCondition =
            data.weather[0].main;


        // Change background
        changeBackground(weatherCondition);


        // -----------------------------
        // Get natural weather icon
        // -----------------------------

        const iconCode =
            data.weather[0].icon;

        weatherIcon.innerHTML = `
            <img 
                src="https://openweathermap.org/img/wn/${iconCode}@2x.png"
                alt="${data.weather[0].description}"
            >
        `;

    } 
    
    catch (error) {

        errorMessage.textContent =
            "City not found. Please enter a valid city name.";
    }
}


// =====================================
// Change background according to weather
// =====================================

function changeBackground(weatherCondition) {

    if (weatherCondition === "Clear") {

        document.body.style.backgroundImage =
            "url('images/sunny.jpg')";

    } 
    
    else if (
        weatherCondition === "Rain" ||
        weatherCondition === "Drizzle"
    ) {

        document.body.style.backgroundImage =
            "url('images/rainy.jpg')";

    } 
    
    else if (weatherCondition === "Clouds") {

        document.body.style.backgroundImage =
            "url('images/cloudy.jpg')";

    } 
    
    else if (weatherCondition === "Snow") {

        document.body.style.backgroundImage =
            "url('images/snowy.jpg')";

    } 
    
    else if (weatherCondition === "Thunderstorm") {

        document.body.style.backgroundImage =
            "url('images/storm.jpg')";

    } 
    
    else {

        document.body.style.backgroundImage =
            "linear-gradient(135deg, #74ebd5, #9face6)";
    }
}