// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { BOT_TOKEN, CLIENT_ID, GUILD_ID } = require("../config.json");

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
  if(!interaction.isCommand()) return;
})

// Login to Discord with your client's token
client.login(BOT_TOKEN);