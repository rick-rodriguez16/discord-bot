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
            .setDescription('The unit systems of temp: either "metric (°C)" or "imperial (°F)"')
            .setRequired(false)
            .addChoices(
                { name: 'Metric', value: 'metric' },
                { name: 'Imperial', value: 'imperial' },
            );
    });

async function execute(interaction) {
    await interaction.deferReply();
    
    const location = interaction.options.getString('location');
    const units = interaction.options.getString('units') || 'imperial';
    const isImperial = units === 'imperial';

    try {
        const { weatherData, locationName } = await fetchForecast(location);
        const embed = new EmbedBuilder()
        .setColor(0x3f784d)
        .setTitle(`Weather forecast for ${locationName}...`)
        .setDescription(`Using ${units}`)
        .setTimestamp()
        .setFooter({
            text: 'Powered by weatherapi.com API',
        });

        for (const day of weatherData) {
            const tempMin = isImperial == 'imperial' ? day.temperatureMinF : day.temperatureMinC;
            const tempMax = isImperial == 'imperial' ? day.temperatureMaxF : day.temperatureMaxC;

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