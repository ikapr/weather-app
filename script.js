var APIKey = '42c4c51dd2611a43a5d650b945c0396f';
var weatherInfoElement = document.getElementById("weatherInfo");

function getWeather() {
    var locationInput = document.getElementById("locationInput").value;

    if (locationInput) {
        var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locationInput}&appid=${APIKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Check if the API request was successful
                if (data.cod === 200) {
                    displayWeather(data);
                } else {
                    displayError(data.message);
                }
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                displayError('An error occurred while fetching weather data.');
            });
    } else {
        displayError('Please enter a location.');
    }
}

function displayWeather(data) {
    var temperature = data.main.temp;
    var description = data.weather[0].description;
    var cityName = data.name;

    var weatherHtml = `<p>Temperature: ${temperature} K</p>
                       <p>Description: ${description}</p>
                       <p>City: ${cityName}</p>`;

    weatherInfoElement.innerHTML = weatherHtml;
}

function displayError(message) {
    weatherInfoElement.innerHTML = `<p style="color: red;">Error: ${message}</p>`;
}