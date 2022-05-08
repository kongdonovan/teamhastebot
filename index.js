/**
 * index function to handle all commands and bot stuff
 */

const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs');
const { token, prefix } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES], presence: {status: "dnd", activities: [{name: "Team Haste | #help", type: 3}]} });
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', async () => {
    console.log('Logged in successfully!');
});

client.on('messageCreate', message => {
    if (message.author.bot) {
        return;
    }
    let cmd = message.content;
    let messageArray = cmd.split(" ");
    let messageArray2 = cmd.split("");

    if (messageArray2[0] === prefix) {
        cmd = messageArray[0].substring(1);
        const command = client.commands.get(cmd);
        command.execute(message);
    }
});

client.login(token);