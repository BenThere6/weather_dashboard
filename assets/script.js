var city_search = document.getElementById('city_search');
var city = document.getElementById('city');
var today_date = document.getElementById('today_date');
var today_icon = document.getElementById('today_icon');
var today_temp = document.getElementById('today_temp');
var today_wind = document.getElementById('today_wind');
var today_humidity = document.getElementById('today_humidity');
var day_one_date = document.getElementById('day_one_date');
var day_one_icon = document.getElementById('day_one_icon');
var day_one_temp = document.getElementById('day_one_temp');
var day_one_wind = document.getElementById('day_one_wind');
var day_one_humidity = document.getElementById('day_one_humidity');
var day_two_date = document.getElementById('day_two_date');
var day_two_icon = document.getElementById('day_two_icon');
var day_two_temp = document.getElementById('day_two_temp');
var day_two_wind = document.getElementById('day_two_wind');
var day_two_humidity = document.getElementById('day_two_humidity');
var day_three_date = document.getElementById('day_three_date');
var day_three_icon = document.getElementById('day_three_icon');
var day_three_temp = document.getElementById('day_three_temp');
var day_three_wind = document.getElementById('day_three_wind');
var day_three_humidity = document.getElementById('day_three_humidity');
var day_four_date = document.getElementById('day_four_date');
var day_four_icon = document.getElementById('day_four_icon');
var day_four_temp = document.getElementById('day_four_temp');
var day_four_wind = document.getElementById('day_four_wind');
var day_four_humidity = document.getElementById('day_four_humidity');
var day_five_date = document.getElementById('day_five_date');
var day_five_icon = document.getElementById('day_five_icon');
var day_five_temp = document.getElementById('day_five_temp');
var day_five_wind = document.getElementById('day_five_wind');
var day_five_humidity = document.getElementById('day_five_humidity');

var mainEl = document.getElementById('main');

const user_search_form = document.getElementById('user_search_form');
const apiKey = '4631f6bc4da95898d19c50c6d5491e03';
var success = false;

user_search_form.addEventListener('submit', function(e) {
    e.preventDefault();
    genWeatherInfo();
});

// Pull recentSearches from local storage
const recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];

function updateRecentSearches() {
    const recentSearchesContainer = document.getElementById('recent_searches');
    recentSearchesContainer.innerHTML = '';

    recentSearches.forEach(city => {
        const cityButton = document.createElement('button');
        cityButton.classList.add('bar-style');
        cityButton.textContent = city;
        cityButton.addEventListener('click', () => {
            city_search.value = city;
            genWeatherInfo();
        });
        recentSearchesContainer.appendChild(cityButton);
    });
}

// If new search isn't in history, add it and update the buttons
function addToRecentSearches(city) {
    if (!recentSearches.includes(city)) {
        recentSearches.push(city);
        localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
        updateRecentSearches();
    }
}

function genWeatherInfo() {
    success = false;
    const cityName = city_search.value;

    const coordsApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    fetch(coordsApiUrl)
        // When fetching the API, wait for response, THEN check if response is ok
        .then(response => {
            if (response.ok) {
                success = true;
                return response.json();
            } else {
                throw new Error('API request failed');
            }
        })

        // When response check is complete, THEN parse the data received
        .then(data => {
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
            const tempKelvin = data.main.temp;
            const temp = ((tempKelvin - 273.15) * 9/5 + 32).toFixed(1);
            const wind = data.wind.speed;
            const humidity = data.main.humidity;

            city.textContent = cityName;
            const today = dayjs().format('M/D/YYYY');
            today_date.textContent = today;
            today_icon.src = iconUrl;
            today_temp.textContent = 'Temp: ' + temp + '\u00B0F';
            today_wind.textContent = 'Wind: ' + wind + ' MPH';
            today_humidity.textContent = 'Humidity: ' + humidity + '%';

            addToRecentSearches(cityName);
            main.style.display = 'block'
        })
        .catch(error => {
            console.error('Error:', error);
        });

    const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;

    fetch(forecastApiUrl)
    .then(response => {
        // When fetching the API, wait for response, THEN check if response is ok
        if (response.ok) {
            success = true;
            return response.json();
        } else {
            throw new Error('API request failed');
        }
    })

        // When response check is complete, THEN parse the data received
        .then(data => {
            const forecastList = data.list;
            const iconUrlArray = [];
            const tempArray = [];
            const windArray = [];
            const humidityArray = [];

            // Forecast is given in 3 hour increments, for-loop goes up by 8 to get daily weather info (3*8=24(one day))
            for (let i = 7; i < forecastList.length; i += 8) {
                const forecast = forecastList[i];

                const iconCode = forecast.weather[0].icon;
                const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
                const tempKelvin = forecast.main.temp;
                const temp = ((tempKelvin - 273.15) * 9/5 + 32).toFixed(1);
                const wind = forecast.wind.speed;
                const humidity = forecast.main.humidity;

                iconUrlArray.push(iconUrl);
                tempArray.push(temp);
                windArray.push(wind);
                humidityArray.push(humidity);
            }

            day_one_icon.src = iconUrlArray[0];
            day_two_icon.src = iconUrlArray[1];
            day_three_icon.src = iconUrlArray[2];
            day_four_icon.src = iconUrlArray[3];
            day_five_icon.src = iconUrlArray[4];

            day_one_date.textContent = dayjs().add(1, 'day').format('M/D/YYYY');
            day_two_date.textContent = dayjs().add(2, 'day').format('M/D/YYYY');
            day_three_date.textContent = dayjs().add(3, 'day').format('M/D/YYYY');
            day_four_date.textContent = dayjs().add(4, 'day').format('M/D/YYYY');
            day_five_date.textContent = dayjs().add(5, 'day').format('M/D/YYYY');

            day_one_temp.textContent = 'Temp: ' + tempArray[0] + '\u00B0F';
            day_two_temp.textContent = 'Temp: ' + tempArray[1] + '\u00B0F';
            day_three_temp.textContent = 'Temp: ' + tempArray[2] + '\u00B0F';
            day_four_temp.textContent = 'Temp: ' + tempArray[3] + '\u00B0F';
            day_five_temp.textContent = 'Temp: ' + tempArray[4] + '\u00B0F';

            day_one_wind.textContent = 'Wind: ' + windArray[0] + ' MPH';
            day_two_wind.textContent = 'Wind: ' + windArray[1] + ' MPH';
            day_three_wind.textContent = 'Wind: ' + windArray[2] + ' MPH';
            day_four_wind.textContent = 'Wind: ' + windArray[3] + ' MPH';
            day_five_wind.textContent = 'Wind: ' + windArray[4] + ' MPH';

            day_one_humidity.textContent = 'Humidity: ' + humidityArray[0] + '%';
            day_two_humidity.textContent = 'Humidity: ' + humidityArray[1] + '%';
            day_three_humidity.textContent = 'Humidity: ' + humidityArray[2] + '%';
            day_four_humidity.textContent = 'Humidity: ' + humidityArray[3] + '%';
            day_five_humidity.textContent = 'Humidity: ' + humidityArray[4] + '%';
        })
        .catch(error => {
            console.error('Error:', error);
        });
    city_search.value = '';
}

function init() {
    updateRecentSearches();
    main.style.display = 'none';
};

init();