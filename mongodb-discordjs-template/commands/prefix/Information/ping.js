const { EmbedBuilder } = require("discord.js")

module.exports = {
    name: "ping",
    description: "Replies with the bot ping",
  permissions: ['SendMessages'],
  run: async (client, message, args) => {

return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(client.ws.ping + "ms")
            ]
        })

  }
}