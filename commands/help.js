/**
 * help command for anything
 */
const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const {prefix} = require('../config.json')
const { categories } = require('./categories.json');

module.exports = {
    name:"help",
    category: "utility",
    description: "Gets info on any command. You can specify a specific command, a specific page, or a specific category.",
    args: "<command/page/category>",
    arglen: 1,
    argrequired: true,
    execute(message) {
        let cmdArray = message.content.split(" ");
        const embed = new MessageEmbed()
                .setTitle('HasteBot help')
                .setDescription('An index of all commands in HasteBot.');
        if (!isNaN(parseInt(cmdArray[1]))) {
            let page = parseInt(cmdArray[1]);
            let cmds = [];
            let cmdTotal = 0;
            const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(`./${file}`);
                if (command.name !== 'commandname') {
                    cmdTotal++;
                    if (command.args) {
                        cmds.push({name: command.name + " " + command.args, value: command.description});
                    } else {
                        cmds.push({name: command.name, value: command.description});
                    }
                }
            }
            console.log(cmdTotal);
            let newCmdTotal = cmdTotal / 10;
            console.log(cmdTotal);
            if (cmdTotal % 10 > 0) {
                newCmdTotal++;
            }
            if (page > newCmdTotal) {
                embed.setTitle('An error has occured!').setDescription('Only ' + newCmdTotal + ' pages exist!');
            } else {
                for (let i = 10 * (page - 1); i < Math.min(10 + (10 * (page - 1)), cmds.length); i++) {
                    embed.addField(cmds[i].name, cmds[i].value, false);
                }
                embed.setFooter('Page ' + page + '/' + newCmdTotal);
            }
        } else if (categories.includes(cmdArray[1].toLowerCase())) {
            let cmds = [];
            const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(`./${file}`);
                if (command.name !== 'commandname' && command.category === cmdArray[1].toLowerCase()) {
                    if (command.args) {
                        cmds.push({name: command.name + " " + command.args, value: command.description});
                    } else {
                        cmds.push({name: command.name, value: command.description});
                    }
                }
            }
            for (let i = 0; i < cmds.length; i++) {
                embed.addField(cmds[i].name, cmds[i].value, false);
            }
        } else {
            try {
                const otherCmd = require(`./${cmdArray[1].toLowerCase()}.js`);
                if (otherCmd.args) {
                    embed.addField(otherCmd.name + " " + otherCmd.args, otherCmd.description, false);
                } else {
                    embed.addField(otherCmd.name, otherCmd.description, false);
                }
            } catch (err) {
                embed.setTitle('An error has occured!').setDescription('The argument you passed in was not recognized. Please run ' + prefix + 'help for more info.');
            }
        }
        return message.channel.send({ embeds: [embed] });
    }
}