/**
 * A template to build commands off of.
 */

const { MessageEmbed } = require('discord.js');
const { Guild } = require('discord.js');
const { prefix, status } = require('../config.json');

module.exports = {
    name: "setstatus",
    category: "admin",
    description: "Changes the status of the bot. Note that you cannot remove '| !help' from the status. Valid types are PLAYING, STREAMING, LISTENING, WATCHING, COMPETING",
    args: "<type> <message>",
    arglen: -1,
    argrequired: true,
    execute(message) {
        let cmdArray = message.content.split(" ");
        let client = message.client.user;
        let str = "";
        for (let i = 2; i < cmdArray.length; i++) {
            str += cmdArray[i] + " "
        }
        str = str.trim();
        status = str;
        client.setActivity(str + " | " + prefix + "help", {type: cmdArray[1]})
        const embed = new MessageEmbed()
            .setTitle('Command successfully executed!')
            .setDescription('Status has been changed to whatever you specified.');
        return message.channel.send({ embeds: [embed] });
    }
}