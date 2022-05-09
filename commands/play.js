/**
 * A template to build commands off of.
 */

const { MessageEmbed } = require('discord.js');
const { Guild } = require('discord.js');
const { prefix } = require('../config.json');
const ytdl = require('ytdl-core');
const fs = require('fs');
const { createAudioResource, createAudioPlayer } = require('@discordjs/voice');

module.exports = {
    name: "play",
    description: "Plays the provided song.",
    arglen: 1,
    argrequired: true,
    async execute(message) {
        let cmdArray = message.content.split(" ");
        let video = cmdArray[1];
        let videoContents = await ytdl(video).pipe(fs.createWriteStream(`temp/${message.createdTimestamp}.mp4`));

        const player = createAudioPlayer();

        const resource = createAudioResource(`../temp/${message.createdTimestamp}.mp4`, {
            metadata: {
                title: 'a song!'
            }
        })

        player.play(resource);
        const embed = new MessageEmbed()
            .setTitle('Command successfully executed!')
            .setDescription('This channel will be deleted in 5 seconds.');
        return message.channel.send({ embeds: [embed] });
    }
}