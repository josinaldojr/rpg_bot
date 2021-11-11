const {Client, Intents, Collection} = require('discord.js');
const { prefix, BOT_TOKEN } = require('../config.json')

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS]});

client.once('ready', () => {
    console.log("Ready!");
})

//Login to Discord with your client´s token
client.login(BOT_TOKEN);