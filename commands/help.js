/**
 * help command for anything
 */
const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const {prefix} = require('../config.json')

module.exports = {
    name:"help",
    description: "Gets info on any command. If you leave the command argument blank, it will give info on all commands.",
    args: "<command>",
    arglen: 1,
    argrequired: false,
    execute(message) {
        let cmdArray = message.content.split(" ");
        const embed = new MessageEmbed()
                .setTitle('HasteBot help')
                .setDescription('An index of all commands in HasteBot.');
        if (cmdArray.length === arglen) {
            let cmdArray = [];
            const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(`./${file}`);
                if (command.args) {
                    cmdArray.push({name: command.name + " " + command.args, value: command.description, inline: true});
                } else {
                    cmdArray.push({name: command.name, value: command.description, inline: true});
                }
            }
            for (let i = 0; i < cmdArray.length; i++) {
                embed.addField(cmdArray[i].name, cmdArray[i].value, false);
            }
        } else {
            const otherCmd = require(`./${cmdArray[1]}.js`);
            if (otherCmd.args) {
                embed.addField(otherCmd.name + " " + otherCmd.args, otherCmd.description, false);
            } else {
                embed.addField(otherCmd.name, otherCmd.description, false);
            }
        }
        return message.channel.send({ embeds: [embed] });
    }
}