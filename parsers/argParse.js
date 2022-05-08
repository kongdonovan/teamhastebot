/**
 * error handler if a user passes in too many args
 */
const {prefix} = require('../config.json');
const { MessageEmbed, Message } = require('discord.js');

module.exports = {
    name: 'argparse',
    description: 'parses arguments for error handling',
    execute(arglen, argreq, cmd, message) {
        let cmdLenStr = ``;
        let isPlural;
        if (argreq) {
            cmdLenStr = `${arglen}`;
        } else {
            cmdLenStr = `up to ${arglen}`;
        }
        if (arglen === 1) {
            isPlural = 'argument';
        } else {
            isPlural = 'arguments';
        }
        let strMsg = `This command accepts ${cmdLenStr} ${isPlural}. Please run ` + prefix + `help ${cmd} for more info.`
        let embed = new MessageEmbed()
            .setTitle('An error has occured!')
            .setDescription(strMsg);
        return message.channel.send({ embeds: [embed] });
    }
}