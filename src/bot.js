const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { BOT_TOKEN } = require("../config.json");

const Sequelize = require('sequelize');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

const Profile = sequelize.define('profile', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  course: Sequelize.STRING,
})

client.commands = new Collection();
const commandFiles = fs.readdirSync('src/commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

// When the client is ready, run this code (only once)
client.once('ready', () => {
	Profile.sync();
});

client.on('interactionCreate', async interaction => {
  if(!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if(!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
})

// Login to Discord with your client's token
client.login(BOT_TOKEN);