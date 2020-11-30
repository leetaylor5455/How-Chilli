export default function fetchData() {
    return new Promise(async (resolve) => {
        const apiKey = '3c0ee22f10b958b6f5cffbe850d69a12';
        const colchester = 'lat=51.8959&lon=0.8919';

        const fetchWeatherData = new Promise((resolve, reject) => {
            fetch(`https://api.openweathermap.org/data/2.5/onecall?${colchester}&exclude=minutely,daily&units=metric&appid=${apiKey}`)
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(err => reject(err));
        });

        const weatherData = await fetchWeatherData;

        const current = {
            temp: weatherData.current.temp,
            feelsLike: weatherData.current.feels_like
        }

        const later = {
            temp: weatherData.hourly[3].temp, // 3 hours from current hour
            feelsLike: weatherData.hourly[3].feels_like,
            time: weatherData.hourly[3].dt
        }

        resolve({ current, later });
    });
}