const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('yas')
		.setDescription('yass queen'),
	async execute(interaction) {
		const response = await fetch(`http://localhost:${process.env.PORT || 3000}/api/v1`);
		const data = await response.json();

		await interaction.reply(`${data.hi}`)},
};