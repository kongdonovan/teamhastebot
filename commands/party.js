/**
 * This command sends a party gif (unless it's Al Jeffrey).
 */

const { MessageEmbed } = require('discord.js');
const { Guild } = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
    name: "party",
    description: "Sends a partying gif",
    arglen: 0,
    argrequired: true,
    execute(message) {
        const embed = new MessageEmbed()
        const partyGifs = ['https://c.tenor.com/DAie-OSOmPUAAAAd/cat-rave-disco.gif', 'https://c.tenor.com/cJT03aJDgmMAAAAC/go-disco.gif', 'https://c.tenor.com/MuS-pZNIBk4AAAAi/usagyuuun-fiesta.gif', 'https://c.tenor.com/5kwkfiTj-sEAAAAM/puppet-dance.gif', 'https://c.tenor.com/P-8ZvqnS4AwAAAAC/dancing-cat-dancing-kitten.gif', 'https://c.tenor.com/XUFgKlz1DOUAAAAM/yakuza0-friday.gif']
        const noPartyGifs = ['https://c.tenor.com/u_FwUVbePD0AAAAd/wongrande.gif', 'https://c.tenor.com/EOPBXPudW7sAAAAC/sad.gif', 'https://c.tenor.com/KhBoBD7g1l0AAAAM/le-sad.gif','https://c.tenor.com/YmbhZefrpy8AAAAM/sad-frown.gif']
        const alJeffreyId = '180875339054972928'
        const choosePartyGif = partyGifs[Math.floor(Math.random() * partyGifs.length)];
        const chooseNoPartyGif = noPartyGifs[Math.floor(Math.random() * noPartyGifs.length)];
        const author = message.member.id;

        if (author === alJeffreyId) {
            embed
                .setTitle('sorry, no party time for you :(')
                .setImage(chooseNoPartyGif);
        } else {
            embed
                .setTitle("IT'S PARTY TIME!!!!!!! 🎉🎉🎉")
                .setImage(choosePartyGif);
        }
        return message.channel.send({ embeds: [embed] });
    }
}