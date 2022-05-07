const { SlashCommandBuilder } = require('@discordjs/builders');
const noblox = require('noblox.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('getuser')
		.setDescription('Gets info on a roblox user')
        .addStringOption(option =>
            option.setName('userid')
                .setDescription('The userID to get info on')
                .setRequired(true)),
	async execute(interaction) {
        const string = interaction.options.getString('userid');
        let username = await noblox.getUsernameFromId(string);
		await interaction.reply(username);
	},
};