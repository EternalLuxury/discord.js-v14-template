const { EmbedBuilder, PermissionsBitField } = require("discord.js")

module.exports = async(client, message) => {

  if (message.channel.type !== 0) return;
  if (message.author.bot) return;

  const prefix = client.config.prefix;

  if (!message.content.startsWith(prefix)) return;
  if (!message.guild) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length == 0) return;

  let command = client.prefix.get(cmd);

  if (!command) return;

  if (command) {
    if (command.permissions) {
      if (!message.member.permissions.has(PermissionsBitField.resolve(command.permissions || []))) return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`You do not have perms to use this command.`)
        ]
      })
    };

    try {
      command.run(client, message, args);
    } catch (error) {
      console.error(error);
    };
  }
  
}