# Weather-Astro Discord Bot
## A Nodejs script that can provide a user weather forecast and astronomical data


### Motivation

Being a fervent user of the discord app on desktop and mobile, I wanted to learn how to create a discord bot and integrate an API with it. I used the openweather API (weatherapi.com) to provide discord users with the weather forecast for a city or zip code along with sun/moon rise and set times.

### Instructions

# Node and npm are required. Use [nvm](https://github.com/nvm-sh/nvm).
# An API key is needed from [weatherapi](https://www.weatherapi.com/).


1. Fork this repository
2. Open your preferred method of developer environment and, if necessary, clone the repo
3. Run `npm install`
4. Create a `.env` file and include the following keys:
    a. `DISCORD_TOKEN`
    b. `CLIENT_ID`
    c. `GUILD_ID`
    d. `WEATHER_API_KEY`

### Examples

**Using the /forecast command** :partly_sunny:
![Forecast image](assets/forecast.png)

**Using the /astro command** :sunrise:
![Astronomical image](assets/astro.png)