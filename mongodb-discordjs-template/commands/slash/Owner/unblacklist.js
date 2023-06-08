const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const blacklist = require("../../../models/blacklist.js")
module.exports = {
    name: "unblacklist",
    description: "Unblacklist a user from using the bot",
    options: [
        {
            name: "user",
            description: "The id of the user",
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],
    bot_perms: "",
    user_perms: "",
    run: async (client, interaction) => {
      if(interaction.user.id !== client.owner) return interaction.reply({ content: "> You are not the owner of this bot!", ephemeral: true })
      const user = interaction.options.getString("user")

      const data = await blacklist.findOne({ user: user })
      if(!data) {
        interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription("This user is not blacklisted!")
            ]
        })
      } else {
        await blacklist.deleteOne({ user: user })
interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`Successfully unblacklisted ${user}!`)
            ]
        })
        
      }
    },
};