/**
 * gets detailed user information
 *
 */
 const { MessageEmbed } = require('discord.js');
 const { Guild } = require('discord.js');
 const { prefix } = require('../config.json');

 module.exports = {
    name: "userinfo",
    description: "Returns information about a user.",
    args: "<user>",
    arglen: 1,
    argrequired: true,
    execute(message) {
        let embed = new MessageEmbed();
        let cmdArray = message.content.split(" ");
        let user = message.mentions.members.first();
        if (!user) {
            embed.setTitle('An error has occured!').setDescription('Please ping a user in order to use this command!');
            return message.channel.send({ embeds: [embed] });
        }
        let date = new Date(user.joinedTimestamp);
        if (date.getHours() / 12 >= 1) {
            date = (date.getHours() % 12) + ":" + date.getMinutes() + " PM, " + date.toDateString();
        } else {
            date = date.getHours() + ":" + date.getMinutes() + " AM, " + date.toDateString();
        }

        let roleList = user.roles.member['_roles'];
        let roleString = "";
        let footerText;
        if (user.user.bot) {
            footerText = 'ID: ' + user.user.id + ' • This user is a bot';
        } else {
            footerText = 'ID: ' + user.user.id + ' • This user is not a bot';
        }
        for (let i = 0; i < roleList.length; i++) {
            roleString += "<@&" + roleList[i] + "> ";
        }
        roleString = roleString.trim();
        embed
            .setTitle('User info on ' + user.user.tag)
            .setDescription('<@' + user.user.id + '>')
            .setThumbnail(user.user.avatarURL())
            .addField('Server join date', date, false)
            .addField('User roles', roleString)
            .setFooter({ text: footerText})
        return message.channel.send({ embeds: [embed] });
    }
}