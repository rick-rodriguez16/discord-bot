const axios = require('axios');

const { SlashCommandBuilder } = require('discord.js');
const URL = 'https://api.weatherapi.com/v1/forecast.json';
const weatherKey = process.env.WEATHER_API_KEY;
const FORECAST_DAYS = 3;

async function fetchForecast(location) {
    return await axios({
        url: URL,
        method: 'get',
        params: {
            q: location,
            days: FORECAST_DAYS,
            key: weatherKey
        },
        responseType: 'json',
    })
    .then(res => {
        const city = res.data.location.name;
        const country = res.data.location.country;
        const locationName = `${city}, ${country}`;

        const weatherData = res.data.forecast.forecastday.map(forecastDay => {
            return {
                date: forecastDay.date,
                temperatureMinC: forecastDay.day.mintemp_c,
                temperatureMaxC: forecastDay.day.maxtemp_c,
                temperatureMinF: forecastDay.day.mintemp_f,
                temperatureMaxF: forecastDay.day.maxtemp_f,
                sunriseTime: forecastDay.astro.sunrise,
                sunsetTime: forecastDay.astro.sunset,
                moonriseTime: forecastDay.astro.moonrise,
                moonsetTime: forecastDay.astro.moonset,
            };
        });

        return {
            locationName,
            weatherData,
        };
    })
    .catch(err => {
        console.error(err);
        throw new Error(`Error fetching forecast for ${locationName}`);
    });
}

module.exports = {
    fetchForecast,
}