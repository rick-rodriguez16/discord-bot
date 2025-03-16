const { 
    REST, 
    Routes 
} = require('discord.js')

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN)

async function clientReadyHandler(client) {
    // console.log("Client: ", client);
    console.log(`Logged in as ${client.user.tag}!`);
    
    try {
        
        if (client.commands.size == 1) {
            console.log(`Started refreshing ${client.commands.size} command!`);
        }
        else {
            console.log(`Started refreshing ${client.commands.size} commands!`);
        }

        const data = await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            {
                body: client.commands.map(command => {
                    return command.data.toJSON();
                })
            }
        );

        if (client.commands.size == 1) {
            console.log(`Successfully loaded ${data.length} command!`);
        }
        else {
            console.log(`Successfully loaded ${data.length} commands!`);
        }
    } catch (error) {
        console.error(error);
    }
    
}

module.exports = {
    clientReadyHandler,
}