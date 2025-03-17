const { 
    SlashCommandBuilder, 
    EmbedBuilder 
} = require('discord.js');

const { fetchForecast } = require('../requests/forecast');

const data = new SlashCommandBuilder()
    .setName('forecast')
    .setDescription('Replies with the weather forecast!')
    .addStringOption(option => {
        return option
            .setName('location')
            .setDescription('The location can be a city, zip/postal code, or latitute and longitude.')
            .setRequired(true);
    })
    .addStringOption(option => {
        return option
            .setName('units')
            .setDescription('The unit systems of temp: either "degrees Celcius" (metric) or "degrees Farenheit" (imperial)."')
            .setRequired(false)
            .addChoices(
                { name: '°C - degrees Celsius (metric units)', value: 'Celsius' },
                { name: '°F - degrees Farenheit (imperial units)', value: 'Farenheit' },
            );
    });

async function execute(interaction) {
    await interaction.deferReply();
    
    const location = interaction.options.getString('location');
    const units = interaction.options.getString('units') || 'Farenheit';
    const isImperial = units === 'Farenheit';

    try {
        const { weatherData, locationName } = await fetchForecast(location);
        const embed = new EmbedBuilder()
        .setColor(0x3f784d)
        .setTitle(`Weather forecast for ${locationName}...`)
        .setDescription(`Using degrees ${units}.`)
        .setTimestamp()
        .setFooter({
            text: 'Powered by weatherapi.com API',
        });

        for (const day of weatherData) {
            const tempMin = isImperial ? day.temperatureMinF : day.temperatureMinC;
            const tempMax = isImperial ? day.temperatureMaxF : day.temperatureMaxC;

            embed.addFields({
                name: day.date,
                value: `⬇️ Low: ${tempMin}°, ⬆️ High: ${tempMax}°`,
            })
        }
        await interaction.editReply({
            embeds: [
                embed,
            ],
        });
    } catch (error) { 
        await interaction.editReply(error);
    }
    
}

module.exports = {
    data,
    execute,
}