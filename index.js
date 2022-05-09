/**
 * index function to handle all commands and bot stuff
 */

// Required dependencies and modules
const { Client, Collection, Intents, MessageEmbed } = require('discord.js');
const fs = require('fs');
const { token, prefix } = require('./config.json');

// Object initializations
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES], presence: {status: "dnd", activities: [{name: "Team Haste | " + prefix + "help", type: 3}]} });
client.commands = new Collection();
let parsers = new Collection();

// Command and parser retrievers
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const argParse = require('./parsers/argParse.js');

// Requires all commands and inserts them into client.commands
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
    if (command.name !== "template") {
        client.commands.set(command.name, command);
    }
}

// Outputs to the console whenever bot is running
client.once('ready', async () => {
    console.log('Logged in successfully!');
});

// Reads a message sent in chat and either goes into error handling or runs command
client.on('messageCreate', message => {
    // Returns if the message author is a bot
    if (message.author.bot) {
        return;
    }

    // Sends a surprise if you're unlucky enough.
    let num = Math.floor(Math.random() * 1000);
    if (num === 69) {
        let embed = new MessageEmbed()
            .setTitle('haha funny penis gif')
            .setImage('https://media.discordapp.net/attachments/527670498658746388/533155330637430796/image.gif');
        return message.channel.send({embeds: [embed]});
    }

    // Splits the message content into two arrays, one split by whitespace and one split by character
    let cmd = message.content;
    let messageArray = cmd.split(" ");
    let messageArray2 = messageArray[0].split("");

    // If the first character matches the prefix, fire the associated command (or return if command does not exist)
    if (messageArray2[0] === prefix) {
        cmd = messageArray[0].substring(1);
        const command = client.commands.get(cmd);
        if (!command) {
            return;
        }
        const arglen = command.arglen;
        const argIsRequired = command.argrequired;
        if ((argIsRequired && arglen != messageArray.length - 1) || (messageArray.length - 1 > arglen)) {
            argParse.execute(arglen, argIsRequired, cmd, message);
            return;
        }
        command.execute(message);
        return;
    }
});

// Logs in to bot (todo: move into environment variables maybe)
client.login(token);