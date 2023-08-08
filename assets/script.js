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

var cityName = 'New York';
const user_search_form = document.getElementById('user_search_form');
const apiKey = '4631f6bc4da95898d19c50c6d5491e03';

user_search_form.addEventListener('submit', function(e) {
    e.preventDefault();
    var cityName = city_search.value;

    const coordsApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    fetch(coordsApiUrl)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            iconCode = data.weather[0].icon;
            iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
            tempKelvin = data.main.temp;
            temp = ((tempKelvin - 273.15) * 9/5 + 32).toFixed(1);
            wind = data.wind.speed;
            humidity = data.main.humidity;

            city.textContent = cityName;
            today = dayjs().format('M/D/YYYY');
            today_date.textContent = today;
            today_icon.src = iconUrl;
            today_temp.textContent = temp + '\u00B0F';
            today_wind.textContent = wind + ' MPH';
            today_humidity.textContent = humidity + '%';
        })
        .catch(error => {
            console.error('Error:', error);
        });

    const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;
    
    var iconUrlArray = [];
    var tempArray = [];
    var windArray = [];
    var humidityArray = [];

    fetch(forecastApiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data.list);
            for (i=0;i<data.list.length;i+=8) {
                const forecast = data.list[i];

                // Access data points from the forecast entry
                const iconCode = forecast.weather[0].icon;
                const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
                const tempKelvin = forecast.main.temp;
                const temp = ((tempKelvin - 273.15) * 9/5 + 32).toFixed(1);
                const wind = forecast.wind.speed;
                const humidity = forecast.main.humidity;

                // Push values to respective arrays
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

            day_one_temp.textContent = tempArray[0] + '\u00B0F';
            day_two_temp.textContent = tempArray[1] + '\u00B0F';
            day_three_temp.textContent = tempArray[2] + '\u00B0F';
            day_four_temp.textContent = tempArray[3] + '\u00B0F';
            day_five_temp.textContent = tempArray[4] + '\u00B0F';

            day_one_wind.textContent = windArray[0] + ' MPH';
            day_two_wind.textContent = windArray[1] + ' MPH';
            day_three_wind.textContent = windArray[2] + ' MPH';
            day_four_wind.textContent = windArray[3] + ' MPH';
            day_five_wind.textContent = windArray[4] + ' MPH';

            day_one_humidity.textContent = humidityArray[0] + '%';
            day_two_humidity.textContent = humidityArray[1] + '%';
            day_three_humidity.textContent = humidityArray[2] + '%';
            day_four_humidity.textContent = humidityArray[3] + '%';
            day_five_humidity.textContent = humidityArray[4] + '%';
        })
        .catch(error => {
            console.error('Error:', error);
        });
    city_search.value = '';
});
