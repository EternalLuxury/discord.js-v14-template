const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const config = require("./settings/config.js");
const fs = require("fs");

const client = new Client({
	 intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.User,
    Partials.GuildMember,
    Partials.Reaction
  ],
});

client.events = new Collection();
client.slash = new Collection();
client.prefix = new Collection();
client.config = config;
client.owner = config.owner;

fs.readdirSync('./handlers').forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});
client.login(process.env.token || config.token)