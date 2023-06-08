const fs = require("fs");

module.exports = (client) => {

  fs.readdirSync('./commands/prefix/').forEach(dir => {
    const commands = fs.readdirSync(`./commands/prefix/${dir}`).filter(file => file.endsWith('.js'));
    for (let file of commands) {

      let pull = require(`../commands/prefix/${dir}/${file}`);
      if (pull.name) {
        client.prefix.set(pull.name, pull);
      } else {
        console.log(`[INFO] Couldn't load the file ${file}, missing module name value.`)
        continue;
      };

    };
  });
  console.log(`[INFO] Successfully loaded all prefix commands.`)
};