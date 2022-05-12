/**
 * Enables audit logs and sends them to the relevant channel
 */

const { MessageEmbed } = require('discord.js');
const { Guild } = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
    name: "auditlog",
    description: "Enables audit logs in the specified channel. Please be sure to specify either a channel id or mention the channel directly.",
    args: "<enable/disable> <channel>",
    arglen: 2,
    argrequired: true,
    execute(message) {
        const embed = new MessageEmbed()
        let cmdArray = message.content.split(" ");
        let client = message.client;
        let channel = cmdArray[2].substring(2, cmdArray[2].length - 1);
        client.auditEnabled = (cmdArray[1] === "enable");
        client.channel = channel;
        console.log(cmdArray[1])
        console.log(client.auditEnabled);
        if (client.auditEnabled) {
            embed
                .setTitle('Audit logs successfully enabled!')
                .setDescription('Messages will start being logged in <#' + channel + '>');
        } else {
            embed
                .setTitle('Audit logs successfully disabled!')
                .setDescription('Messages will no longer be logged in <#' + channel + '>');
        }
        return message.channel.send({ embeds: [embed] });
    }
}