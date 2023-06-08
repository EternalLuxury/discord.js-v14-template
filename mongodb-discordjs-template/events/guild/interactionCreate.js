const { PermissionsBitField, InteractionType, EmbedBuilder } = require("discord.js");
const blacklist = require("../../models/blacklist.js")
module.exports = async(client, interaction) => {
  if (interaction.isChatInputCommand()) {
    const command = client.slash.get(interaction.commandName);

    if (!command) return;

    const bl = await blacklist.findOne({ user: interaction.user.id })
    if(bl) {
      interaction.reply({ embeds: [
        new EmbedBuilder()
        .setTitle("You are blacklisted from using this bot!")
        .addFields(
          {
            name: "Reason",
            value: `${bl.reason}`
          }
        )
      ]})
      return false;
    } 

    try {
      command.run(client, interaction);
    } catch (e) {
      console.error(e)
    };
  };
  }