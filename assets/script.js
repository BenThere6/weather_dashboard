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
    const cityName = city_search.value;

    const coordsApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    var latitude;
    var longitude;

    fetch(coordsApiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            iconCode = data.weather[0].icon;
            iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
            tempKelvin = data.main.temp;
            temp = ((tempKelvin - 273.15) * 9/5 + 32).toFixed(1);
            wind = data.wind.speed;
            humidity = data.main.humidity;

            console.log(iconCode)
            console.log(temp)
            console.log(wind)
            console.log(humidity)
        })
        .catch(error => {
            console.error('Error:', error);
        });
    city_search.value = '';
});
