/**
 * Adds gif to the specified array
 */

const { MessageEmbed } = require('discord.js');
const { Guild } = require('discord.js');
const { prefix } = require('../config.json');
const fs = require('fs').promises;

module.exports = {
    name: "addgif",
    category:"admin",
    description: "Adds a gif to the specified array. Make sure to provide the link of the image source.",
    args:"<array> <image link>",
    arglen: 2,
    argrequired: true,
    async execute(message) {
        let cmdArray = message.content.split(" ");
        const embed = new MessageEmbed();
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            embed.setTitle('An error has occured!').setDescription('You do not have permission to use this command.');
        } else {
            let dir = __dirname
            let currentImgs = await fs.readFile(dir + '/images.json', 'utf8');
            let imageArrays = JSON.parse(currentImgs);
            let imageArray = imageArrays[cmdArray[1]];
            if (!imageArray) {
                embed.setTitle('An error has occured!').setDescription('You have provided an invalid array.');
            } else {
                imageArray.push(cmdArray[2]);
                let newJson = JSON.stringify(imageArrays);
                await fs.writeFile(dir + '/images.json', newJson);
                embed
                    .setTitle('Command successfully executed!')
                    .setDescription('The following gif has been added:')
                    .setImage(cmdArray[2]);
            }
        }
        return message.channel.send({ embeds: [embed] });
    }
}