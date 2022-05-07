const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('love')
		.setDescription('Calculates love between 2 people')
        .addStringOption(option => option.setName('p1').setDescription('The first person').setRequired(true))
        .addStringOption(option => option.setName('p2').setDescription('The second person').setRequired(true)),
	async execute(interaction) {
        const p1 = interaction.options.getString('p1');
        const p2 = interaction.options.getString('p2');
        const p1Value = calculateValue(p1);
        const p2Value = calculateValue(p2);
        const loveValue = Math.abs((p2Value - p1Value) % 100);
		await interaction.reply(loveValue + "%");
	},
};

function calculateValue(name) {
    let value = 0;
    for (let i = 0; i < name.length; i++) {
      value += name.charCodeAt(i);
    }
    return value;
}