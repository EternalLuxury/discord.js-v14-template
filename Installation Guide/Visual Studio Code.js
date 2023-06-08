# Installation in Visual Studio Code

1- Install [Visual Studio Code](https://code.visualstudio.com/Download).<br>
2- Install [Node.js](https://nodejs.org/en/download/) (Required: v^16.9.0).<br>
3- Download the project [here](https://github.com/alwaysluxury/discord.js-v14-template/archive/refs/heads/main.zip).<br>
4- Extract the .zip folder into a normal folder.<br>
5- Open VSCode, click on `Open Folder` button, and then select the created folder.<br>
6- Go to `settings/config.js` and change all the configurations:

```js
module.exports = {
  token: "", //bot token
  prefix: ".", //prefix
  bot_id: "", //the bot id
  owner: "", //the owner id
  mongo: "" //this will be located in the mongodb version of this project for ur mongodb
}
```

7- Install all the required packages by using in the terminal: `npm i` or `npm install`.<br>
8- Type in the terminal: `node index.js`.<br>
