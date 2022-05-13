/**
 * A template to build commands off of.
 */

const { MessageEmbed } = require('discord.js');
const { Guild } = require('discord.js');
const { prefix } = require('../config.json');
const fetch = require('node-fetch');

module.exports = {
    name: "puppy",
    category: "fun",
    description: "Gives you a cute image of a puppy.",
    arglen: 0,
    argrequired: true,
    async execute(message) {
        try {
            let randNum = Math.floor(Math.random() * 100);
            const embed = new MessageEmbed()
            if (randNum <= 5) {
                const images = ['https://c.tenor.com/Tvvm1Z1HXnsAAAAC/twerk-sex-horny-fuckme-roblox.gif', 'https://c.tenor.com/aACtrJmVYMgAAAAd/twerk.gif']
                embed.setTitle('A... black dude shaking his ass??? 😳').setImage(images[Math.floor(Math.random()* images.length)]);
            } else {
                let img = await fetch('https://dog.ceo/api/breeds/image/random');
                await statusCheck(img);
                img = await img.json();
                img = img.message;
                embed
                    .setTitle('A cute puppy <3')
                    .setImage(img);
            }
            return message.channel.send({ embeds: [embed] });
        } catch(err) {
            console.log(err);
            return message.channel.send("Something went wrong on the server!");
        }
    }
}

async function statusCheck(res) {
    if (!res.ok) {
        return new Error();
    }
    return res;
}
