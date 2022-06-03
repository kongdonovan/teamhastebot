/**
 * A template to build commands off of.
 */

const { MessageEmbed } = require('discord.js');
const { Guild } = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
    name: "purge",
    description: "Purges the specified number of messages from a channel, up to a maximum of 100.",
    args: "<num>", // leave blank for no args
    arglen: 1, // set to -1 for infinite args
    category:"utility",
    argrequired: true,
    execute(message) {
        const embed = new MessageEmbed();
        let cmdArray = message.content.split(" ");
        let number = parseInt(cmdArray[1]);
        if (number > 100) {
            embed
                .setTitle('An error has occured!')
                .setDescription('The number you have specified is greater than the maximum number allowed.');
        } else {
            message.channel.bulkDelete(number);
            embed
                .setTitle('Command successfully executed!')
                .setDescription(number + ' messages have been purged.');
        }
        return message.channel.send({ embeds: [embed] });
    }
}