const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Get the avatar URL of the tagged user(s), or your own avatar.'),
  execute(message) {
      if(!message.mentions.users.size) {
          return message.reply(`Your avatar: ${message.author.displayAvatarURL({   dynamic: true })}`);
      }

      const avatarList = message.mentions.users.map(user => {
          return `${user.username}'s avatar: ${user.displayAvatarURL({ dynamic: true })}`;
      })
      
      message.reply(avatarList);
  }
}