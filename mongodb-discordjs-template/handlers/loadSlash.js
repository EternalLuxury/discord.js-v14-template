const { PermissionsBitField, Routes, REST, User } = require('discord.js');
const fs = require("fs");

module.exports = (client) => {
  let commands = [];

  fs.readdirSync('./commands/slash/').forEach((dir) => {
    console.log('[INFO] Started loading slash commands...');
    const SlashCommands = fs.readdirSync(`./commands/slash/${dir}`).filter((file) => file.endsWith('.js'));

    for (let file of SlashCommands) {
      let pull = require(`../commands/slash/${dir}/${file}`);

      if (pull.name, pull.description) {
        client.slash.set(pull.name, pull);

        commands.push({
          name: pull.name,
          description: pull.description,
          options: pull.options ? pull.options : null,
          bot_perms: pull.bot_perms ? pull.bot_perms : null,
          user_perms: pull.user_perms ? PermissionsBitField.resolve(pull.user_perms).toString() : null
        });

      } else {
        console.log(`[INFO] Couldn't load the file ${file}, missing module name value, description, or type isn't 1.`)
        continue;
      };
    };
  });

  // Registering all the application commands:
  if (!client.config.bot_id) {
    console.log("[INFO] You need to provide your bot ID in config.js!");
    return process.exit();
  };

  const rest = new REST({ version: '10' }).setToken(client.config.token || process.env.token);

  (async () => {
    console.log('[INFO] Started registering all the application commands.');

    try {
      await rest.put(
        Routes.applicationCommands(client.config.bot_id),
        { body: commands }
      );

      console.log('[INFO] Successfully registered all the application commands.');
    } catch (err) {
      console.log(err);
    }
  })();
};