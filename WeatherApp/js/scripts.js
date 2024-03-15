const API_KEY = 'your-api-key';
//6b791fac3c81452bc80487f349490e84
const DEFAULT_CITY = 'Ho Chi Minh';
const apiWeatherInfoUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${API_KEY}`;
const apiGetGeoByCityNameUrl = `http://api.openweathermap.org/geo/1.0/direct?limit=1&appid=${API_KEY}`;

const searchBox = document.querySelector('.search-box');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');

async function GetWeatherInformation(cityName){
    const getGeoByCityNameResponse = await fetch(apiGetGeoByCityNameUrl + `&q=${cityName}`);
    var cityGeoInformation = await getGeoByCityNameResponse.json();
    if(cityGeoInformation && cityGeoInformation[0].lat && cityGeoInformation[0].lon){
        const getWeatherInformationResponse = await fetch(apiWeatherInfoUrl + `&lat=${cityGeoInformation[0].lat}` + `&lon=${cityGeoInformation[0].lon}`);
    
        var weatherData = await getWeatherInformationResponse.json();
        
        document.querySelector('.city').innerHTML = weatherData.name;
        document.querySelector('.temp').innerHTML = Math.round(weatherData.main.temp) + '°C';
        document.querySelector('.humidity').innerHTML = weatherData.main.humidity + '%';
        document.querySelector('.wind').innerHTML = weatherData.wind.speed + ' km/h';

        switch(weatherData.weather[0].main){
            case 'Clouds':
                weatherIcon.src = 'assets/img/clouds.png';
                break;
            case 'Clear':
                weatherIcon.src = 'assets/img/clear.png';
                break;
            case 'Rain':
                weatherIcon.src = 'assets/img/rain.png';
                break;
            case 'Drizzle':
                weatherIcon.src = 'assets/img/drizzle.png';
                break;
            default:
                weatherIcon.src = 'assets/img/mist.png';
        }
    }
}
GetWeatherInformation(DEFAULT_CITY);

searchBtn.addEventListener('click', () => {
    GetWeatherInformation(searchBox.value);
});