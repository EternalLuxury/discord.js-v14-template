const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const blacklist = require("../../../models/blacklist.js")
module.exports = {
    name: "blacklist",
    description: "Blacklist a user from using the bot",
    options: [
        {
            name: "user",
            description: "The id of the user",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
      {
            name: "reason",
            description: "The reason why this user should be blacklisted.",
            type: ApplicationCommandOptionType.String,
            required: false,
      }
    ],
    bot_perms: "",
    user_perms: "",
    run: async (client, interaction) => {
      if(interaction.user.id !== client.owner) return interaction.reply({ content: "> You are not the owner of this bot!", ephemeral: true })
      const id = interaction.options.getString("user")
      const reason = interaction.options.get("reason") || "No reason provided"
      const user = await client.users.cache.get(id)
      if(!user) return interaction.reply({ content: "> I couldnt find this user in any server that i am in!", ephemeral: true })

      const data = await blacklist.findOne({ user: user.id })
      if(data) {
        interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription("This user is already blacklisted!")
            ]
        })
      } else {
        new blacklist({
          user: user.id,
          reason: reason
        }).save()
interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`Successfully blacklisted ${user.username}!`)
            ]
        })
        
      }
    },
};