const fs = require('fs');
const {Client, Intents, Collection} = require('discord.js');
const { BOT_TOKEN, clientId, guildId } = require('../config.json');
const { REST } = require("@discordjs/rest");
const { Routes } = require('discord-api-types');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS]});

client.commands = new Collection();

let cmds = [];

const commandFiles = fs.readdirSync('src/commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const rest = new REST({ version: "9"}).setToken(BOT_TOKEN);

( async () => {
    try {
        console.log("Settings slash commands..");

        for(let i = 0; i < client.commands.toJSON().length; i++) {
            cmds.push(client.commands.toJSON()[i].data.toJSON())
        }

        await rest.put(
            Routes.applicationGuildCommands(
                clientId,
                guildId
            ),{
                body: cmds
            }
        );

        console.log("Success!");
    } catch (err) {
        console.error(err);
    }
})();

//Login to Discord with your client´s token
client.login(BOT_TOKEN);